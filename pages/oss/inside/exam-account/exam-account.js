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
      data: {},
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
      complete: () => {}
    })
  },

  handleAccount(e) {
    var item = e.currentTarget.dataset.item
    var that = this
    wx.showModal({
      title: '审批',
      content: '请选择是否审核通过该账号',
      cancelText: '拒绝',
      confirmText: '通过',
      success(res) {
        var status = 0
        if (res.confirm) {
          status = 1
        } else if (res.cancel) {
          status = 2
        }
        wx.request({
          url: app.globalData.baseUrl + '/desire_fu/v1/account/update',
          data: {
            "accountId": item.account_id,
            "accountStatus": status
          },
          method: "POST",
          header: {
            'content-type': 'application/json',
            'Accept': 'application/json'
          },
          success: (res) => {
            if (res.data.code != 0) {
              wx.showToast({
                title: '操作异常,可退出重试',
                icon: 'none',
                duration: 2000
              })
            } else {
              // 刷新请求列表
              wx.showToast({
                title: '审批成功',
                icon: 'success',
                duration: 2000
              })
              that.getAccountList()
            }
          },
          fail: (err) => {}
        })
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