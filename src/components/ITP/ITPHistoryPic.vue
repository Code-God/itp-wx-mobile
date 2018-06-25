<template>
  <SanCard title="出血评分趋势图">
    <div v-show="show">
      <div id="myChart" :style="{width: '320px', height: '400px'}"></div>
    </div>
    <div class="no-data" v-if="!show">
      <img src="../../../static/svg/noData.svg" alt="">
      <p>暂无数据</p>
    </div>
  </SanCard>
</template>

<script>
import SanCard from "../common/SanCard";
export default {
  name: "ITPHistoryPic",
  data() {
    return {
      show: true
    };
  },
  components: {
    SanCard
  },
  props: {
    list: {
      required: true,
      type: Object
    }
  },
  watch: {
    list: function() {
      if (this.list.Items && this.list.Items.length > 0) {
        this.show = true;
        this.drawLine();
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    drawLine() {
      if (this.list.Items) {
        const container = document.querySelector("#myChart");
        const resizeContainer = () => {
          container.style.width = window.innerWidth + "px";
        };
        resizeContainer();
        const myChart = echarts.init(container);
        myChart.clear();
        let data = [];
        this.list.Items.forEach(item => {
          data.push([item.CreateTimeFormat, item.Result]);
        });

        myChart.setOption({
          title: {
            text: ""
          },
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            data: data.map(function(item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            },
            type: "value",
            min: 0,
            max: 5
          },
          dataZoom: [
            {
              start: 0,
              end: 100
            },
            {
              type: "slider"
            }
          ],
          visualMap: {
            type: "piecewise",
            orient: "horizontal",
            top: 12,
            right: 12,
            itemWidth: 16,
            itemGap: 8,
            pieces: [
              {
                lt: 1,
                color: "#62cd75",
                label: "1级\n无出血"
              },
              {
                lt: 2,
                gte: 1,
                color: "#62cdc9",
                label: "2级\n轻度"
              },
              {
                lt: 3,
                gte: 2,
                color: "#f5ae23",
                label: "3级\n中度"
              },
              {
                lt: 4,
                gte: 3,
                color: "#f57f23",
                label: "4级\n大量"
              },
              {
                gte: 4,
                color: "#e4462c",
                label: "5级\n严重"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          },
          series: {
            name: "趋势图",
            type: "line",
            symbolSize: 8,
            data: data.map(function(item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              symbol: "none",
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  lineStyle: {
                    color: "#999",
                    width: 1
                  }
                }
              },
              data: [
                {
                  yAxis: 1,
                  label: {
                    show: true,
                    position: "end",
                    formatter: "23123"
                  }
                },
                {
                  yAxis: 2
                },
                {
                  yAxis: 3
                },
                {
                  yAxis: 4
                },
                {
                  yAxis: 5
                }
              ]
            }
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../../static/css/variable.css");
.no-data {
  padding: 40px 0;
  & p {
    font-size: 14px;
    color: #d8d8d8;
  }
}
</style>
