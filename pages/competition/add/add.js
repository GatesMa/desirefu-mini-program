// pages/competition/add/add.js
const app = getApp();
let richText = null; //富文本编辑器实例

Page({

  /**
   * 页面的初始数据
   */
  data: {

    begin_time: '2020-01-01',
    end_time: '2020-01-01',

    // 类型
    type: 0,
    typeList: [{
      type: '0',
      typeName: '院级'
    }, {
      type: '1',
      typeName: '校级'
    }, {
      type: '2',
      typeName: '省级'
    }, {
      type: '3',
      typeName: '国家级'
    }, {
      type: '4',
      typeName: '国际级'
    }],

    // 标题
    title: null,
    // founder
    founder: null,

    hasContent: false, // 文本框是否有内容

    status: 0// 是否草稿
  },

  navToEdit() {
    wx.navigateTo({
      url: `../edit/edit`,
    })
  },

  // 类型单选变化
  typeChange(e) {
    console.log(e);
    this.setData({
      type: e.detail.value
    })
  },
  startDateChange(e) {
    this.setData({
      begin_time: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      end_time: e.detail.value
    })
  },

  onEditorReady() {
    wx.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      this.editorCtx.setContents({
        html: app.data.richTextContents,
        success: res => {
          console.log('[setContents success]')
        }
      })
    }).exec()
  },

  // 标题input
  titleinput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  // founderinput
  founderinput(e) {
    this.setData({
      founder: e.detail.value
    })
  },

  // 创建比赛，发起请求
  createCompetition() {
    var type = this.data.type
    var begin_time = this.data.begin_time
    var end_time = this.data.end_time
    var title = this.data.title
    var founder = this.data.founder
    var content = app.data.richTextContents
    var account_id = app.globalData.account.account_id
    var account_type = app.globalData.account.account_type
    var userId = app.globalData.userId
    var status = this.data.status
    // 同步校验参数
    var isProblem = this.checkParam()

    if (!isProblem) {
      return
    }

    console.log(type, begin_time, end_time, title, founder, account_id, account_type, userId, status)
    console.log('content:', content)

    console.log('发起注册网络请求')
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/competition/add', 
      method: 'POST',
      data: {
        account_id: app.globalData.account.account_id,
        account_type: app.globalData.account.account_type,
        begin_time: this.data.begin_time,
        end_time: this.data.end_time,
        content: app.data.richTextContents,
        founder: this.data.founder,
        status: this.data.status,
        title: this.data.title,
        type: this.data.type,
        user_id: app.globalData.userId
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...')
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1000
        })

      }
    })
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
    // 如果内容不是null
    if (app.data.richTextContents) {
      this.setData({
        hasContent: true
      })
    }
    // 每次跳到这个界面的时候，设置content的值
    wx.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      this.editorCtx.setContents({
        html: app.data.richTextContents,
        success: res => {
          console.log('[setContents success]')
        }
      })
    }).exec()
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

  },
  // 校验调用接口的参数
  checkParam() {
    var begin_time = this.data.begin_time
    var end_time = this.data.end_time
    var title = this.data.title
    var founder = this.data.founder

    var str = ''
    if (begin_time >= end_time) {
      str = '开始时间不能比结束时间晚'
    }
    if (title == null || title == '') {
      str = '标题不能为空'
    }
    if (founder == null || founder == '') {
      str = '创办方不能为空'
    }
    if (str != '') {
      wx.showToast({
        title: str,
        icon: 'none',
      })
      return false
    }
    return true
  }
})