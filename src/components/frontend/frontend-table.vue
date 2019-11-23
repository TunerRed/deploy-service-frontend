<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column label="是否勾选" width="100">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.deploy"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="repo" label="仓库" min-width="300"></el-table-column>
    <el-table-column prop="branchList" label="分支" min-width="200">
      <template slot-scope="scope">
        <el-select v-model="scope.row.branch" @change="setAvailNpmScript(scope.row)">
          <el-option v-for="(item,index) in scope.row.branchList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="scriptList" label="打包方式" min-width="100">
      <template slot-scope="scope">
        <el-select v-model="scope.row.script">
          <el-option v-for="(item,index) in scope.row.scriptList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="filename" label="打包文件" min-width="100">
      <template slot-scope="scope">
        <el-input maxlength="10" clearable v-model="scope.row.filename"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "frontend-table",
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            this.getTableData()
        },
        methods: {
            async getTableData() {
                let data = await this.$api.frontend.getFrontendRepoList()
                this.tableData = data.resultData.repoList
                console.log(this.tableData)
            },
            async setAvailNpmScript (row) {
                console.log(row.repo,row.branch)
                const data = await this.$api.frontend.getAvailNpmScript(row.repo,row.branch)
                row.scriptList=data.resultData
            }
        }
    }
</script>

<style scoped>
</style>
