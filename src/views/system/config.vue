<template>
<div>
  <h4>配置界面</h4>
  <el-divider><i class="el-icon-setting"></i></el-divider>
  <el-collapse accordion>
    <el-collapse-item title="从Git部署前端" name="1">
      <el-row class="operation-row">
        <el-col :span="2"><el-button class="operation" type="primary" circle icon="el-icon-plus" @click="addFrontConfigVisible=true"></el-button></el-col>
        <el-col :span="2"><el-button class="operation" type="danger" circle icon="el-icon-delete" @click="removeFrontendConfig"></el-button></el-col>
      </el-row>
      <el-table :data="configData.frontendConfig" width="100%" border>
        <el-table-column label="应用名" prop="app_name" min-width="50"></el-table-column>
        <el-table-column label="部署用户" prop="username" min-width="80"></el-table-column>
        <el-table-column label="所在服务器" prop="server" min-width="150"></el-table-column>
        <el-table-column label="仓库" prop="repository" min-width="200"></el-table-column>
        <el-table-column label="临时部署/备份文件夹" prop="deploy_dir" min-width="200"></el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item title="从Git部署后台" name="2">
      <el-row class="operation-row">
        <el-col :span="2"><el-button class="operation" type="primary" circle icon="el-icon-plus" @click="addServiceConfigVisible=true"></el-button></el-col>
        <el-col :span="2"><el-button class="operation" type="danger" circle icon="el-icon-delete" @click="removeServiceConfig"></el-button></el-col>
      </el-row>
      <el-table :data="configData.serviceConfig" width="100%" border>
        <el-table-column label="应用名" prop="app_name" min-width="150" fixed="left"></el-table-column>
        <el-table-column label="部署用户" prop="username" min-width="80"></el-table-column>
        <el-table-column label="所在服务器" prop="server" min-width="150"></el-table-column>
        <el-table-column label="仓库" prop="repository" min-width="200"></el-table-column>
        <el-table-column label="临时部署/备份文件夹" prop="deploy_dir" min-width="200"></el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
  <el-dialog :visible.sync="addFrontConfigVisible" title="新增前端配置">
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFrontConfigVisible = false">取 消</el-button>
      <el-button type="primary" @click="addFrontConfigVisible = false">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog :visible.sync="addServiceConfigVisible" title="新增后端配置">
    <div slot="footer" class="dialog-footer">
      <el-button @click="addServiceConfigVisible = false">取 消</el-button>
      <el-button type="primary" @click="addServiceConfigVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    export default {
        name: "config",
        data () {
            return {
                addFrontConfigVisible: false,
                addServiceConfigVisible: false,
                configData: {
                    frontendConfig: [
                        {
                            app_name: 'ynjg',
                            repository: '仓库1',
                            server: '128.196.0.1',
                            deploy_dir: '/home/tomcat/deploy',
                            username: 'tomcat',
                            password: ''
                        },
                        {
                            app_name: 'gzfw',
                            repository: '仓库2',
                            server: '128.196.0.1',
                            deploy_dir: '/home/tomcat/deploy',
                            username: 'tomcat',
                            password: ''
                        },
                        {
                            app_name: '应用名也是webapps下文件夹名',
                            repository: '仓库1',
                            server: '128.196.0.2',
                            deploy_dir: '/home/tomcat/deploy',
                            username: 'ynzw',
                            password: ''
                        }
                    ],
                    serviceConfig: [
                        {
                            app_name: '乌拉-test',
                            repository: '仓库1',
                            server: '128.196.0.3',
                            deploy_dir: '/home/tomcat/deploy',
                            username: 'ynzw',
                            password: ''
                        }
                    ]
                }
            }
        },
        methods: {
            removeFrontendConfig () {
              this.$message({type:'success',message:'绝版哒'})
            },
            removeServiceConfig () {
                this.$message({type:'success',message:'全部木大'})
            }
        }
    }
</script>

<style scoped>
.operation {
  position: relative;
  margin-left: 5px;
}
.operation-row {
    padding-bottom: 12px;
  }
</style>
