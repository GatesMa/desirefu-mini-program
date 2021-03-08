import * as echarts from '../../../ec-canvas/echarts';
var app = getApp();
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
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

  onReady() {}
});

function getBarOption() {
  var data = [];
  var data2 = [];

  for (var i = 0; i < 10; i++) {
    data.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 40)
      ]
    );
    data2.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    );
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  };
  return {
    color: ["#FF7070", "#60B6E3"],
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
        type: 'scatter',
        name: 'aaaa',
        data: data
      },
      {
        name: 'bbbb',
        type: 'scatter',
        data: data2
      }
    ],
    animationDelay: function (idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
}