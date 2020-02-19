<template>
  <el-tooltip :content="content" :disabled="content==null" placement="right" effect="light">
    <i :class="icon||'el-icon-question'" class="tips"></i>
  </el-tooltip>
</template>

<script>
  export default {
      name: "tips",
      props: ['content','icon']
  }
</script>

<style>
  .tips {
    /*float: left;*/
    margin: 0 0 10px 15px;
    /*margin-left: 15px;*/
    font-size: 20px;
  }
  .tips:hover {
    cursor: pointer;
  }
</style>
