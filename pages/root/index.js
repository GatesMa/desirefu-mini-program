// pages/root/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountId: null,
    userId: null,
    searchAccountId: null,
    searchUserId: null,
    listData: [{
        "code": "120",
        "text": "70",
        "date": "2018年4月19日"
      },
      {
        "code": "125",
        "text": "74",
        "date": "2018年4月17日"
      },

      {
        "code": "119",
        "text": "76",
        "date": "2018年4月16日"
      },
      {
        "code": "117",
        "text": "78",
        "date": "2018年4月15日"
      }
    ],
    roleList: [],
    page: 1,
    pageSize: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fillRoleRelations()
    // this.getRoleRelation() // 获取消息列表
  },

  accountIdInput(e) {
    this.setData({
      accountId: e.detail.value
    })
  },
  userIdInput(e) {
    this.setData({
      userId: e.detail.value
    })
  },
  searchAccountIdInput(e) {
    this.setData({
      searchAccountId: e.detail.value
    })
  },
  searchUserIdInput(e) {
    this.setData({
      searchUserId: e.detail.value
    })
  },
  add() {
    console.log(this.data.accountId)
    console.log(this.data.userId)
    if (this.data.accountId == null || this.data.userId == null) {
      wx.showToast({
        title: '账号ID或用户ID不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/login/addRoleRelation',
      data: {
        "accountId": this.data.accountId,
        "role": 2,
        "userId": this.data.userId
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
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: (err) => {}
    })
  },

  // 获取列表
  fillRoleRelations() {
    this.getRoleRelationData().then((list) => {
      console.log('roleList:', list)
      this.setData({
        roleList: list
      })
    })
  },

  getRoleRelationData() {
    return new Promise((resolve, reject) => {

      wx.request({
        url: app.globalData.baseUrl + '/desire_fu/v1/login/selectRoleRelation',
        data: {
          "accountId": this.data.searchAccountId ? this.data.searchAccountId : null,
          page: {
            page_num: this.data.page,
            page_size: this.data.pageSize
          },
          "userId": this.data.searchUserId ? this.data.searchUserId : null,
        },
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          console.log('res:', res.data)
          // console.log('canLoginAccountData:' + canLoginAccountData)
          // this.setData({
          //   competitions: res.data.data.list
          // })
          resolve(res.data.data);
        },
        fail: (err) => {
          wx.showToast({
            title: '获取数据异常',
            icon: 'none',
            duration: 2000
          })
          reject(err);
        }
      })
    })
  },

  scrollBack() {
    // 第一页不允许翻页
    if (this.data.page == 1) {
      wx.showToast({
        title: '已是第一页',
        icon: 'none',
        duration: 2000
      })
      return
    }

    this.setData({
      page: this.data.page - 1
    })

    this.getRoleRelationData().then((list) => {
      console.log('roleList:', list)
      this.setData({
        roleList: list
      })
    })
  },
  scrollFront() {

    this.setData({
      page: this.data.page + 1
    })

    this.getRoleRelationData().then((list) => {
      // 这一页是空的
      if (list == null || list.length == 0) {
        wx.showToast({
          title: '已是最后一页',
          icon: 'none',
          duration: 2000
        })
        // page设置回去
        this.setData({
          page: this.data.page - 1
        })
      } else {
        this.setData({
          roleList: list
        })
      }
    })
  },

  delete(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否继续',
      cancelText: '取消',
      confirmText: '删除',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id
          // console.log('roleId ', e.currentTarget.dataset)
          wx.request({
            url: app.globalData.baseUrl + '/desire_fu/v1/login/deleteRoleRelation',
            data: {
              "accountRoleId": id
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
              that.setData({
                page: 1
              })
              that.getRoleRelationData().then((list) => {
                // console.log('roleList:', list)
                that.setData({
                  roleList: list
                })
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
        } else if (res.cancel) {}
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