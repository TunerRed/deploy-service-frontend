<template>
  <div>
    <h4>从文件部署</h4>
    <h5 style="color: red">请选择JAR文件，不要带有时间戳</h5>
    <el-divider><i class="el-icon-files"></i></el-divider>
    <el-row>
      <el-col :span="12">
        <deploy-uploader ref="uploader"></deploy-uploader>
      </el-col>
      <el-col :span="1" style="min-height: 200px;"><div style="width: 1px;min-height: 200px; background: darkgrey;"></div></el-col>
      <el-col :span="9">
        <deploy-start-form ref="start" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
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
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                const data = await this.$api.service.getAvailableServerList()
                if (data) {
                    this.ipList = data.resultData.list
                }
            },
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
