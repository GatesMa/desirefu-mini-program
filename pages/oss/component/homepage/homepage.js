var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },

  /* 组件的初始数据 */
  data: {
    gridCol: 5,
    list: [{
        title: '首页轮播图',
        img: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/oss-1.jpg',
        url: '/idx-swiper/idx-swiper'
      },
      {
        title: '广场公告',
        img: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/oss-2.jpg',
        url: '/park-notice/park-notice'
      },
      {
        title: '广场轮播图',
        img: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/oss-3.jpg',
        url: '/park-swiper/park-swiper'
      }
    ]
  },

  /* 组件声明周期函数 */
  lifetimes: {
    created: function () {

    },
    attached: function () {

    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/oss/inside' + e.currentTarget.dataset.url
      })
    },
  }

})