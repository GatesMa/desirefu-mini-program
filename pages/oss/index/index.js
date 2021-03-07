// pages/normal/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    items: [{
        "iconPath": "/images/tabbar/oss-home.png",
        "selectedIconPath": "/images/tabbar/oss-home-selec.png",
        "text": "首页"
      },
      {
        "iconPath": "/images/tabbar/chart.png",
        "selectedIconPath": "/images/tabbar/chart-selec.png",
        "text": "图表"
      },
      {
        "iconPath": "/images/tabbar/oss-my.png",
        "selectedIconPath": "/images/tabbar/oss-my-selec.png",
        "text": "我的"
      }
    ],
    tabbarHeight: 60 // tabbar高度，默认60，会在onLoad中动态修改
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
    // 获取tabber栏的高度
    const query = wx.createSelectorQuery().in(this)
    query.select('.nav-tabs').boundingClientRect((rect) => {
      console.log(rect.height)
      this.setData({
        tabbarHeight: rect.height
      })
    }).exec()
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
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})