<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    class="table-header table-header_color"
    border
  >
    <el-table-column prop="name" label="仓库" min-width="250" align="center"></el-table-column>
    <el-table-column label="是否打包" width="80" align="center">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.pack" :disabled="scope.row.deploy"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="是否部署" width="80" align="center">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.deploy" @change="onDeployClick(scope.row)"></el-checkbox>
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
            tableData: []
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        async initData() {
            const data = await this.$api.service.getServiceList();
            this.tableData = data.resultData.list.map(item=>{return {...item,'pack':false,'deploy':false,'branch':null}})
        },
        onDeployClick(row) {
            if (row.deploy)
                row.pack = true
        }
    }
}
</script>

<style scoped>
</style>
