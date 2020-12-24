//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    scrollLeft: 0,
    openId: '',
    userId: '',
    canLoginAccountData: [], // 用户可以登陆的账号列表s
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载数据中',
    })
    console.log('1:'  + new Date())
    // 1. 获取userInfo、openId、userId
    app.getUserInfo().then(() => {
      console.log('2:'  + new Date())
      // console.log('userInfo index:' + app.globalData.userInfo.nickName)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 2. 获取openId,等待app.js回调完成
      app.wxLogin().then(() => {
        console.log('3:'  + new Date())
        // console.log('openId index:' + app.globalData.openId)
        this.setData({
          openId: app.globalData.openId,
        })
        if (app.globalData.openId) {
          // 3. 获取userId
          app.getUserId(app.globalData.openId).then(() => {
            console.log('4:'  + new Date())
            // console.log('userId index:' + app.globalData.userId)
            this.setData({
              userId: app.globalData.userId,
            })
            // 4. 通过userId获取可以登陆的账号
            wx.request({
              url: app.globalData.baseUrl + '/desire_fu/v1/login/can_login_account',
              data: {
                user_id: app.globalData.userId
              },
              method: "POST",
              header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
              },
              success: (res) => {
                console.log('5:'  + new Date())
                var canLoginAccountData = res.data.data
                this.setData({
                  canLoginAccountData: canLoginAccountData
                })
                // console.log('canLoginAccountData:' + canLoginAccountData)
              },
              fail: (err) => {
                wx.showToast({
                  title: '获取数据异常',
                  icon: 'error',
                  duration: 2000
                })
              },
              complete: () => {
                wx.hideLoading()
              }
            })
          })
        }
      })
    })



  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  otherTabSelect() {
    this.setData({
      TabCur: -1
    })
  },
  addNormal() {
    wx.navigateTo({
      url: '../register/normal/normal'
    })
  },
  addCompetitionCreator() {
    wx.showModal({
      title: '提示',
      content: '申请比赛创建者账号请发邮件至开发者邮箱申请',
      showCancel: false,
      confirmText: '收到',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addOSS() {
    wx.showModal({
      title: '提示',
      content: '申请运营人员账号请发邮件至开发者邮箱申请',
      showCancel: false,
      confirmText: '收到',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})