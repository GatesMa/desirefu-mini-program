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
      value: 'Car'
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

    swiperList: [{
      id: 0,
      url: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/notice1.png'
    }, {
      id: 1,
      url: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/notice2.png',
    }],

    hideNotice: false,
    hideNoticeAni: false, // 动画，比hideNotice早设置值
    noticeContent: '通知内容', //通知内容
    showModel: false
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      this.getNotificationType2()
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    // 关闭通知
    closeNotice(e) {
      var that = this;
      console.log(e);
      that.setData({
        hideNoticeAni: true
      })
      // 500ms后隐藏元素
      setTimeout(function() {
        that.setData({
          hideNotice: true
        })
      }, 500)
    },
    showNotice(e) {
      this.setData({
        showModel: true
      })
    },
    hideModal(e) {
      this.setData({
        showModel: false
      })
    },
    getNotificationType2() {
      wx.request({
        url: app.globalData.baseUrl + '/desire_fu/v1/notification/select',
        data: {
          "status": 1,
          "type": 2
        },
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          console.log('res:', res.data.data.list)
          this.setData({
            noticeContent: res.data.data.list[0].content
          })
        },
        fail: (err) => {
          wx.showToast({
            title: '获取数据异常,可退出重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    // 跳转到通知页
    navToApplication() {
      wx.navigateTo({
        url: '/pages/normal/inside/application/application'
      })
    },
    // 跳转到消息
    navToMsg() {
      wx.navigateTo({
        url: '/pages/normal/inside/msg/msg'
      })
    }
  }

})