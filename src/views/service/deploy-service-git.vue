<template>
  <div>
    <h5>SERVICE</h5>
    <el-divider><i class="el-icon-menu"></i></el-divider>
    <Tips :content="tips" style="float: left"></Tips>
    <service-table ref="table"></service-table>
    <el-divider><i class="el-icon-s-promotion"></i></el-divider>
    <deploy-start-form ref="start" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
  </div>
</template>

<script>
    import ServiceTable from "@/components/services/service-table";
    import DeployStartForm from "@/components/common/deploy-start-form";
    import Tips from "@/components/common/tips";
    export default {
        name: "deploy-service-git",
        components: {DeployStartForm, ServiceTable,Tips},
        data() {
          return {
              ipList: '',
              tips: "根据选中顺序确定打包先后次序"
          }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                const data = await this.$api.service.getServerList()
                this.ipList=data.resultData.list
            },
            async onDeployServices(deployForm) {
                let data = this.$refs.table.tableData.sort((a,b)=>{
                    if (!a.order) {
                        return 1
                    }
                    return a.order - b.order
                })
                let emptyBranch = null
                let deployList=data.map((item)=>{
                    if (item.pack) {
                        if (!item.branch || item.branch==="") {
                            emptyBranch = item.repo
                            return null;
                        }
                        return {
                            repo:item.repo,
                            deploy: item.deploy,
                            branch:item.branch,
                            location: item.location
                        }

                    }
                })
                deployList = deployList.filter(d=>d)
                if (emptyBranch) {
                    this.$message.warning('请选择必要的分支 > '+emptyBranch)
                    this.$refs.start.resetDeploy(false)
                    return;
                }
                if (!deployList || deployList.length === 0) {
                    this.$message.warning('请选择至少一项')
                    this.$refs.start.resetDeploy(false)
                    return
                }
                this.$refs.start.resetDeploy(true)
                console.log(deployList)
                // await this.$api.service.deployFromGit(deployForm.serverIP,deployList)
                this.$message({type:'success',message:'已开始部署,请等待完成'})
            }
        }
    }
</script>

<style scoped>
.require {
  color: red;
}
</style>
