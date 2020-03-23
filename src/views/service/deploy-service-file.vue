<template>
  <div>
    <h4>从文件部署</h4>
    <span style="font-size: 14px; font-weight: bold;">请选择JAR文件,<span style="color: red">不要带有时间戳后缀</span></span>
    <el-divider><i class="el-icon-files"></i></el-divider>
    <el-row>
      <el-col :span="7" :offset="1">
        <el-steps :active="steps" finish-status="success" align-center direction="vertical" :space="50">
          <el-step title="清空服务器上的旧文件（可选）"></el-step>
          <el-step title="选择jar包"></el-step>
          <el-step title="点击上传等待完成，确认文件名无误"></el-step>
          <el-step title="点击部署并等待成功提示"></el-step>
          <el-step title="在首页查看部署消息"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="1" ><div style="width: 1px;min-height: 200px; background: darkgrey;"></div></el-col>
      <el-col :span="8">
        <deploy-uploader ref="uploader" @onUpload="onUpload"></deploy-uploader>
      </el-col>
      <el-col :span="1" :offset="1"><div style="width: 1px;min-height: 200px; background: darkgrey;"></div></el-col>
      <el-col :span="5">
        <deploy-start-form ref="start" :ip-list="ipList" @confirm="onDeployServices"></deploy-start-form>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%" center>
      <div style="text-align: left">
        <p>检测到您已超过{{maxClearDays}}未清理个人文件夹，这将导致您部署新包时同时部署已存在于文件夹内的旧包。</p>
        <p>是否清理个人文件夹？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">下次一定</el-button>
        <el-button type="primary" @click="onClear" :loading="clearFolder">一键清理</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import DeployStartForm from "@/components/common/deploy-start-form";
    import DeployUploader from "@/components/common/deploy-uploader";
    import { getLastLoginDate, resetLastLoginDate, daysBetween } from '@/utils/lastLogin.js'
    export default {
        name: "deploy-service-file",
        components: {DeployUploader, DeployStartForm},
        data() {
            return {
                ipList: [],
                steps: 0,
                dialogVisible: false,
                clearFolder: false,
                maxClearDays: 7
            }
        },
        mounted() {
          const days = daysBetween(getLastLoginDate(), new Date())
          if (days >= this.maxClearDays) {
            this.dialogVisible = true
          }
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
                this.steps = 4;
                await this.$api.service.deployFromFile(deployForm.serverIP);
                this.$refs.start.deploying = true;
                this.$message({type:'success',message:'已开始部署,请等待完成'});
                this.steps = 5
            },
            async onClear() {
              // this.refs['uploader']
              this.clearFolder = true
              await this.$api.service.clearDir().finally(() => {
                this.clearFolder = false
                this.dialogVisible = false
              })
              resetLastLoginDate()
            },
            onUpload(val) {
                this.steps = val
            }
        }
    }
</script>

<style scoped>
</style>
