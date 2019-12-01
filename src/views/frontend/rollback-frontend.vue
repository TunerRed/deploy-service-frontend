<template>
  <div>
    <h5>FRONTEND</h5>
    <el-divider><i class="el-icon-menu"></i></el-divider>
    <rollback-table ref="rollbackTable"></rollback-table>
    <el-divider></el-divider>
    <deploy-start-form ref="start" :ipList="ipList" @change="onServerChange" @confirm="confirm"></deploy-start-form>
  </div>
</template>

<script>
    import DeployStartForm from "@/components/common/deploy-start-form";
    import RollbackTable from "../../components/frontend/rollback-table";
    export default {
        name: "rollback-service",
        components: {RollbackTable, DeployStartForm},
        data() {
            return {
                ipList: []
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                const data = await this.$api.frontend.getServerList()
                if (data) {
                    this.ipList = data.resultData.list
                }
            },
            async onServerChange(serverIP) {
                this.$refs.rollbackTable.initData(serverIP)
            },
            async confirm(deployForm) {
                if (this.$refs.start.deploying) {
                    this.$message.warning('不可重复点击')
                    return
                }
                const deployData = this.$refs.rollbackTable.tableData.map((item)=>{
                    if (item.deploy) {
                        item.tarDir = item.tarDir || item.name
                        return item
                    }
                }).filter(d=>d)
                const check = deployData.filter(item => !item.tarBackup || !item.tarDir)
                if (check.length) {
                    this.$message.warning('选择的回滚包缺少完整信息')
                    return
                }
                if (!deployData.length) {
                    this.$message.warning('至少选择一个进行回滚')
                    return
                }
                this.$refs.start.deploying = true
                console.log(deployData)
                await this.$api.frontend.rollback(deployForm.serverIP, deployData)
                this.$message('回滚完成')
            }
        },
        watch: {
            index (val){
                //console.log('index changed ',val)
                this.availPackage = this.packageList[val]
            }
        }
    }
</script>

<style scoped>

</style>
