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
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/message/select',
      data: {
        "accountId": 11,
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
        this.setData({
          msgList: res.data.data
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

  // 展示消息详情
  showDetail(e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    this.setData({
      item: item
    },()=>{
      //同步
      this.setData({
        showModel: true
      })
    })
    // 设置item的status为1
    var tmpMsgList = this.data.msgList
    tmpMsgList[e.currentTarget.dataset.idx].status = 1
    this.setData({
      msgList: tmpMsgList
    })

    // 同时请求后端接口设为已读
    this.readMsg(item.id)
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
    if (this.data.ListTouchDirection =='left'){
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})