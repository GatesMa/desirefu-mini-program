// pages/competition/add/add.js
const app = getApp();
let richText = null; //富文本编辑器实例
var common = require("../../../common.js")

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

    status: 0, // 是否草稿

    overviewImgList: [], // 概览图片
    overviewText: '', // 概览文字
  },

  // 图片选择框
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.overviewImgList.length != 0) {
          this.setData({
            overviewImgList: this.data.overviewImgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            overviewImgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.overviewImgList,
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
          this.data.overviewImgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            overviewImgList: this.data.overviewImgList
          })
        }
      }
    })
  },
  // 概要文本
  overviewInput(e) {
    this.setData({
      overviewText: e.detail.value
    })
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

  // 发布按钮
  publish() {
    var that = this
    //设置status为非草稿，待审核状态
    that.setData({
      status: 1
    }, () => {
      console.log(that.data.status)
      this.createCompetition()
    })
  },

  draft() {
    var that = this
    //设置status为草稿状态
    that.setData({
      status: 0
    }, () => {
      console.log(that.data.status)
      this.createCompetition()
    })
  },

  // 预览修改
  preview() {
    var competition = {}
    competition.title = this.data.title ? this.data.title : 'xxxxx'
    competition.founder = this.data.founder ? this.data.founder : 'xxxxx'
    competition.created_ime = '2020-01-01 xx:xx:xx'
    competition.type = this.data.type
    competition.content = app.data.richTextContents
    wx.navigateTo({
      url: '/pages/competition/preview/preview?isPre=true&competition=' + encodeURIComponent(JSON.stringify(competition))
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
    // 打印参数
    console.log(type, begin_time, end_time, title, founder, account_id, account_type, userId, status)
    console.log(this.data.overviewImgList)
    console.log(this.data.overviewText)
    console.log('content:', content)
    // 打印参数

    console.log('发起注册网络请求')

    var overviewText = this.data.overviewText

    if (this.data.overviewImgList.length != 0) {
      // 如果有概要图片，先上传，获取上传链接
      common.uploadFile(this.data.overviewImgList[0], 'IMG').then((url) => {
        this.requestCreateCompe(account_id, account_type, begin_time, end_time, content, founder, status, title, type, userId, url, overviewText)
      }).catch(()=> {
        wx.showToast({
          title: '出现问题',
          icon: 'none',
          duration: 1000
        })
      })
    } else {
      this.requestCreateCompe(account_id, account_type, begin_time, end_time, content, founder, status, title, type, userId, '', overviewText)
    }
    
  },

  requestCreateCompe(account_id, account_type, begin_time, end_time, richTextContents, founder, status, title, type, userId, overviewImg, overviewText) {
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/competition/add',
      method: 'POST',
      data: {
        account_id: account_id,
        account_type: account_type,
        begin_time: begin_time,
        end_time: end_time,
        content: richTextContents,
        founder: founder,
        status: status,
        title: title,
        type: type,
        user_id: userId,
        overview_img: overviewImg,
        overview_text: overviewText
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
        // app.data.richTextContents 设置为空
        app.data.richTextContents = ''
        // 请求成功，back到首页
        wx.navigateBack({
          delta: 1
        });
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