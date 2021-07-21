<template>
  <div class="pie-background">
  <div id="myChart" :style="{width: '100%', height: '300px'}"></div>

  </div>
</template>
<script>
export default {
  name: 'hello',
  props: {
    data: {
      type: [Array, Object, String, Boolean, Number],
      default: () => {
        return {}
      }
    },

  },


  mounted() {


  },
  methods: {
    drawLine(data) {
      const chartDom = document.getElementById('myChart');
      const myChart = this.$echarts.init(chartDom);
      let option;
      option = {
        backgroundColor: '#FFFFFF',


        color: ['#73C0DF', '#546FC6'],
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: '1111111'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: 15,
        },

        map: {
          mapType: 'china',   // 各省的mapType暂时都用中文
          mapLocation: {
            x: 'width',
            y: 'height'
            // width    // 自适应
            // height   // 自适应
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            data: data,
            radius: '55%',
            center: ['50%', '55%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 30,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },

      option && myChart.setOption(option);
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize();
        }
      }, 200)


    }
  }
}
</script>

<style scoped>
.pie-background{
  overflow: hidden;
  border-radius: 5px;
  background-color:#FFFFFF;
  margin: 0 10px;
  display: flex;
  -webkit-box-flex:1;
  -moz-box-flex:1;
  -ms-flex:1;
  -webkit-flex:1;
  flex:1;
}
</style>