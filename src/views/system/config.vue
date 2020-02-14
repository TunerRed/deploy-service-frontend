<template>
<div>
  <h4>配置界面</h4>
  <el-divider><i class="el-icon-setting"></i></el-divider>
  <el-tabs v-model="activeTab" @tab-click="onTabClick" type="border-card">
    <el-tab-pane label="用户管理" name="user">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" :disabled="tabUserData.loadingData"
                     @click="()=> tabUserData.dialogVisible = true">{{tabUserData.title}}
          </el-button>
        </el-col>
      </el-row>
      <el-row class="config-table">
        <el-table :data="userData" border stripe class="table-header table-header_color" v-loading="tabUserData.loadingData">
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="联系方式" prop="phone"></el-table-column>
        </el-table>
      </el-row>
      <el-dialog :visible.sync="tabUserData.dialogVisible" :title="tabUserData.title" width="30%">
        <div>
          <el-form label-width="80px" :model="addUserData" :rules="tabUserData.rules" ref="addUser">
            <el-form-item label="用户名" prop="username"><el-input v-model="addUserData.username" maxlength="15"></el-input></el-form-item>
            <el-form-item label="密码" prop="password"><el-input type="password" v-model="addUserData.password" maxlength="15"></el-input></el-form-item>
            <el-form-item label="联系方式" prop="phone"><el-input v-model="addUserData.phone" maxlength="20"></el-input></el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabUserData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="主机管理" name="server">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" :disabled="tabServerData.loadingData"
                     @click="()=> {tabServerData.dialogVisible = true;tabServerData.update = false}">
            {{tabServerData.title}}
          </el-button>
        </el-col>
      </el-row>
      <el-row class="config-table">
        <el-table :data="serverData" border stripe class="table-header table-header_color" v-loading="tabServerData.loadingData">
          <el-table-column label="IP" prop="ip"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="主机类型" prop="type">
            <template slot-scope="scoped">{{(scoped.row.type==='FRONTEND'?'前端':'后端')+'服务器'}}</template>
          </el-table-column>
          <el-table-column label="运行路径" prop="runPath"></el-table-column>
          <el-table-column label="备份路径" prop="backupPath"></el-table-column>
          <el-table-column label="日志路径" prop="logPath"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <el-button size="mini" type="success" @click="onBtnUpdateServer(scoped.row)">更 新</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-dialog :visible.sync="tabServerData.dialogVisible" :title="tabServerData.title" width="30%">
        <div>
          <el-form label-width="80px" :model="addServerData" :rules="tabServerData.rules" ref="addServer">
            <el-form-item label="IP" prop="ip" required><el-input size="mini" v-model="addServerData.ip" maxlength="15" :disabled="tabServerData.update"></el-input></el-form-item>
            <el-form-item label="用户名" prop="username" required><el-input size="mini" v-model="addServerData.username" maxlength="10"></el-input></el-form-item>
            <el-form-item label="密码" prop="password" required><el-input size="mini" type="password" v-model="addServerData.password" maxlength="20"></el-input></el-form-item>
            <el-form-item label="主机类型" prop="type" required>
              <el-select size="mini" v-model="addServerData.type" placeholder="请选择主机类型" style="float: left" :disabled="tabServerData.update">
                <el-option label="部署前端" value="FRONTEND"></el-option>
                <el-option label="部署后端" value="SERVICE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运行路径" prop="runPath" :required="addServerData.type==='SERVICE'">
              <el-input size="mini" v-model="addServerData.runPath" placeholder="请输入相对HOME目录的路径，前端默认为Tomcat线程指定路径" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="日志路径（后端）" prop="logPath" v-if="addServerData.type==='SERVICE'" required>
              <el-input size="mini" v-model="addServerData.logPath" placeholder="请输入相对HOME目录的路径，存放nohup日志" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="上传路径" prop="deployPath" required>
              <el-input size="mini" v-model="addServerData.deployPath"  placeholder="请输入相对HOME目录的路径，临时存放上传文件" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="备份路径" prop="backupPath" required>
              <el-input size="mini" v-model="addServerData.backupPath"  placeholder="请输入相对HOME目录的路径，用于备份文件" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabServerData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddServer" v-if="tabServerData.update">更 新</el-button>
          <el-button type="primary" @click="onAddServer" v-if="!tabServerData.update">新 增</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="仓库管理" name="repo">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button class="operation" type="primary" size="mini" round icon="el-icon-plus" :disabled="tabRepoData.loadingData"
                     @click="()=> {tabRepoData.update = false;tabRepoData.dialogVisible = true}">
            {{tabRepoData.title}}
          </el-button>
        </el-col>
      </el-row>
      <el-row class="config-table">
        <el-table :data="repoData" border stripe class="table-header table-header_color" v-loading="tabRepoData.loadingData">
          <el-table-column label="仓库" prop="repo"></el-table-column>
          <el-table-column label="类型" prop="repoType">
            <template slot-scope="scoped">{{(scoped.row.repoType==='FRONTEND'?'前端':'后端')+'仓库'}}</template>
          </el-table-column>
          <el-table-column label="压缩文件名（前端）" prop="filename"></el-table-column>
          <el-table-column label="包所在位置（后端）" prop="location"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <el-button size="mini" type="success" @click="onBtnUpdateRepo(scoped.row)">更 新</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-dialog :visible.sync="tabRepoData.dialogVisible" :title="tabRepoData.title" width="30%">
        <div>
          <el-form label-width="100px" :model="addRepoData" :rules="tabRepoData.rules" ref="addRepo">
            <el-form-item label="仓库" prop="repo">
              <el-input v-model="addRepoData.repo" :disabled="tabRepoData.update" maxlength="30" placeholder="请输入Git仓库名，保证您的账户有pull权限"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="repoType">
              <el-select v-model="addRepoData.repoType" placeholder="请选择仓库类型" style="float: left">
                <el-option label="前端仓库" value="FRONTEND"></el-option>
                <el-option label="后端仓库" value="SERVICE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认文件夹" prop="filename" v-if="addRepoData.repoType==='FRONTEND'">
              <el-input v-model="addRepoData.filename" maxlength="10" placeholder="在tomcat目录下的文件夹名，默认为ROOT"></el-input>
            </el-form-item>
            <el-form-item label="包所在位置" prop="location" v-if="addRepoData.repoType==='SERVICE'">
              <el-input v-model="addRepoData.location" maxlength="50" placeholder="生成jar在仓库文件夹下的相对位置，如【target】"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tabRepoData.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddRepo" v-if="tabRepoData.update">更 新</el-button>
          <el-button type="primary" @click="onAddRepo" v-if="!tabRepoData.update">新 增</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="权限管理" name="grant">
      <el-row :gutter="20">
        用户可部署服务器权限，请在数据库配置
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="服务管理" name="service">
      <el-row :gutter="20">
        jar包启动参数，请在数据库修改
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
                    loadingData: false,
                    update: false,
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
                    dialogVisible: false,
                    loadingData: false,
                    update: false,
                    rules: {}
                },
                tabRepoData: {
                    title: '新增仓库',
                    dialogVisible: false,
                    loadingData: false,
                    update: false,
                    rules: {
                        repo: [
                            {required:true,message:'用户名不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                        repoType: [
                            {required:true,message:'类型不能为空',trigger:'blur'}
                        ],
                        filename: [
                            {required:true,message:'默认文件夹名不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                        location: [
                            {required:true,message:'文件路径不能为空',trigger:'blur'},
                            {validator: spaceValidator,trigger: 'blur'}
                        ],
                    }
                },

                addUserData: {
                    username: null,
                    password: null,
                    phone: null,
                    label1: '',
                    label2: ''
                },
                addServerData: {
                    ip: null,
                    username: null,
                    password: null,
                    type: null,
                    runPath: null,
                    logPath: null,
                    deployPath: null,
                    backupPath: null
                },
                addRepoData: {
                    repo: null,
                    repoType: null,
                    filename: null
                },

                userData: null,
                serverData: null,
                repoData: null,

                activeTab: 'user'
            }
        },
        mounted() {
            this.initUser()
        },
        methods: {
            initData() {
                // 初始化数据
                this.initUser()
                this.initServer()
                this.initRepo()
            },
            async initUser() {
                this.tabUserData.loadingData = true
                const data = await this.$api.system.getUserList()
                this.userData = data.resultData
                this.tabUserData.loadingData = false
            },
            async initServer() {
                this.tabServerData.loadingData = true
                const data = await this.$api.system.getServerList()
                this.serverData = data.resultData
                this.tabServerData.loadingData = false
            },
            async initRepo() {
                this.tabRepoData.loadingData = true
                const data = await this.$api.system.getRepoList()
                this.repoData = data.resultData
                this.tabRepoData.loadingData = false
            },

            onTabClick() {
                if (this.activeTab === 'user' && this.userData === null)
                    this.initUser()
                else if (this.activeTab === 'server' && this.serverData === null)
                    this.initServer()
                else if (this.activeTab === 'repo' && this.repoData === null)
                    this.initRepo()
            },

            onAddUser() {
                this.$refs['addUser'].validate(async valid=>{
                    if (valid) {
                        this.tabUserData.dialogVisible = false;
                        this.tabUserData.loadingData = true;
                        const data = await this.$api.system.updateUser(this.addUserData, this.tabUserData.update)
                        if (data) {
                            this.initUser()
                            this.$message.success('注册成功，请注意新用户没有服务器访问权限')
                        }
                        this.tabUserData.loadingData = false;
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            },
            onAddServer() {
                this.$refs['addServer'].validate(async valid=>{
                    if (valid) {
                        this.tabServerData.dialogVisible = false;
                        this.tabServerData.loadingData = true;
                        const data = await this.$api.system.updateServer(this.addServerData, this.tabServerData.update)
                        this.$message.success('更新成功')
                        if (data) {
                            this.initServer()
                        }
                        this.tabServerData.loadingData = false;
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            },
            onAddRepo() {
                this.$refs['addRepo'].validate(async valid=>{
                    if (valid) {
                        this.tabRepoData.dialogVisible = false;
                        this.tabRepoData.loadingData = true;
                        const data = await this.$api.system.updateRepo(this.addRepoData, this.tabRepoData.update)
                        this.$message.success('更新成功')
                        if (data) {
                            this.initRepo()
                        }
                        this.tabRepoData.loadingData = false;
                    } else {
                        this.$message.warning('输入有误')
                    }
                })
            },

            onBtnUpdateServer(row) {
                this.addServerData=Object.assign({},row);
                this.tabServerData.update=true;
                this.tabServerData.dialogVisible=true;
            },
            onBtnUpdateRepo(row) {
                this.addRepoData=Object.assign({},row);
                this.tabRepoData.update=true;
                this.tabRepoData.dialogVisible=true;
            }
        }
    }
</script>

<style scoped>
.operation {
  position: relative;
  margin-left: 10px;
}
.config-table {
  margin-top: 20px;
}
</style>
