// pages/oss/inside/exam-account/exam-account.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccountList() // 获取消息列表
  },

  getAccountList() {
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/normal_account/getExamList',
      data: {
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log('res:', res.data.data)
        this.setData({
          accountList: res.data.data
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
      }
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