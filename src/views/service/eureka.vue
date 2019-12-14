<template>
    <div>
      <el-row>
        <el-select size="small" v-model="serverIP">
          <el-option v-for="(serverIP, index) in serverIPList" :key="index" :label="serverIP" :value="serverIP"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="onSearch">查询</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="500"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="应用" prop="name" min-width="100" align="center" fixed="left"></el-table-column>
        <el-table-column label="JAR包" prop="jar" min-width="180" align="center"></el-table-column>
        <el-table-column label="进程" prop="pid" min-width="90" align="center"></el-table-column>
        <el-table-column label="端口" prop="port" min-width="70" align="center"></el-table-column>
        <el-table-column label="内存占用" prop="mem" min-width="80" align="center"></el-table-column>
        <el-table-column label="启动时间" prop="startTime" min-width="100" align="center"></el-table-column>
        <el-table-column label="actuator" prop="actuator" min-width="500" align="center"></el-table-column>
        <el-table-column label="操作" min-width="80" align="center" fixed="right">
          <template slot-scope="scoped">
            <!-- 操作按钮 -->
            <el-button v-if="!scoped.row.pid" type="primary" size="small">启动</el-button>
            <el-button v-if="scoped.row.pid" type="danger" size="small">停止</el-button>
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
                loading: true
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                this.loading = true
                const data = await this.$api.service.getAvailableServerList()
                this.loading = false
                this.serverIPList = data.resultData.list
                if (this.serverIPList.length > 0){
                    this.serverIP = this.serverIPList[0]
                }
            },
            async onSearch() {
                this.loading = true
                let result = await this.$api.service.getEurekaList(this.serverIP)
                this.loading = false;
                this.tableData = result.resultData.list
                console.log('getEurekaList', this.tableData)
                this.$message({message: '查询完成',type: 'success'});
            }
        }
    }
</script>

<style scoped>
  .el-row {
  padding-bottom: 15px;
  }
</style>
