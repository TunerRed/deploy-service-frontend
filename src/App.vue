<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row style="margin-top: 15px;">
          <el-col :span="2" :offset="1">
            <el-button icon="el-icon-s-home" size="medium" type="warning" plain @click="()=>{this.$router.push('/')}">首页</el-button>
          </el-col>
          <el-col :span="3" :offset="17">
            <el-button v-if="!isLogin" size="small" type="primary" @click="onLoginClick" style="width: 100%;" round>登录</el-button>
            <el-tag v-if="isLogin" size="small" type="success" style="width: 100%;">欢迎，{{username}}</el-tag>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <menu-aside></menu-aside>
        </el-aside>
        <el-main>
          <img src="./assets/logo.png">
          <router-view/>
        </el-main>
      </el-container>
      <el-footer class="footer"></el-footer>
    </el-container>
  </div>
</template>

<script>
import MenuAside from "./components/menu-aside";
export default {
    name: 'App',
    components: {MenuAside},
    computed: {
        username() {
            return '' + this.$store.state.username
        },
        isLogin() {
            return this.$store.state.isLogin
        }
    },
    methods: {
        onLoginClick() {
            this.$router.replace({name: 'Login'})
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.header,.footer {
  background-color: bisque;
  height: 50px;
}
</style>

