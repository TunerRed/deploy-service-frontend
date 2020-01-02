<template>
  <div id="app">
    <el-container id="parent">
      <el-header class="header">
        <el-row style="margin-top: 15px;">
          <el-col :span="2">
            <el-button icon="el-icon-s-home" size="medium" type="info" circle @click="()=>{this.$router.push('/')}"></el-button>
          </el-col>
          <el-col :span="4" :offset="17">
            <el-button v-if="!isLogin" size="small" type="primary" @click="onLoginClick" style="min-width: 80px;width: 100%;" round>登录</el-button>
            <el-tag v-if="isLogin" size="small" type="success" style="width: 120px;min-width: 80px;">欢迎，{{username}}</el-tag>
            <el-button v-if="isLogin" size="mini" type="info" @click="()=>{this.$router.replace({name: 'Login'})}" style="min-width: 80px;width: 25%;margin-left: 10px;" round>重新登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container">
        <el-aside id="menu-col" width="200px">
          <menu-aside></menu-aside>
        </el-aside>
        <el-main>
          <img class="main-img" src="./assets/logo.png" @click="()=>{this.$router.push('/')}">
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

<style scoped>
  .main-img:hover {
    cursor: pointer;
  }
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: ghostwhite;
  min-height: 95%;
  margin: 0;
}
#parent {
  min-height: 800px;
}
.header,
.footer {
  background-color: deepskyblue;
  height: 50px;
}
#menu-col {
  background-color: #545c64;
}
/*修改全局table表头高度，需要添加class为table-header*/
.table-header .el-table__header th {
  padding: 0;
  height: 40px;
}
.table-header_color  .el-table__header th {
  background-color: #eefffa;
}
</style>

