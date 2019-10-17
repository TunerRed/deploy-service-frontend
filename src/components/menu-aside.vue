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
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/">选项一</el-menu-item>
          <el-menu-item index="1-2">选项二</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">分组二</template>
          <el-menu-item index="1-3">选项三</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项四</template>
          <el-menu-item index="1-4-1">选项一</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="test" >
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
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
            handleOpen(key, keyPath) {
                console.log(key,keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClick(key, keyPath) {
                console.log(this.$router, key, keyPath)
            }
        }
    }
</script>

<style scoped>
</style>
