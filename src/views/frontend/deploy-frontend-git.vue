<template>
  <div>
    <h5>FRONTEND</h5>
    <el-divider><i class="el-icon-menu"></i></el-divider>
    <pack-table ref="table"></pack-table>
    <el-divider><i class="el-icon-s-promotion"></i></el-divider>
    <deploy-start-form ref="start" :ip-list="ipList" @confirm="onDeployFrontend"></deploy-start-form>
  </div>
</template>

<script>
    import PackTable from "@/components/frontend/frontend-table";
    import DeployStartForm from "@/components/common/deploy-start-form";
    export default {
        name: "deplot-frontend-git",
        components: {DeployStartForm, PackTable},
        data() {
            return {
                ipList: []
            }
        },
        mounted() {
            this.getServerList()
        },
        methods: {
            async onDeployFrontend(deployForm) {
                let data = this.$refs.table.tableData
                // console.log(data)
                let error = null
                let deployList=data.map((item)=>{
                    if (item && item.deploy) {
                        if (item.repo && item.branch && item.filename && item.script)
                          return {repo:item.repo,branch:item.branch,filename:item.filename,script:item.script}
                        else {
                            error = '部署列表存在空项，请检查'
                        }
                    }
                })
                deployList = deployList.filter(d=>d)
                if (error) {
                    this.$message.error(error)
                    this.$refs.start.resetDeploy(false)
                    return
                }
                if (!deployList || deployList.length == 0) {
                    this.$message.warning('请选择至少一项')
                    this.$refs.start.resetDeploy(false)
                    return
                } else {
                    await this.$api.frontend.deployFromGit(deployForm.serverIP, deployList)
                    this.$message({type:'success',message:'已开始部署,请等待完成'})
                    this.$refs.start.resetDeploy(true)
                }
            },
            async getServerList () {
                const data= await this.$api.frontend.getServerList()
                this.ipList=data.resultData.list
            }
        }
    }
</script>

<style scoped>
  .require {
    color: red;
  }
</style>
