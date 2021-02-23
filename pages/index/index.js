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

    grant: true, // 是否已经授权
  },
  navigateToSystem: function (e) {
    var item = e.currentTarget.dataset.item
    // 全局设置account信息
    app.globalData.account = item
    if (item.account_type == 1) {
      wx.navigateTo({
        url: '../normal/index/index',
      })
    } else if (item.account_type == 2) {
      wx.navigateTo({
        url: '../competition/index/index',
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.grantUserInfo().then(res => {
      if (res) {
        // 已经有授权
        this.setData({
          grant: true
        })
        this.init()
      } else {
        // 没有授权，展示授权窗口
        this.setData({
          grant: false
        })
      }
    })
  },

  onShow: function () {
    // 每次回到这个界面的时候请求当前账号列表
    this.getCanLoginAccount()
  },

  // 查询是否已授权，如果没有授权，展示授权按钮
  grantUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log('已授权用户信息')
            resolve(true);
          } else {
            console.log('没有授权')
            resolve(false);
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
    
  },

  getUserInfo(e) {
    // 权限检测，是否已授权，防止用户点击拒绝
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("=====已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log(e)
          app.globalData.userInfo = e.detail.userInfo
          // 设置信息，取消模态框
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            grant: true
          })
          // 执行init方法，调用后端接口获取user绑定的账号信息、openid等
          that.init()
        } else {
          console.log("=====未授权=====")
          wx.showModal({
            title: '拜托了',
            content: '不授权真的用不了',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })


  },

  init() {
    this.setData({
      loadModal: true
    })
    console.log('1:' + new Date())
    // 1. 获取userInfo、openId、userId
    app.getUserInfo().then(() => {
      console.log('2:' + new Date())
      // console.log('userInfo index:' + app.globalData.userInfo.nickName)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 2. 获取openId,等待app.js回调完成
      app.wxLogin().then(() => {
        console.log('3:' + new Date())
        // console.log('openId index:' + app.globalData.openId)
        this.setData({
          openId: app.globalData.openId,
        })
        if (app.globalData.openId) {
          // 3. 获取userId
          app.getUserId(app.globalData.openId).then(() => {
            console.log('4:' + new Date())
            // console.log('userId index:' + app.globalData.userId)
            this.setData({
              userId: app.globalData.userId,
            })
            // 4. 通过userId获取可以登陆的账号
            this.getCanLoginAccount()
          })
        }
      })
    })
  },

  getCanLoginAccount() {
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
        console.log('5:' + new Date())
        var canLoginAccountData = res.data.data
        this.setData({
          canLoginAccountData: canLoginAccountData
        })
        console.log('canLoginAccountData:', res)
      },
      fail: (err) => {
        wx.showToast({
          title: '获取数据异常',
          icon: 'error',
          duration: 2000
        })
      },
      complete: () => {
        this.setData({
          loadModal: false
        })
      }
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
    // 如果存在学生账号
    if (this.data.canLoginAccountData!=null && this.data.canLoginAccountData.length!=0 && this.data.canLoginAccountData[0].platform_type == 1) {
      wx.showModal({
        title: '提示',
        content: '一个微信号只能创建或绑定一个学生账号',
        showCancel: false,
        confirmText: '收到',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
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
      success(res) {
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
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})