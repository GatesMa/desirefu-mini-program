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
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
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
    navToAccount() {
      wx.navigateTo({
        url: '/pages/oss/inside/exam-account/exam-account' 
      })
    },
    navToOrganize() {
      wx.navigateTo({
        url: '/pages/oss/inside/exam-organize/exam-organize' 
      })
    },
  }

})