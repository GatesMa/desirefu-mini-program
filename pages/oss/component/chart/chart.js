var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的初始数据 */
  data: {
    elements: [{
        title: '比赛热度',
        name: 'Hot Rank',
        url: 'bar',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '饼图热度',
        name: 'Pie',
        url: 'pie',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '散点图',
        name: 'Scatter',
        url: 'scatter',
        color: 'purple',
        icon: 'font'
      },
      {
        title: '敬请期待 ',
        name: 'Coming soon',
        color: 'grey',
        icon: 'icon'
      },
      {
        title: '敬请期待',
        name: 'Coming soon',
        color: 'grey',
        icon: 'btn'
      },
      {
        title: '敬请期待',
        name: 'Coming soon',
        color: 'grey',
        icon: 'tagfill'
      },
      {
        title: '敬请期待',
        name: 'Coming soon',
        color: 'grey',
        icon: 'btn'
      },
      {
        title: '敬请期待',
        name: 'Coming soon',
        color: 'grey',
        icon: 'tagfill'
      }
    ],
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    
  }

})