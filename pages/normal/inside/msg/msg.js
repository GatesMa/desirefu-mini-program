// pages/normal/inside/msg/msg.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    page: 1,
    showModel: false
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMsg() // 获取消息列表
  },

  getMsg() {
    this.setData({
      loadModal: true
    })
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/message/select',
      data: {
        "accountId": app.globalData.account.account_id,
        "page": {
          "page_num": this.data.page,
          "page_size": 10
        }
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log('res:', res.data.data)
        if (res.data.data == null || res.data.data.length == 0) {
          wx.showToast({
            title: '已经全部加载完',
            icon: 'none',
            duration: 2000
          })
        }
        this.setData({
          msgList: this.data.msgList.concat(res.data.data)
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '获取数据异常,可退出重试',
          icon: 'none',
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

  // 展示消息详情
  showDetail(e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    this.setData({
      item: item
    }, () => {
      //同步
      this.setData({
        showModel: true
      })
    })
    // 如果是新消息
    if (item.status == 0) {
      // 设置item的status为1
      var tmpMsgList = this.data.msgList
      tmpMsgList[e.currentTarget.dataset.idx].status = 1
      this.setData({
        msgList: tmpMsgList
      })

      // 同时请求后端接口设为已读
      this.readMsg(item.id)
    }
  },

  readMsg(id) {
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/message/update_status',
      data: {
        "ids": [id],
        "status": 1
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
      },
      fail: (err) => {
        wx.showToast({
          title: '发生异常',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  readOneMsg(e) {
    if (this.data.msgList[e.currentTarget.dataset.index].status == 0) {
      // 1. 处理这个item
      this.data.msgList[e.currentTarget.dataset.index].status = 1;
      this.setData({
        msgList: this.data.msgList
      })

      // 2. 发请求修改状态
      var id = e.currentTarget.dataset.id
      this.readMsg(id)
    }
  },

  deleteMsg(e) {
    // 1. 删除这个item
    this.data.msgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      msgList: this.data.msgList
    })

    // 2. 发请求删除
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/message/delete',
      data: {
        "ids": [id]
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
      },
      fail: (err) => {
        wx.showToast({
          title: '发生异常',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  readAll() {
    // 1. 当前列表先全设已读
    for (let i = 0; i < this.data.msgList.length; ++i) {
      this.data.msgList[i].status = 1
    }
    this.setData({
      msgList: this.data.msgList
    })
    // 2. 发请求后端数据设状态
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/message/read_all_mag',
      data: {
        "accountId": app.globalData.account.account_id
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
      },
      fail: (err) => {
        wx.showToast({
          title: '发生异常',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  hideModal(e) {
    this.setData({
      showModel: false
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reachBottom')
    this.data.page = this.data.page + 1
    this.getMsg()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.data.page = 1
    this.data.msgList = []
    this.getMsg()
    wx.stopPullDownRefresh();
  }

})