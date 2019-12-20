<template>
<div>
  <h4>配置界面</h4>
  <el-divider><i class="el-icon-setting"></i></el-divider>
  <el-tabs v-model="activeTab" @tab-click="onTabClick" type="border-card">
    <el-tab-pane label="用户管理" name="user">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" @click="()=> tabUserData.dialogVisible = true">{{tabUserData.title}}</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-table :data="userData" border stripe class="table-header table-header_color">
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
        </el-table>
      </el-row>
      <el-dialog :visible.sync="tabUserData.dialogVisible" :title="tabUserData.title" width="30%">
        <div>
          <el-form label-width="80px" :model="addUserData" :rules="tabUserData.rules" ref="addUser">
            <el-form-item label="用户名" prop="username"><el-input v-model="addUserData.username"></el-input></el-form-item>
            <el-form-item label="密码" prop="password"><el-input type="password" v-model="addUserData.password"></el-input></el-form-item>
            <el-form-item label="电话" prop="phone"><el-input v-model="addUserData.phone"></el-input></el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabUserData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="主机管理" name="config">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" @click="()=> tabServerData.dialogVisible = true">{{tabServerData.title}}</el-button>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="tabServerData.dialogVisible" :title="tabServerData.title" width="30%">
        <div>
          <el-form label-width="80px" :model="addServerData" :rules="tabServerData.rules" ref="addServer">
            <el-form-item label="IP" prop="ip" required><el-input size="mini" v-model="addServerData.ip"></el-input></el-form-item>
            <el-form-item label="用户名" prop="username" required><el-input size="mini" v-model="addServerData.username"></el-input></el-form-item>
            <el-form-item label="密码" prop="password" required><el-input size="mini" type="password" v-model="addServerData.password"></el-input></el-form-item>
            <el-form-item label="主机类型" prop="type" required><el-input size="mini" v-model="addServerData.type"></el-input></el-form-item>
            <el-form-item label="运行路径" prop="runPath" required><el-input size="mini" v-model="addServerData.runPath"></el-input></el-form-item>
            <el-form-item label="日志路径" prop="logPath" required><el-input size="mini" v-model="addServerData.logPath"></el-input></el-form-item>
            <el-form-item label="部署路径" prop="deployPath" required><el-input size="mini" v-model="addServerData.deployPath"></el-input></el-form-item>
            <el-form-item label="备份路径" prop="backupPath" required><el-input size="mini" v-model="addServerData.backupPath"></el-input></el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabServerData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddServer">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="仓库管理" name="role">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" @click="()=> tabRepoData.dialogVisible = true">{{tabRepoData.title}}</el-button>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="tabRepoData.dialogVisible" :title="tabRepoData.title" width="30%">
        <div>
          <el-form label-width="80px" :model="addRepoData" :rules="tabRepoData.rules" ref="addRepo">
            <el-form-item label="用户名" prop="username"><el-input v-model="addRepoData.username"></el-input></el-form-item>
            <el-form-item label="密码" prop="password"><el-input type="password" v-model="addRepoData.password"></el-input></el-form-item>
            <el-form-item label="电话" prop="phone"><el-input v-model="addRepoData.phone"></el-input></el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabRepoData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddRepo">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="权限管理" name="time">
      <el-row :gutter="20">
        表格
      </el-row>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
    export default {
        name: "config",
        data () {
            let spaceValidator = (rule, value, callback) => {
                if (value.indexOf(" ") !== -1) {
                    callback(new Error('不能含有空格'))
                } else {
                    callback()
                }
            }
            return {
                tabUserData: {
                    title: '新增用户',
                    dialogVisible: false,
                    rules: {
                        username: [
                            {required:true,message:'用户名不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                        password: [
                            {required:true,message:'密码不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                        phone: [
                            {required:true,message:'电话号码不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                    }
                },
                tabServerData: {
                    title: '新增主机',
                    dialogVisible: false
                },
                tabRepoData: {
                    title: '新增仓库',
                    dialogVisible: false
                },

                addUserData: {
                    username: null,
                    password: null,
                    phone: null,
                    label1: '',
                    label2: ''
                },
                addServerData: {
                    ip: '',
                    username: '',
                    password: '',
                    type: '',
                    runPath: '',
                    logPath: '',
                    deployPath: '',
                    backupPath: ''
                },
                addRepoData: {},

                userData: [
                    {username: 'aaa',phone: '11111111112'},
                    {username: 'aaa',phone: '11111111112'},
                    {username: 'aaa',phone: '11111111112'},
                ],
                serverData: [],
                repoData: [],

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
                },
                activeTab: 'user'
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                // 初始化数据
                this.initUser()
                this.initServer()
                this.initRepo()
            },
            async initUser() {

            },
            async initServer() {

            },
            async initRepo() {

            },
            onTabClick(item) {
                console.log("config-tab",item)
            },
            onAddUser() {
                this.$refs['addUser'].validate( valid=>{
                    if (valid) {
                        const data =  this.$api.system.addUser(this.addUserData)
                        if (data) {
                            this.tabUserData.dialogVisible = false;
                            this.initUser()
                        }
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            },
            onAddServer() {
                this.$refs['addServer'].validate(async valid=>{
                    if (valid) {
                        const data = await this.$api.system.addUser(this.addServerData)
                        if (data) {
                            this.tabServerData.dialogVisible = false;
                            this.initServer()
                        }
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            },
            onAddRepo() {
                this.$refs['addRepo'].validate(async valid=>{
                    if (valid) {
                        const data = await this.$api.system.addUser(this.addRepoData)
                        if (data) {
                            this.tabRepoData.dialogVisible = false;
                            this.initRepo()
                        }
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            }
        }
    }
</script>

<style scoped>
.operation {
  position: relative;
  margin-left: 10px;
}
.operation-row {
    padding-bottom: 12px;
  }
  .config-card {
    width: 90%;
    margin-left: 5%;
    min-width: 500px;
    background-color: #eefffa;
    border: 1px solid #545c64;
  }
</style>
