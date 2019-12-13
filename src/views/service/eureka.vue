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
        v-loading="loading"
      >
        <el-table-column label="应用" prop="name" min-width="150" fixed="left"></el-table-column>
        <el-table-column label="JAR包" prop="jar" min-width="150"></el-table-column>
        <el-table-column label="端口" prop="port" min-width="100"></el-table-column>
        <el-table-column label="运行时间" prop="runTime" min-width="100"></el-table-column>
        <el-table-column label="actuator" prop="actuator" min-width="500"></el-table-column>
        <el-table-column label="操作" min-width="80" fixed="right">
          <template slot-scope="scoped">
            <!-- 操作按钮 -->
            <el-button v-if="!scoped.row.started" type="primary" size="small">启动</el-button>
            <el-button v-if="scoped.row.started" type="danger" size="small">停止</el-button>
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
            // this.initData()
            this.onSearch('')
        },
        methods: {
            async initData() {
                this.loading = true
                const data = await this.$api.service.getAvailableServerList()
                this.serverIPList = data.resultData.list
                if (this.serverIPList.length > 0){
                    this.serverIP = this.serverIPList[0]
                    this.onSearch(this.serverIP)
                }
                this.loading = false
            },
            async onSearch(serverIP) {
                this.loading = true
                let result = await this.$api.service.getEurekaList(serverIP)
                this.loading = false;
                this.tableData = result.resultData.list
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
