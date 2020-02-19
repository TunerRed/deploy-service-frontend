<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    class="table-header table-header_color"
    border
    v-loading="loading"
  >
    <el-table-column label="打包顺序" width="80" align="center">
      <template slot-scope="scope">
        <el-badge :value="scope.row.order" type="primary"></el-badge>
<!--        <el-checkbox v-model="scope.row.pack" :disabled="scope.row.deploy"></el-checkbox>-->
      </template>
    </el-table-column>
    <el-table-column prop="repo" label="仓库" min-width="250" align="center"></el-table-column>
    <el-table-column label="是否打包" width="80" align="center">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.pack" :disabled="scope.row.deploy" @change="onPackClick(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="是否部署" width="80" align="center">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.deploy" @change="onDeployClick(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="120" align="center">
      <template slot-scope="scope">
        <el-tooltip effect="light" placement="top" content="下拉列表没有最新分支时，手动更新至最新仓库">
          <el-button @click="onUpdateRepo(scope.row)" size="mini" plain type="success">手动更新仓库</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="branchList" label="分支" min-width="150" align="center">
      <template slot-scope="scope">
        <el-select v-model="scope.row.branch" size="mini">
          <el-option v-for="(item,index) in scope.row.branchList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="location" label="jar包在仓库下的位置" min-width="400"></el-table-column>
  </el-table>
</template>

<script>
export default {
    name: "service-table",
    data() {
        return {
            tableData: [],
            loading: true,
            totalCount: 0
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        async initData() {
            this.loading = true
            const data = await this.$api.service.getRepoList();
            this.loading = false
            this.tableData = data.resultData.repoList.map(item=>{return {...item,'pack':false,'deploy':false,'branch':null,order:0}})
        },
        onDeployClick(row) {
            if (row.deploy) {
                row.pack = true
                this.onPackClick(row)
            }
        },
        onPackClick(row) {
            if (row.pack) {
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
        onUpdateRepo(row) {
            const repoName = row.repo
            console.log(repoName)
        }
    }
}
</script>

<style scoped>
</style>
