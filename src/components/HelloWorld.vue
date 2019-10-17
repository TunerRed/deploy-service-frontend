<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col>
        <h2>Essential Links</h2>
        <ul>
          <li>
            <a
              href="https://vuejs.org"
              target="_blank"
            >
              Core Docs
            </a>
          </li>
          <li>
            <a
              href="https://forum.vuejs.org"
              target="_blank"
            >
              Forum
            </a>
          </li>
          <li>
            <a
              href="https://chat.vuejs.org"
              target="_blank"
            >
              Community Chat
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/vuejs"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <br>
          <li>
            <a
              href="http://vuejs-templates.github.io/webpack/"
              target="_blank"
            >
              Docs for This Template
            </a>
          </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
          <li>
            <a
              href="http://router.vuejs.org/"
              target="_blank"
            >
              vue-router
            </a>
          </li>
          <li>
            <a
              href="http://vuex.vuejs.org/"
              target="_blank"
            >
              vuex
            </a>
          </li>
          <li>
            <a
              href="http://vue-loader.vuejs.org/"
              target="_blank"
            >
              vue-loader
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/awesome-vue"
              target="_blank"
            >
              awesome-vue
            </a>
          </li>
        </ul>
      </el-col>
      <el-col >
        <el-button type="primary">test</el-button>
        <div id="main" style="height: 200px;width: 100%;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuAside from "./menu-aside";
export default {
  name: 'HelloWorld',
    components: {MenuAside},
    data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    mounted() {

        this.initChart()
    },
    methods: {
      initChart:function() {
          var chartDiv=this.$echarts.init(document.getElementById("main"))
          var opt = {
              title: {
                  text: "Hello Chart"
              },
              xAxis: {
                  data: ["1","2","3","4"]
              },
              yAxis: {},
              series: [{
                  name: "销量",
                  type: 'bar',
                  data: [5,15,12,1]
              }]
          }
          chartDiv.setOption(opt)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
