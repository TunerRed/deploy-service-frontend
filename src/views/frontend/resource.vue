<template>
    <div>
      <h5>我的资源下载</h5>
      <el-divider><i class="el-icon-download"></i></el-divider>
      <Tips :content="tips" style="float: left"></Tips>
      <el-table :data="list" border class="table-header table-header_color" v-loading="loading">
          <el-table-column label="文件" prop="filename"></el-table-column>
          <el-table-column label="操作" min-width="200" align="center" fixed="right">
              <template slot-scope="scoped">
                  <el-button type="success" size="small" @click="download(scoped.row.filename)">下载</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
import { save } from "../../utils/saveFile"
import Tips from "@/components/common/tips";
export default {
    name: "resource",
    components: {Tips},
    data() {
      return {
        loading: false,
        tips: '由于技术原因，下载时缺少进度条，敬请理解',
        list: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        this.loading = true
        const data = await this.$api.frontend.userResource().finally(() => this.loading = false)
        let tmpList = []
        data.resultData.forEach(item => {
          tmpList.push({ filename: item })
        })
        this.list = [ ...tmpList ]
      },
      async download(filename) {
        if (!filename) {
          this.$message.error("空文件名，无法下载")
          return
        }
        this.$api.frontend.download(filename).then(res=>{
          save(res, filename)
        })
      }
    }
}
</script>

<style scoped>

</style>
