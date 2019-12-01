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
    <el-table-column prop="name" label="服务" min-width="300"></el-table-column>
    <el-table-column prop="date" label="日期" min-width="100"></el-table-column>
    <el-table-column prop="branchList" label="分支" min-width="200">
      <template slot-scope="scope">
        <el-select v-model="scope.row.branch">
          <el-option v-for="(item,index) in scope.row.branchList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </template>
    </el-table-column>
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
        this.tableData = this.$api.service.getServicesInfo().resultData.list
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
