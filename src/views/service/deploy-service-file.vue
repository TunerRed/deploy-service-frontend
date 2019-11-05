<template>
  <div>
    <h4>从文件部署，请上传您的压缩包</h4>
    <h5 style="color: red">请确定在目标文件夹下而不是右键选择文件夹打包文件</h5>
    <el-divider><i class="el-icon-files"></i></el-divider>
    <el-row :gutter="20">
      <el-col :span="10">
        <deploy-uploader ref="uploader"></deploy-uploader>
      </el-col>
      <el-col :span="10">
        <deploy-start-form ref="start" :inline="false" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
      </el-col>
    </el-row>
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
                this.$api.service.deployFromFile(deployForm.serverIP, deployForm.phoneNumber)
                this.$message({type:'success',message:'已开始部署,请等待完成'})
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
