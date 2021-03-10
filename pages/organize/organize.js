// pages/organize/organize.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,

    organize: {},
    member: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = '爆龙战士';
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })

    // 获取队伍信息
    this.getOrganize()
    this.getOrganizeMember()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },

  getOrganize() {
    var that = this
    // console.log(app.globalData.account.account_id)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/organize/list',
      method: 'POST',
      data: {
        organizeId: app.globalData.account.account_id//app.globalData.account.account_id
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...', res.data)
        if (res.data == null || res.data.code != 0) {
          wx.showToast({
            title: '出现问题',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            organize: res.data.data[0]
          })
        }
      }
    })
  },

  getOrganizeMember() {
    var that = this
    // console.log(app.globalData.account.account_id)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/organize/listMember',
      method: 'POST',
      data: {
        organizeId: app.globalData.account.account_id//app.globalData.account.account_id
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...', res.data)
        if (res.data == null || res.data.code != 0) {
          wx.showToast({
            title: '出现问题',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            member: res.data.data
          })
        }
      }
    })
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