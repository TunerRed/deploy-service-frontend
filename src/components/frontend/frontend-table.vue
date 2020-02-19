<template>
  <el-table
    :data="tableData"
    class="table-header table-header_color"
    style="width: 100%"
    border
    v-loading="loadingData"
  >
    <el-table-column label="是否勾选" width="100">
      <template slot-scope="scoped">
        <el-tooltip content="当该仓库正在被其他用户打包时，无法勾选，也无法切换分支" :disabled="scoped.row.branchList !== null">
          <el-checkbox v-model="scoped.row.deploy" :disabled="scoped.row.branchList === null"></el-checkbox>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="140" align="center">
      <template slot-scope="scoped">
        <el-tooltip content="当分支列表没有目标分支时，点击按钮更新代码。打包前会自动更新代码">
          <el-button type="success" size="mini" plain @click="updateRepo(scoped.$index)" :disabled="scoped.row.branchList == null">更新仓库</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="repo" label="仓库" min-width="300"></el-table-column>
    <el-table-column prop="branchList" label="分支" min-width="200">
      <template slot-scope="scoped">
        <el-select v-model="scoped.row.branch" @change="setAvailNpmScript(scoped.row)">
          <el-option v-for="(item,index) in scoped.row.branchList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="scriptList" label="打包方式" min-width="100">
      <template slot-scope="scoped">
        <el-select v-model="scoped.row.script">
          <el-option v-for="(item,index) in scoped.row.scriptList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="filename" label="压缩文件夹名" min-width="120">
      <template slot-scope="scoped">
        <el-input maxlength="10" clearable v-model="scoped.row.filename"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "frontend-table",
        data() {
            return {
                tableData: [],
                loadingData: true
            }
        },
        mounted() {
            this.getTableData()
        },
        methods: {
            async getTableData() {
                this.loadingData = true;
                let data = await this.$api.frontend.getFrontendRepoList()
                this.tableData = data.resultData.repoList
                this.loadingData = false
                // console.log(this.tableData)
            },
            async setAvailNpmScript (row) {
                // console.log(row.repo,row.branch)
                this.loadingData = true
                const data = await this.$api.frontend.getAvailNpmScript(row.repo,row.branch)
                row.scriptList=data.resultData
                this.loadingData = false
            },
            async updateRepo (index) {
                this.loadingData = true;
                const data = await this.$api.frontend.updateRepo(this.tableData[index].repo)
                if (data && data.resultData) {
                  // this.tableData[index] = data.resultData
                  this.getTableData()
                }
                this.loadingData = false
            }
        }
    }
</script>

<style scoped>
</style>
