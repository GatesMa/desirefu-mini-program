//app.js
App({
  data: {
    richTextContents: null // 富文本 编辑器
  },
  globalData: {
    userInfo: null,
    openId: null,
    baseUrl: null,
    userId: null,
    env: null,
    windowHeight: null,
    // colorui
    StatusBar: null,
    Custom: null,
    CustomBar: null
  },
  onLaunch: function () {
    // 1. 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 2. 将后端接口地址，存储到全局变量
    var baseUrl = this.getBaseUrl()
    this.globalData.baseUrl = baseUrl;

    // 3. color ui
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }

        // 计算高度，换算为rpx
        let clientHeight = e.windowHeight,
          clientWidth = e.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        this.globalData.windowHeight = calc;
      }
    })


  },
  // 获取后端接口地址
  getBaseUrl: function () {
    // 获取当前帐号信息
    var accountInfo = wx.getAccountInfoSync();
    // env类型
    var env = accountInfo.miniProgram.envVersion;
    this.globalData.env = env;
    if (!env) {
      console.error("获取运行环境失败!");
    }
    console.log('当前环境：' + env)
    var baseApi = {
      // 开发版
      develop: "http://192.168.124.8:8088", // localhost
      // 体验版
      trial: "https://gatesma.cn:8088",
      // 正式版
      release: "https://gatesma.cn:8088"
    };

    // request请求baseURL
    return baseApi[env];
  },
  // 登录，获取openId，换成userId
  wxLogin() {
    return new Promise((resolve, reject) => {
      var that = this
      // 先尝试本地缓存中获取
      wx.getStorage({
        key: 'openId',
        success: function (res) {
          that.globalData.openId = res.data;
          console.log('cache find openId:' + that.globalData.openId)
          return
        }
      })
      // 如果没有的话再从后端接口去拿
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code; //返回code
          wx.request({
            url: this.globalData.baseUrl + '/desire_fu/v1/external/code_2_wx_openid',
            data: {
              code: code
            },
            method: "POST",
            header: {
              'content-type': 'application/json',
              'Accept': 'application/json'
            },
            success: (res) => {
              var openId = res.data.data.open_id //返回openid
              this.globalData.openId = openId;

              // 本地存储，以免每次进入都需要很长的加载时间，微信的接口很慢
              wx.setStorage({
                key: 'openId',
                data: openId
              })

              resolve(res);
            }
          })
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  // getUser，通过电话，名称等信息，获取user
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 1. 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                resolve(res);
              }
            })
          }
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  // getUser，通过openId，获取userId
  getUserId(openId) {
    return new Promise((resolve, reject) => {
      // 用openId和userInfo信息创建一个user，这个接口是幂等的，如果存在则不会创建
      // 目前手机号、邮箱这些还没有办法获取到
      wx.request({
        url: this.globalData.baseUrl + '/desire_fu/v1/user/add',
        data: {
          cellphone: '',
          created_user_id: 1,
          email: '',
          login_name: openId,
          login_name_type: 2,
          user_name: this.globalData.userInfo.nickName
        },
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          var userId = res.data.data.user_id //返回userId
          this.globalData.userId = userId;
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  // 获取屏幕高度
  getWinHeight() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          let clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR;
          console.log(calc)
          this.globalData.windowHeight = calc;
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  }
})