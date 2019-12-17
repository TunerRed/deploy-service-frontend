<template>
    <div>
      <h5>服务列表</h5>
      <el-divider><i class="el-icon-cpu"></i></el-divider>
      <el-row style="padding-bottom: 15px;">
        <el-select size="small" v-model="serverIP">
          <el-option v-for="(serverIP, index) in serverIPList" :key="index" :label="serverIP" :value="serverIP"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      </el-row>
      <el-table
        :data="tableData.filter(item => !search || (item.jar && item.jar.toLowerCase().includes(search.toLowerCase())))"
        border
        height="500"
        style="min-width: 800px;"
        class="table-header table-header_color"
        v-loading="loading"
      >
        <el-table-column label="应用" prop="name" min-width="150" align="center" fixed="left"></el-table-column>
        <el-table-column label="JAR文件" prop="jar" min-width="220" align="center">
          <template slot="header" slot-scope="scoped">
            <el-input v-model="search" size="mini" clearable placeholder="筛选文件" style="margin: 7px 5px 0;padding: 0;width: 80%;"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="进程" prop="pid" min-width="70" align="center"></el-table-column>
        <el-table-column label="端口" prop="port" min-width="70" align="center"></el-table-column>
        <el-table-column label="内存占用" prop="mem" min-width="85" align="center"></el-table-column>
        <el-table-column label="启动时间" prop="startTime" min-width="85" align="center"></el-table-column>
        <el-table-column label="actuator" prop="actuator" min-width="400" align="center">
          <template slot-scope="scoped">
            <el-tooltip :content="scoped.row.actuator" :disabled="!scoped.row.actuator || scoped.row.actuator.length <= maxActuatorLength">
              <span>{{(scoped.row.actuator && scoped.row.actuator.length > maxActuatorLength)?scoped.row.actuator.slice(0,maxActuatorLength)+'..':scoped.row.actuator}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="140" align="center" fixed="right">
          <template slot-scope="scoped">
            <!-- 操作按钮 -->
            <el-button v-if="scoped.row.pid<=0" type="primary" size="small" @click="onOperation('start', scoped.row)" :disabled="btnStartDisabled(scoped.row)">启动</el-button>
            <el-button v-if="scoped.row.pid>0" type="danger" size="small" @click="onOperation('stop', scoped.row)" :disabled="btnStopDisabled(scoped.row)">停止</el-button>
            <el-button type="success" size="small" @click="downLoad(scoped.row.jar)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "eureka",
        data() {
            return {
                serverIPList: [],
                tableData: [],
                serverIP: '',
                loading: true,
                maxActuatorLength: 60,
                search: ''
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
                this.tableData = result.resultData.list;
                this.$message({message: '查询完成',type: 'success'});
            },
            async onOperation(val, row) {
                if (val === 'stop') {
                    await this.$api.service.stopService(this.serverIP, row.name, row.pid);
                    this.$message.warning('service done');
                    row.pid = 0;
                } else if (val === 'start') {
                    row.pid = -1;
                    await this.$api.service.startService(this.serverIP, row.name);
                    this.$message.success('服务启动中，请稍后刷新列表或在首页查看')
                }
            },
            async downLoad(filename) {
                if (!filename) {
                    this.$message.error("空文件名，无法下载")
                    return
                }
                console.log("download", this.serverIP, filename)
                this.$api.service.download(this.serverIP, filename).then(res=>{
                    let blob = new Blob([res],{type: '.jar'});
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, filename)
                    } else {
                        let objURL = URL.createObjectURL(blob)
                        let a = document.createElement('a')
                        a.href = objURL
                        a.download = filename
                        a.click()
                    }
                })
            },
            btnStartDisabled(row) {
                return row.pid === -1
                // return (row.disableStart != null && row.disableStart)
            },
            btnStopDisabled(row) {
                return row.pid === 0
                // return (row.disableStop != null && row.disableStop)
            }
        }
    }
</script>

<style scoped>
</style>
