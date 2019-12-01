<template>
    <div>
      <el-table stripe border :data="tableData" size="mini" v-loading="loadingTable">
        <el-table-column label="是否勾选" width="100">
          <template slot-scope="backup">
            <el-checkbox v-model="backup.row.deploy"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="文件夹名称" prop="name"></el-table-column>
        <el-table-column align="center" label="可用备份" prop="list">
          <template slot-scope="backup">
            <el-select v-model="backup.row.tarBackup" placeholder="选择该应用的可用备份">
              <el-option v-for="(item, index) in backup.row.list" :key="index" :value="item" :label="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="回滚到" prop="name">
          <template slot-scope="backup">
            <el-input v-model="backup.row.tarDir" placeholder="webapps目录下待替换文件夹"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "rollback-table",
        data() {
            return {
                loadingTable: false,
                tableData: []
            }
        },
        methods: {
            async initData(serverIP) {
                console.log(serverIP)
                this.loadingTable = true
                const data = await this.$api.frontend.getAvailBackup(serverIP)
                if (data) {
                    this.tableData = data.resultData
                }
                this.loadingTable = false
            }
        }
    }
</script>

<style scoped>

</style>
