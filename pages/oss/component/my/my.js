var app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null, // 用户信息
    account: null, // 账号信息
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  attached() {
    // 设置用户信息
    this.setData({
      userInfo: app.globalData.userInfo,
      account: app.globalData.account,
    })
    console.log(app.globalData.account)

  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/zanCode.png'],
        current: 'https://dfu-1257282228.cos.ap-chengdu.myqcloud.com/dfu/zanCode.png' // 当前显示图片的http链接      
      })
    },
    navToProfile() {
      wx.navigateTo({
        url: `/pages/oss/profile/profile`,
      })
    }
  }
})