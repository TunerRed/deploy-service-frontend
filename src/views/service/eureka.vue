<template>
    <div>
      <h5>服务列表</h5>
      <el-divider><i class="el-icon-cpu"></i></el-divider>
      <Tips :content="tips2" style="float: left"></Tips>
      <el-row class="eureka-row">
        <el-select size="small" v-model="serverIP">
          <el-option v-for="(serverIP, index) in serverIPList" :key="index" :label="serverIP" :value="serverIP"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      </el-row>
      <el-row class="eureka-row">
        <el-col :span="2" :offset="20" v-if="!enableBatchStart">
          <el-button type="primary" size="mini" @click="()=>enableBatchStart = true">批量启动</el-button>
        </el-col>
        <el-col :span="4" :offset="19" v-else>
          <el-button type="primary" size="mini" style="margin-right: 10px" @click="onBatchStart">启动</el-button>
          <el-button size="mini" @click="onCancelBatchStart">取消</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData.filter(item => !search || (item.jar && item.jar.toLowerCase().includes(search.toLowerCase())))"
        border
        height="500"
        style="min-width: 800px;"
        class="table-header table-header_color"
        v-loading="loading"
      >
        <el-table-column label="应用" prop="name" min-width="150" align="center" fixed="left">
          <template slot="header">
            应用 <Tips :content="tips" class="eureka-tips"></Tips>
          </template>
        </el-table-column>
        <el-table-column label="启动顺序" width="80" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.start"
                         :disabled="!enableBatchStart" @change="onBatchClick(scope.row)">{{scope.row.order}}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="JAR文件" prop="jar" min-width="220" align="center">
          <template slot="header" slot-scope="scoped">
            <el-input v-model="search" size="mini" clearable placeholder="筛选文件" style="margin: 7px 5px 0;padding: 0;width: 80%;"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="进程" prop="pid" min-width="70" align="center"></el-table-column>
<!--        <el-table-column label="端口" prop="port" min-width="70" align="center"></el-table-column>-->
        <el-table-column label="内存占用" prop="mem" min-width="85" align="center"></el-table-column>
        <el-table-column label="启动时间" prop="startTime" min-width="85" align="center"></el-table-column>
<!--        <el-table-column label="actuator" prop="actuator" min-width="400" align="center">-->
<!--          <template slot-scope="scoped">-->
<!--            <el-tooltip :content="scoped.row.actuator" :disabled="!scoped.row.actuator || scoped.row.actuator.length <= maxActuatorLength">-->
<!--              <span>{{(scoped.row.actuator && scoped.row.actuator.length > maxActuatorLength)?scoped.row.actuator.slice(0,maxActuatorLength)+'..':scoped.row.actuator}}</span>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" min-width="200" align="center" fixed="right">
          <template slot-scope="scoped">
            <!-- 操作按钮 -->
            <el-button v-if="scoped.row.pid===0" type="primary" size="small" @click="onOperation('start', scoped.row)" :disabled="btnStartDisabled(scoped.row)">启动</el-button>
            <el-button v-if="scoped.row.pid>0" type="danger" size="small" @click="onOperation('stop', scoped.row)" :disabled="btnStopDisabled(scoped.row)">停止</el-button>
            <el-button type="success" size="small" @click="downLoad(scoped.row.jar)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    import Tips from "@/components/common/tips"
    import { save } from "../../utils/saveFile"
    export default {
        name: "eureka",
        components: {Tips},
        data() {
            return {
                serverIPList: [],
                tableData: [],
                serverIP: '',
                loading: true,
                maxActuatorLength: 60,
                search: '',
                tips: "当没有应用名时，表示该jar包名无法匹配正则，找不到对应的启动参数，无法进行启动和停止操作",
                tips2: "由于技术原因，下载时缺少进度条，敬请理解",
                totalCount: 0,
                enableBatchStart: false
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                this.loading = true;
                const data = await this.$api.service.getServerList();
                this.loading = false;
                this.serverIPList = data.resultData.list;
                if (this.serverIPList.length > 0){
                    this.serverIP = this.serverIPList[0]
                }
            },
            async onSearch() {
                this.loading = true
                let result = await this.$api.service.getEurekaList(this.serverIP);
                this.loading = false;
                this.tableData = result.resultData.list.map(item=>{
                  return {...item, order: 0, start: false,starting: false}
                });
                this.$message({message: '查询完成',type: 'success'});
            },
            async onOperation(val, row) {
                if (val === 'stop') {
                    await this.$api.service.stopService(this.serverIP, row.name, row.pid);
                    this.$message.warning('service done');
                    row.pid = 0;
                } else if (val === 'start') {
                    row.starting = true;
                    let arr = []
                    arr.push(row.name)
                    await this.$api.service.startService(this.serverIP, arr);
                    this.$message.success('服务启动中，请稍后刷新列表或在首页查看')
                }
            },
            async onBatchStart() {
              let arr = []
              this.tableData.forEach(row=>{
                if (row.start) {
                  row.starting = true;
                  arr.push({name:row.name,order:row.order})
                }
              })
              arr.filter(d=>d)
              if (!arr.length) {
                this.$message.warning('请选择至少一项')
                return
              }
              arr.sort((a,b)=>{return a.order-b.order})
              let deployList = arr.map(item=>{return item.name})
              this.enableBatchStart = false
              await this.$api.service.startService(this.serverIP, deployList);
              this.$message.success('服务启动中，请稍后刷新列表或在首页查看')
            },
            onCancelBatchStart() {
              this.tableData.forEach((item)=>{
                item.order = 0
                item.start = false
              })
              this.totalCount = 0
              this.enableBatchStart = false
            },
            onBatchClick(row) {
              if (row.start) {
                this.totalCount++
                row.order = this.totalCount
              } else {
                this.totalCount--
                const curOrder = row.order
                row.order = 0
                this.tableData.map(item=>{
                  if (item.order > curOrder) {
                    item.order--
                  }
                })
              }

            },
            async downLoad(filename) {
                if (!filename) {
                    this.$message.error("空文件名，无法下载")
                    return
                }
                // console.log("download", this.serverIP, filename)
                this.$api.service.download(this.serverIP, filename).then(res=>{
                    save(res, filename)
                })
            },
            btnStartDisabled(row) {
                return this.enableBatchStart || row.starting || !row.name
                // return (row.disableStart != null && row.disableStart)
            },
            btnStopDisabled(row) {
                return this.enableBatchStart || row.starting || row.pid === 0 || !row.name
                // return (row.disableStop != null && row.disableStop)
            }
        }
    }
</script>

<style scoped>
  .eureka-tips {
    margin-top: 7px;
  }
  .eureka-row {
    padding-bottom: 15px;
  }
</style>
