<template>
  <el-card>
    <div id="statistic-chart" v-loading="loadingData"></div>
  </el-card>
</template>

<script>
    export default {
        name: "statistic",
        data() {
            return {
                dateList: [],
                chart: '',
                option: [],
                loadingData: true,
                maxGraphCount: 20
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            async init() {
                this.chart = this.$echarts.init(document.getElementById('statistic-chart'))
                this.loadingData = true
                const data = await this.$api.system.getStatistic()
                this.dateList = data.resultData.dateList
                this.initOption()
                this.loadingData = false
                if (this.option) {
                    this.chart.setOption(this.option)
                }
            },
            initOption() {
                let _that = this
                let heatmapData = [];
                let lunarData = [];
                if (!this.dateList || !this.dateList.length) {
                    this.$message.warning('未获取到统计数据')
                    this.option = null
                    return
                }
                for (let i = 0; i < this.dateList.length; i++) {
                    // 返回数据如果没有那一天，日历将显示为空白，需要手动添加
                    if (i > 0) {
                        const pre = new Date(lunarData[lunarData.length-1][0])
                        const cur = new Date(this.dateList[i].date)
                        let gap = cur.getDate() - pre.getDate()
                        // 同月和跨月两种情况
                        if (gap > 1 || (gap < 0 && (gap = (cur-pre)/(24*60*60*1000)) > 1)) {
                            let pushIndex = 0
                            while (++pushIndex < gap) {
                                let newDate = new Date(pre).setDate(pre.getDate()+pushIndex)
                                lunarData.push([newDate, 0, 0]);
                                heatmapData.push([newDate, 0]);
                            }
                        }
                    }
                    heatmapData.push([
                        this.dateList[i].date,
                        this.dateList[i].rate
                    ]);
                    lunarData.push([
                        this.dateList[i].date,
                        0,
                        this.dateList[i].rate
                    ]);
                }
                this.option = {

                    title: {
                        text: '部署频率表',
                        subtext: '（近2个月）',
                        left: 30,
                        top: 20,
                        textStyle: {
                            fontSize:17,
                            fontWeight:'normal',
                            color: '#11A2FF'
                        },
                        subtextStyle: {
                            color: '#666',
                            fontSize: 14
                        },
                    },
                    grid: {
                        bottom: 150,
                        left: 0,
                        right: '10%'
                    },

                    tooltip: {
                        formatter: function (params) {
                            return '频率: ' + params.value[1].toFixed(0) + '次';
                        }
                    },

                    visualMap: {
                        show: false,
                        min: 0,
                        max: this.maxGraphCount,
                        calculable: true,
                        seriesIndex: [1],
                        orient: 'vertical',
                        left: 'right',
                        bottom: 20,
                        inRange: {
                            color: ['rgba(255,255,255,0)', '#ff7902'],
                            opacity: 0.8
                        }
                    },

                    calendar: [{
                        left: 'center',
                        top: 'middle',
                        cellSize: [80, 30],
                        orient: 'vertical',
                        yearLabel: {show: false},
                        monthLabel: {nameMap: 'cn'},
                        dayLabel: {
                            firstDay: 7,
                            nameMap: 'cn'
                        },
                        range: [this.dateList[0].date,this.dateList[this.dateList.length-1].date]
                    }],

                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    const d = _that.$echarts.number.parseDate(params.value[0]);
                                    return d.getDate();
                                },
                                textStyle: {
                                    color: '#000'
                                }
                            }
                        },
                        data: lunarData
                    }, {
                        name: '频率表',
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: heatmapData
                    }]
                };
            }
        }
    }
</script>

<style scoped>
#statistic-chart {
  width: 100%;
  min-height: 400px;
  border: 2px solid grey;
  background-color: aliceblue;
}
</style>
