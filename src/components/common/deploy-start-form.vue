<template>
  <el-form :model="deployForm" :rules="rules" :inline="line" ref="deployForm">
    <el-form-item label="可选服务器" prop="serverIP">
      <el-select v-model="deployForm.serverIP" @change="onChange" placeholder="选择要部署的服务器">
        <el-option v-for="(item, index) in deployForm.serverIPList" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item  prop="phoneNumber" label="通知">
      <el-input v-model.number="deployForm.phoneNumber" placeholder="请输入11位电话" class="phone-input" maxlength="11"></el-input>
    </el-form-item>
    <slot></slot>
    <el-button type="primary" @click="onConfirm" :disabled="deploying">开始部署</el-button>
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
                deploying: false,
                line: this.inline==null? true:this.inline,
                rules: {
                    serverIP:[
                        {required: true, message: "不能空", trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: "不能空", trigger: 'blur'},
                        { type: 'number', message: '必须为数字', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onConfirm() {
                this.$refs.deployForm.validate((valid)=>{
                    if (valid) {
                        this.$emit('confirm',this.deployForm)
                        this.deploying=true
                    }else {
                        this.$message({type:'warning',message:'请检查输入'})
                    }
                })
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
