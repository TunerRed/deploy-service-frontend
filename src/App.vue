<template>
  <div id="app">
    <el-container>
      <el-header class="header"></el-header>
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
    components: {MenuAside}
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
}
</style>

