<template>
    <div>
      <el-col :span="12" :offset="6">
        <el-card class="login-card">
          <el-form :model="loginForm" :rules="loginRule" ref="login" label-width="65px">
            <el-form-item label="用户名" prop="username"><el-input v-model="loginForm.username" placeholder="用户名"></el-input></el-form-item>
            <el-form-item label="密码" prop="password"><el-input v-model="loginForm.password" placeholder="密码"></el-input></el-form-item>
            <el-form-item align="left">
              <el-col :span="4"><el-checkbox v-model="loginForm.rememberMe" border size="small">记住密码</el-checkbox></el-col>
              <el-col :span="8" :offset="12"><el-button type="success" size="small" @click="onLogin" style="margin-top: -5px;width: 100%">登录</el-button></el-col>
            </el-form-item>
            <el-form-item></el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    rememberMe: false
                },
                loginRule: {
                    username: [{required: true, message: '用户名不能为空'}],
                    password: [{required: true, message: '密码不能为空'}]
                }
            }
        },
        mounted() {
            if (localStorage.getItem('username')) {
                this.loginForm.username = localStorage.getItem('username')
            }
            if (localStorage.getItem('password')) {
                this.loginForm.password = localStorage.getItem('password')
                this.loginForm.rememberMe = true
            }
        },
        methods: {
            onLogin() {
                this.$refs['login'].validate(async (valid)=>{
                    if (valid) {
                        const data = await this.$api.system.userLogin(this.loginForm.username, this.loginForm.password)
                        this.$message.success('登录成功')
                        localStorage.setItem('username',this.loginForm.username)
                        localStorage.setItem('token',data.resultData.token)
                        this.$store.commit('username', this.loginForm.username)
                        this.$store.commit('isLogin',true)
                        if (this.loginForm.rememberMe) {
                            localStorage.setItem('rememberMe',true)
                            localStorage.setItem('password',this.loginForm.password)
                        } else {
                            localStorage.setItem('rememberMe',false)
                            localStorage.removeItem('password')
                        }
                        this.$router.replace({name: 'Home'})
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>
