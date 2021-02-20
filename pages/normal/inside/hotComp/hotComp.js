// pages/normal/inside/hotComp/hotComp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取比赛列表
  fillRank() {
    this.setData({
      loadModal: true
    })

    this.getCompetitionData().then((list) => {
      // console.log('competitionList:', list)
      this.setData({
        competitions: list,
        loadModal: false
      })
    })
  },

  getCompetitionData() {
    return new Promise((resolve, reject) => {

      wx.request({
        url: app.globalData.baseUrl + '/desire_fu/v1/competition/select_scroll',
        data: {
          status: 1, // 默认只获取正常状态，不获取草稿
          state: this.data.state == -1 ? null : this.data.state,
          type: this.data.type == -1 ? null : this.data.type,
          sort_field: this.data.sortField,
          sort_seq: this.data.sortType,
          title: this.data.title ? this.data.title : null,
          founder: this.data.founder ? this.data.founder : null,
          page: {
            page_num: this.data.page,
            page_size: this.data.pageSize
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          resolve(res.data.data.list);
        },
        fail: (err) => {
          wx.showToast({
            title: '获取数据异常',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            loadModal: false
          })
          reject(err);
        }
      })
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