<template>
  <div>
    <h5>SERVICE</h5>
    <service-table></service-table>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <el-form v-model="deployForm" :inline="true" ref="deployForm">
      <el-form-item  prop="serverIP" label="服务器"><el-input v-model="deployForm.serverIP" placeholder="请输入服务器"></el-input></el-form-item>
      <el-form-item  prop="phoneNumber" label="电话"><el-input v-model="deployForm.phoneNumber" placeholder="请输入电话"></el-input></el-form-item>
      <el-button type="primary" @click="onDeploy">开始部署</el-button>
    </el-form>
  </div>
</template>

<script>
    import ServiceTable from "@/components/services/service-table";
    export default {
        name: "deploy-service",
        components: {ServiceTable},
        data() {
          return {
              deployForm: {
                  serverIP: '',
                  phoneNumber: ''
              },
              // todo rules不生效
              rules: {
                  serverIP:[
                      {required: false, message: "不能空", trigger: 'blur'}
                  ],
                  phoneNumber: [
                      {required: true, message: "不能空", trigger: 'blur'},
                      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ]
              }
          }
        },
        mounted() {
            console.log('mounted')

        },
        methods: {
            onDeploy() {
                console.log(this.deployForm.serverIP);
                this.$refs["deployForm"].validate((valid) => {
                    if (valid) {
                        alert("success");
                    }else {
                        alert("error")
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
.require {
  color: red;
}
</style>
