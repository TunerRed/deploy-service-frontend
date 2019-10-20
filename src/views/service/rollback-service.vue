<template>
  <div>
    <deploy-start-form :ipList="ipList" @change="onServerChange" @confirm="confirm">
      <el-form-item label="可用备份">
        <el-tooltip effect="dark" :content="availPackage.info" placement="left-start">
          <el-select v-model="index">
            <el-option v-for="(availablePackage,index) in packageList" :key="index" :label="availablePackage.name" :value="index"></el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item></el-form-item>
    </deploy-start-form>
  </div>
</template>

<script>
    import DeployStartForm from "@/components/common/deploy-start-form";
    export default {
        name: "rollback-service",
        components: {DeployStartForm},
        data() {
            return {
                ipList: '',
                packageList: '',
                availPackage: '',
                index: ''
            }
        },
        created() {
            this.ipList = this.$api.service.getAvailableServerList().resultData.list
        },
        methods: {
            onServerChange(serverIP) {
                this.packageList = this.$api.service.getAvailPack(serverIP).resultData.list
            },
            confirm(deployForm) {
                if (this.availPackage==null || this.availPackage.name==null){
                    this.$message({message:'请选择一个回滚包',type:'warn'})
                    return
                }
                this.rollback(deployForm.serverIP, this.availPackage.name, deployForm.phoneNumber)
            },
            rollback(url,filename,phoneNumber) {
                console.log('rollback',url,filename,phoneNumber)
                this.$api.service.rollback(url,filename,phoneNumber)
                this.$message({message:'开始回滚',type:'success'})
            }
        },
        watch: {
            index (val){
                //console.log('index changed ',val)
                this.availPackage = this.packageList[val]
            }
        }
    }
</script>

<style scoped>

</style>
