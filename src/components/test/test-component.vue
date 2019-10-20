<template>
    <div>
      <el-button type="primary" @click="testEvents">按钮1</el-button>
      <el-button type="primary" @click="testEvents" @cancel="testEvents2">按钮2</el-button>
    </div>
</template>

<script>
    export default {
        name: "test-component",
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
