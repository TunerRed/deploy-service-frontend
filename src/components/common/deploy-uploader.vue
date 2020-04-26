<template>
    <div>
      <el-upload ref="uploadform" :action="uploadURL" multiple accept=".jar"
                 :auto-upload="false" :on-success="onSuccess" :on-error="onError" :headers="headers"
                 :before-upload="beforeUpload" >
        <el-button class="upload-btn" type="primary" size="small" @click="onChoose" slot="trigger"><i class="el-icon-search"></i> 选取文件</el-button>
        <el-button class="upload-btn" type="danger"  size="small" @click="onClear"><i class="el-icon-delete"></i> 清空旧文件</el-button>
        <el-button class="upload-btn" type="success" size="small" @click="onSubmit"><i class="el-icon-upload2"></i> 上传文件</el-button>
        <!-- :http-request="(file)=>{this.formData.append('file', file.file)}" -->
        <!-- <div style="width: 100%; margin-top: 10px;">
          <div v-show="uploadStatus === 1"><el-tag type="primary">上传中</el-tag></div>
          <div v-show="uploadStatus === 2"><el-tag type="success">上传完成</el-tag></div>
          <div v-show="uploadStatus === 3"><el-tag type="danger">上传失败</el-tag></div>
        </div> -->
      </el-upload>
      <el-drawer title="已保存历史文件" :visible.sync="drawer" size="20%">
        <el-alert v-for="(item, index) in nameList" :key="index" :title="item"
                  type="success" center :closable="false" style="margin: 0 5% 5px;width: 90%;"></el-alert>
      </el-drawer>
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
  import { getLastLoginDate, resetLastLoginDate, daysBetween } from '@/utils/lastLogin.js'
    export default {
        name: "deploy-uploader",
        data() {
            return {
                uploadURL: '/api/service/uploadService',
                formData: [],
                uploadStatus: 0,
                drawer: false,
                nameList: [],
                headers: {
                  Authorization: localStorage.getItem('token')
                },
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
        },
        methods: {
            beforeUpload(file) {
                if (!file || !file.name)
                    return false
                // console.log("伞兵一号卢本伟准备就绪", file.name)
            },
            async onSubmit() {
                // this.formData = new FormData()
                this.$refs.uploadform.submit()
                // 多个文件上传，只调用一次接口
                // this.uploadStatus = 1
                // const data = await this.$api.service.uploadFiles(this.uploadURL, this.formData)
                // if (data.resultCode === 200) {
                //     this.uploadStatus = 2
                //     this.nameList = data.resultData
                //     this.drawer = true;
                //     this.$emit('onUpload', 2)
                // } else {
                //     this.uploadStatus = 3
                //     console.error(data.resultMsg)
                //     this.$notify({
                //         title: '上传错误',
                //         message: data.resultMsg || '',
                //         duration: 0
                //     });
                // }
            },
            async onClear() {
              this.clearFolder = true
              await this.$api.service.clearDir().finally(() => {
                this.clearFolder = false
                this.dialogVisible = false
              })
              resetLastLoginDate()
              this.$message.success('已清除旧jar包')
              this.$emit('onUpload', 1)
            },
            onSuccess (response, file, fileList) {
                if (response.resultCode === 200) {
                    this.nameList.push(response.resultData)
                    this.drawer = true;
                    this.$emit('onUpload', 3)
                } else {
                    this.$notify({
                        title: '上传错误',
                        message: response.resultMsg || '',
                        duration: 0
                    });
                }
            },
            onError (err, file, fileList) {
                console.error(err.resultMsg)
                this.$notify({
                    title: '上传错误',
                    message: err.resultMsg || '',
                    duration: 0
                });
            },
            onChoose() {
                this.uploadStatus = 0
                this.$emit('onUpload', 2)
            },
        }
    }
</script>

<style scoped>
.upload-btn {
  margin-right: 10px;
}
</style>
