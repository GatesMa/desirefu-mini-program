// pages/oss/inside/idx-swiper/idx-swiper.js
var app = getApp();
var common = require("../../../../common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],

    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
  },

  // 公告栏
  getSwiperList() {
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/notification/select',
      data: {
        "status": 1,
        "type": 1
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log('res:', res.data.data.list)
        this.setData({
          swiperList: res.data.data.list
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

  navigateToNotice: function (e) {
    var item = e.currentTarget.dataset.item
    var competitionId = item.content // 比赛的id放在content里了
    wx.navigateTo({
      url: '/pages/competition/preview/preview?isPre=false&hasId=true&competitionId=' + competitionId
    })
  },

  // 图片选择框
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '你好',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  // id
  idInput(e) {
    this.setData({
      comId: e.detail.value
    })
  },

  addItem() {
    console.log(this.data.imgList)
    console.log(this.data.comId)
    if (this.data.imgList.length == 0) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.comId == null || this.data.comId == '') {
      wx.showToast({
        title: '请输入要跳转的比赛ID',
        icon: 'none',
        duration: 2000
      })
      return
    }
    common.uploadFile(this.data.imgList[0], 'IMG').then((url) => {
      this.requestCreateNotice(url, this.data.comId)
    }).catch(()=> {
      wx.showToast({
        title: '出现问题',
        icon: 'none',
        duration: 1000
      })
    })
  },

  requestCreateNotice(front_img, content) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/notification/add',
      method: 'POST',
      data: {
        type: 1,
        front_img: front_img,
        content: content
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1000
        })
        var tmp = [res.data.data]
        console.log(tmp)
        that.setData({
          swiperList: that.data.swiperList.concat(tmp)
        })
      }
    })
  },

  deleteItem(e) {
    // 1. 删除这个item
    this.data.swiperList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      swiperList: this.data.swiperList
    })

    // 2. 发请求删除
    var noticeId = e.currentTarget.dataset.item.noticeId
    console.log(noticeId)
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/notification/delete',
      data: {
        "noticeId": noticeId
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
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