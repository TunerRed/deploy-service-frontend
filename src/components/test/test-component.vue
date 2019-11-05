<template>
    <div>
      <el-button type="primary" @click="testEvents">按钮1</el-button>
      <el-button type="primary" @click="testEvents" @cancel="testEvents2">按钮2</el-button>
      <el-form :rules="rules" :model="ruleForm" ref="myform">
        <el-form-item prop="name" label="用户名"><el-input v-model="ruleForm.name"></el-input></el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "test-component",
        data() {
            return {
                ruleForm: {
                  name: '',
                  passwd: ''
                },
                rules: {
                    name: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            testEvents() {
                return false
                //return this.$confirm('确定？')
            },
            testEvents2() {
                console.log('===cancel===')
            }
        }
    }
</script>

<style scoped>

</style>
