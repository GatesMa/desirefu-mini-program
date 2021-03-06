// pages/normal/inside/collect/collect.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: [],
    page: 1,
    showModel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollect() // 获取消息列表
  },

  getCollect() {
    this.setData({
      loadModal: true
    })
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/competition/get_collect',
      data: {
        "accountId": app.globalData.account.account_id, //app.globalData.account.account_id
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
          return
        }
        this.setData({
          collectList: this.data.collectList.concat(res.data.data)
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

  navigateToCom: function (e) {
    var item = e.currentTarget.dataset.item
    var competitionId = item.competitionId // 比赛的id放在content里了
    wx.navigateTo({
      url: '/pages/normal/preview/preview?isPre=false&hasId=true&competitionId=' + competitionId
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
    this.getCollect()
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
    this.data.collectList = []
    this.getCollect()
    wx.stopPullDownRefresh();
  }
})