<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column label="是否勾选" width="100">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.deploy" @change="click"></el-checkbox>
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
  import  from '@/api/api.js'
export default {
    name: "service-table",
    data() {
        return {
            tableData: [
                {
                    name: '111',
                    date: '20191018',
                    branchList: ['release-1015','dev','master'],
                    branch: 'release-1015',
                    deploy: false
                },
                {
                    name: '222',
                    date: '20190930',
                    branchList: ['release-1015','dev','master'],
                    branch: 'dev',
                    deploy: true
                }
            ]
        }
    },
    mounted() {
        this.tableData = getServicesInfo()
    },
    methods: {
        click(val) {
            console.log(this.tableData[0].deploy)
        }
    }
}
</script>

<style scoped>

</style>
