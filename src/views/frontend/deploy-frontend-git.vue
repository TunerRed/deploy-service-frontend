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
            // todo 检查URL是否有效
            onDeployFrontend(deployForm) {
                let data = this.$refs.table.tableData
                console.log(data)
                let deployList=[]
                for(let i=0;i<data.length;i++){
                    if (data[i].deploy) {
                        deployList.push({repo:data[i].repo,branch:data[i].branch,filename:data[i].filename,script:data[i].script})
                        //console.log(deployList[i])
                    }
                }
                this.$api.frontend.deployFromGit(deployForm.serverIP, deployForm.phoneNumber,deployList)
                this.$message({type:'success',message:'已开始部署,请等待完成'})
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
