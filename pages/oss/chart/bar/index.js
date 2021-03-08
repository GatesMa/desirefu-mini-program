import * as echarts from '../../../ec-canvas/echarts';
var app = getApp();
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ecBar: {
      // 如果想要禁止触屏事件，以保证在图表区域内触摸移动仍能滚动页面，
      // 就将 disableTouch 设为 true
      // disableTouch: true,

      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

        return barChart;
      }
    }
  },

  onReady() {
  }
});

function getBarOption() {
  return {
    color: ['#37a2da'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['ACM程序设计竞赛', '全国英语口语大赛', '全国英语竞赛', '全国数学竞赛', '数学建模', '微信小程序开发赛', '大创', '互联网+', '服务外包大赛'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [370, 50, 150, 250, 220, 270, 310, 350,512],
        itemStyle: {
          emphasis: {
            color: '#37a2da'
          }
        }
      }
    ]
  };
}
