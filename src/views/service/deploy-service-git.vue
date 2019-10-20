<template>
  <div>
    <h5>SERVICE</h5>
    <service-table></service-table>
    <el-divider><i class="el-icon-s-promotion"></i></el-divider>
    <deploy-start-form :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
  </div>
</template>

<script>
    import ServiceTable from "@/components/services/service-table";
    import DeployStartForm from "@/components/common/deploy-start-form";
    export default {
        name: "deploy-service-git",
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
                //todo refs该怎么使用？
                this.$api.service.deployFromGit(deployForm.serverIP,
                    deployForm.phoneNumber)
                console.log(deployForm.serverIP, deployForm.phoneNumber)
                // this.$refs["deployForm"].validate((valid) => {
                //     if (valid) {
                //         alert("success");
                //     }else {
                //         alert("error")
                //         return false
                //     }
                // })
            }
        }
    }
</script>

<style scoped>
.require {
  color: red;
}
</style>
