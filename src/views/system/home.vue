<template>
    <div>
      <div class="home-header">
        <h2>在？过来加班</h2>
        <hr size="4" color="green">
      </div>
      <el-row class="home-container">
        <el-col class="home-banner" :span="12" :offset="1">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in 3" :key="item">
              <el-image fit="fill" :src="'./static/banner/banner'+item+'.png'"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col class="home-message" :span="8" :offset="2">
          <el-card>
            <div>
              <el-row>
                <el-col :span="3" :offset="1"><el-badge :value="newMessageCount" :hidden="newMessageCount === 0"><el-tag type="success" class="message-title">近期消息</el-tag></el-badge></el-col>
              </el-row>
              <hr size="2" color="green">
            </div>
            <div class="message-container">
              <el-row :gutter="20" v-for="item in messageList" v-if="item.show" :key="item.messageId" class="message-content">
                <el-col :span="20">
                  <el-alert :title="item.title" :type="item.isRead==='0'?'success':'info'" :closable="closable"
                            show-icon close-text="已阅" @close="onMessageRead(item)">
                  </el-alert>
                </el-col>
                <el-col :span="3"><el-button type="primary" size="mini" @click="onMessageClick(item)" style="margin-top: 3px;">详情</el-button></el-col>
              </el-row>
            </div>
          </el-card>
          <el-dialog :visible.sync="detail.visible" width="30%">
            <div v-html="detail.username" style="text-align: left"></div><el-divider></el-divider>
            <div v-html="detail.ip" style="text-align: left"></div><el-divider></el-divider>
            <div v-html="detail.time" style="text-align: left"></div><el-divider></el-divider>
            <div v-html="detail.content" style="text-align: left"></div>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" size="mini" @click="detail.visible = false">确定</el-button>
                  </span>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                newMessageCount: 1,
                messageList: [],
                detail: {
                    visible: false,
                    title: '',
                    username: '',
                    ip: '',
                    time: '',
                    content: ''
                }
            }
        },
        mounted() {
            this.initData()
        },
        computed: {
            closable() {
                return this.$store.state.isLogin
            }
        },
        methods: {
            async initData() {
                this.newMessageCount = 0
                const data = await this.$api.system.getCommonMessage()
                this.messageList = data.resultData.map((item)=>{
                    this.newMessageCount += Number(item.isRead)^1
                    item.show = true
                    item.title = '用户 ['+item.user+'] 在 ['+item.startTime.slice(0,10)+'] 进行了部署'
                    return item
                })
            },
            async onMessageRead(item) {
                item.show = false
                await this.$api.system.updateReadMessage(item.messageId)
                this.newMessageCount--
            },
            onMessageClick(item) {
                this.detail.username = '登录账号：' + item.user
                this.detail.content = '详细日志：<br>' + item.result.replace(/\n/g,'<br>')
                this.detail.ip = '登录IP：'+item.ip+' 操作目的IP：'+item.target
                this.detail.time = '操作确认时间：[' + item.startTime + ']<br/>任务完成时间：[' + item.endTime + ']'
                this.detail.visible = true
            }
        }
    }
</script>

<style scoped>
.home-header {
  padding-bottom: 30px;
}
.home-container {
  padding-bottom: 50px;
}
.home-message {
  padding-bottom: 10px;
}
  .message-title {
    font-size: 14px;
    font-weight: bold;
  }
  .message-content {
    margin-bottom: 5px;
  }
</style>
