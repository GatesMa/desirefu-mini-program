var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的初始数据 */
  data: {
    elements: [{
        title: '布局',
        name: 'layout',
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
    // 关闭通知
    closeNotice(e) {
      var that = this;
      console.log(e);
      that.setData({
        hideNoticeAni: true
      })
      // 500ms后隐藏元素
      setTimeout(function () {
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
          if (res.data.data.list && res.data.data.list.lenght != 0) {
            this.setData({
              noticeContent: res.data.data.list[0].content
            })
          }
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
    },
    // 跳转到热门
    navToHot() {
      wx.navigateTo({
        url: '/pages/normal/inside/hotComp/hotComp'
      })
    },
    navToQuestion() {
      wx.navigateTo({
        url: '/pages/normal/inside/question/question'
      })
    },
    navToCollect() {
      wx.navigateTo({
        url: '/pages/normal/inside/collect/collect'
      })
    }
  }

})