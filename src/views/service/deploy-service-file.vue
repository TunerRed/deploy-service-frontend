<template>
  <div>
    <h4>从文件部署</h4>
    <span style="font-size: 14px; font-weight: bold;">请选择JAR文件,<span style="color: red">不要带有时间戳后缀</span>。一个包上传失败需要全部重传（因为会清空文件夹）</span>
    <el-divider><i class="el-icon-files"></i></el-divider>
    <el-row>
      <el-col :span="5" :offset="1">
        <el-steps :active="steps" finish-status="success" align-center direction="vertical" :space="60">
          <el-step title="选择jar包"></el-step>
          <el-step title="点击上传等待完成"></el-step>
          <el-step title="点击部署并等待成功提示"></el-step>
          <el-step title="在首页查看部署消息"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="1" ><div style="width: 1px;min-height: 200px; background: darkgrey;"></div></el-col>
      <el-col :span="7">
        <deploy-uploader ref="uploader" @onUpload="onUpload"></deploy-uploader>
      </el-col>
      <el-col :span="1" :offset="1"><div style="width: 1px;min-height: 200px; background: darkgrey;"></div></el-col>
      <el-col :span="8">
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
                ipList: [],
                steps: 0
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            async initData() {
                const data = await this.$api.service.getServerList()
                if (data) {
                    this.ipList = data.resultData.list
                }
            },
            async onDeployServices(deployForm) {
                this.steps = 3;
                await this.$api.service.deployFromFile(deployForm.serverIP);
                this.$refs.start.deploying = true;
                this.$message({type:'success',message:'已开始部署,请等待完成'});
                this.steps = 4
            },
            onUpload(val) {
                this.steps = val
            }
        }
    }
</script>

<style scoped>
</style>
