<template>
    <div>
      <el-upload ref="uploadform" :action="uploadURL" accept="zip" :auto-upload="false">
        <el-button slot="trigger" type="primary"><i class="el-icon-search"></i> 选取文件</el-button>
      </el-upload>
    </div>
</template>

<script>
    export default {
        name: "deploy-uploader",
        data() {
            return {
                uploadURL: ''
            }
        },
        methods: {
            uploadFileTo(uploadURL) {
                this.uploadURL = uploadURL
                this.$refs.uploadform.submit()
            }
        }
    }
</script>

<style scoped>

</style>
