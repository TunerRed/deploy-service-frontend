<template>
  <el-form v-model="deployForm" :inline="line" ref="deployForm">
    <el-form-item label="可选服务器">
      <el-select v-model="deployForm.serverIP" @change="onChange" placeholder="选择要部署的服务器">
        <el-option v-for="(item, index) in deployForm.serverIPList" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item  prop="phoneNumber" label="通知">
      <el-input v-model="deployForm.phoneNumber" placeholder="请输入11位电话" class="phone-input" maxlength="11"></el-input>
    </el-form-item>
    <slot></slot>
    <el-button type="primary" @click="onConfirm">开始部署</el-button>
  </el-form>
</template>

<script>
    export default {
        props: ['ipList','inline'],
        name: "deploy-start-form",
        data() {
            return {
                deployForm: {
                    serverIPList: this.ipList,
                    serverIP: '',
                    phoneNumber: ''
                },
                line: this.inline==null? true:this.inline,
                // todo rules不生效
                rules: {
                    serverIP:[
                        {required: false, message: "不能空", trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: "不能空", trigger: 'blur'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onConfirm() {
                this.$emit('confirm',this.deployForm)
            },
            onChange() {
                this.$emit('change',this.deployForm.serverIP)
            }
        }
    }
</script>

<style scoped>
.phone-input {
  max-width: 200px;
}
</style>
