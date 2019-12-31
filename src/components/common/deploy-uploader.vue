<template>
    <div>
      <el-upload ref="uploadform" :action="uploadURL" multiple accept=".jar"
                 :auto-upload="false" :on-success="onSuccess" :on-error="onError" :headers="headers"
                 :before-upload="beforeUpload" >
        <el-button type="primary" size="small" @click="onChoose" slot="trigger"><i class="el-icon-search"></i> 选取文件</el-button>
        <el-button type="danger"  size="small" @click="onClear"><i class="el-icon-delete"></i> 清空旧文件</el-button>
        <el-button type="success" size="small" @click="onSubmit"><i class="el-icon-upload2"></i> 上传文件</el-button>
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
    </div>
</template>

<script>
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
                }
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
              await this.$api.service.clearDir()
              this.$emit('onUpload', 2)
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
                this.$emit('onUpload', 1)
            },
        }
    }
</script>

<style scoped>

</style>
