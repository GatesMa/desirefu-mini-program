// pages/normal/profile/profile.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    normalAccount: {},
    account_status: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置账号状态
    this.setData({
      account_status: app.globalData.account.account_status
    })
    // 获取学生账号的一些信息
    this.queryAccount()
  },

  queryAccount() {
    var that = this
    console.log(app.globalData.account.account_id)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/normal_account/get',
      method: 'POST',
      data: {
        account_id: app.globalData.account.account_id
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...')
        console.log(res.data)
        if (res.data.data == null || res.data.data.length == 0) {
          wx.showToast({
            title: '出现问题',
            icon: 'none',
            duration: 1000
          })
        } else {
          that.setData({
            normalAccount: res.data.data[0]
          })
        }
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