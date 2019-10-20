<template>
    <div>
      <el-row>
        <el-select v-model="serverIP">
          <el-option v-for="(serverIP, index) in serverIPList" :key="index" :label="serverIP" :value="serverIP"></el-option>
        </el-select>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="应用" prop="name" width="150" fixed="left"></el-table-column>
        <el-table-column label="版本" prop="version" width="120"></el-table-column>
        <el-table-column label="端口" prop="port" width="100"></el-table-column>
        <el-table-column label="IP" prop="ip" width="200"></el-table-column>
        <el-table-column label="仓库" prop="repositories" width="250"></el-table-column>
        <el-table-column label="健康状态" prop="health" width="80"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scoped">
            <!-- 操作按钮 -->
            <el-button type="primary" size="small">敬请期待</el-button>
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
        created() {
            this.loading = true
            this.serverIPList = this.$api.service.getAvailableServerList().resultData.list
            if (this.serverIPList.length > 0){
                this.serverIP = this.serverIPList[0]
                this.onSearch()
            }
            this.loading = false
        },
        methods: {
          onSearch() {
              this.loading = true
              let result = this.$api.service.getEurekaList(this.serverIP)
              this.loading = false
              this.tableData = result.resultData.list
              this.$message({message: '查询完成',type: 'success'})
          }
        }
    }
</script>

<style scoped>

</style>
