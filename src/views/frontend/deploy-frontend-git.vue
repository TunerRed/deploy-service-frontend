<template>
  <div>
    <h5>FRONTEND</h5>
    <el-divider><i class="el-icon-menu"></i></el-divider>
    <service-table ref="table"></service-table>
    <el-divider><i class="el-icon-s-promotion"></i></el-divider>
    <deploy-start-form ref="start" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
  </div>
</template>

<script>
    import ServiceTable from "@/components/services/service-table";
    import DeployStartForm from "@/components/common/deploy-start-form";
    export default {
        name: "deplot-frontend-git",
        components: {DeployStartForm, ServiceTable},
        data() {
            return {
                ipList: ''
            }
        },
        created() {
            //this.$api.show.createError('i am error')
            this.ipList=this.$api.service.getAvailableServerList().resultData.list
        },
        methods: {
            // todo 检查URL是否有效
            onDeployServices(deployForm) {
                let data = this.$refs.table.tableData
                let deployList=[]
                for(let i=0;i<data.length;i++){
                    if (data[i].deploy) {
                        deployList.push({name:data[i].name,branch:data[i].branch})
                    }
                }
                this.$api.service.deployFromGit(deployForm.serverIP, deployForm.phoneNumber,deployList)
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
