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
        title: '背景',
        name: 'background',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '文本',
        name: 'text',
        color: 'purple',
        icon: 'font'
      },
      {
        title: '图标 ',
        name: 'icon',
        color: 'mauve',
        icon: 'icon'
      },
      {
        title: '按钮',
        name: 'button',
        color: 'pink',
        icon: 'btn'
      },
      {
        title: '标签',
        name: 'tag',
        color: 'brown',
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