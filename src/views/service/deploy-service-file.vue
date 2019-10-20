<template>
  <div>
    <h5>SERVICE</h5>
    <el-row :gutter="20">
      <el-col :span="10">
        <deploy-uploader ref="uploader"></deploy-uploader>
      </el-col>
      <el-col :span="10">
        <deploy-start-form :inline="false" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-files"></i></el-divider>
  </div>
</template>

<script>
    import DeployStartForm from "@/components/common/deploy-start-form";
    import DeployUploader from "@/components/common/deploy-uploader";
    export default {
        name: "deploy-service-file",
        components: {DeployUploader, DeployStartForm},
        data() {
            return {
                ipList: []
            }
        },
        created() {
            //this.$api.show.createError('i am error')
            this.ipList=this.$api.service.getAvailableServerList().resultData.list
        },
        methods: {
            // todo 检查URL是否有效
            onDeployServices(deployForm) {
                //todo 文件上传接口
                this.$refs.uploader.uploadFileTo(deployForm.serverIP + '')
                // this.$refs["deployForm"].validate((valid) => {
                //     if (valid) {
                //         alert("success");
                //     }else {
                //         alert("error")
                //         return false
                //     }
                // })
            },
        }
    }
</script>

<style scoped>
</style>
