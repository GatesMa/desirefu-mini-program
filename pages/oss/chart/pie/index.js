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
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: [{
        value: 370,
        name: 'ACM程序设计竞赛'
      }, {
        value: 50,
        name: '全国英语口语大赛'
      }, {
        value: 150,
        name: '全国英语竞赛'
      }, {
        value: 250,
        name: '全国数学竞赛'
      }, {
        value: 220,
        name: '数学建模'
      }, {
        value: 270,
        name: '微信小程序开发赛'
      }, {
        value: 310,
        name: '大创'
      }, {
        value: 350,
        name: '互联网'
      }, {
        value: 512,
        name: '服务外包大赛'
      }]
    }]
  };
}
