// pages/normal/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    items: [{
        "iconPath": "/images/tabbar/index2.png",
        "selectedIconPath": "/images/tabbar/index1.png",
        "text": "首页"
      },
      {
        "iconPath": "/images/tabbar/car2.png",
        "selectedIconPath": "/images/tabbar/car1.png",
        "text": "购物车"
      },
      {
        "iconPath": "/images/tabbar/my2.png",
        "selectedIconPath": "/images/tabbar/my1.png",
        "text": "我的"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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