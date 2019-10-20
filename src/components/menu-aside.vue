<template>
  <el-col class="el-menu-aside">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      @select="handleClick"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-location"></i><span>后端</span></template>
        <el-submenu index="1-1">
          <template slot="title">部署</template>
          <el-menu-item index="/service/deploy/git">从Git</el-menu-item>
          <el-menu-item index="/service/deploy/file">从文件</el-menu-item>
        </el-submenu>
        <el-menu-item index="/service/back">回滚</el-menu-item>
        <el-menu-item index="1-3">EUREKA</el-menu-item>
        <el-menu-item index="1-4">我的配置</el-menu-item>
      </el-submenu>
      <el-menu-item index="/test" >
        <i class="el-icon-menu"></i>
        <span slot="title">测试</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
    export default {
        name: "menu-aside",
        data() {
          return {
          }
        },
        methods: {
            // todo 获取正在运行的资源
            handleOpen(key, keyPath) {
                //console.log(key,keyPath)
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath)
            },
            handleClick(key, keyPath) {
                //console.log(this.$router, key, keyPath)
            }
        }
    }
</script>

<style scoped>
</style>
