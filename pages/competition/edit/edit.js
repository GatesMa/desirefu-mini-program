// pages/competition/edit/edit.js
const app = getApp();
let richText = null; //富文本编辑器实例
var common = require("../../../common.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 编辑器
    readOnly: false, //编辑器是否只读
    placeholder: '开始编辑吧...',
  },

  // 编辑器
  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    console.log('[onEditorReady callback]')
    richText = this.selectComponent('#richText'); //获取组件实例
    // 设置值app.data.richTextContents中获取保存的数据
    richText.setContents(app.data.richTextContents)
  },

  //设置富文本内容
  setContents(rechtext) {
    console.log(rechtext)
    this.editorCtx.setContents({
      html: rechtext,
      success: res => {
        console.log('[setContents success]', res)
      }
    })
  },

  //撤销
  undo() {
    console.log('[undo callback]')
  },

  //恢复
  restore() {
    console.log('[restore callback]')
  },

  //清空编辑器内容
  clear() {
    this.editorCtx.clear({
      success: res => {
        console.log("[clear success]", res)
      }
    })
  },

  //清空编辑器事件
  clearBeforeEvent() {
    console.log('[clearBeforeEvent callback]')
    wx.showModal({
      cancelText: '取消',
      confirmText: '确认',
      content: '确认清空编辑器内容吗？',
      success: (result) => {
        if (result.confirm) {
          richText.clear();
        }
      },
      fail: (res) => {},
    })
  },

  //清空编辑器成功回调
  clearSuccess() {
    console.log('[clearSuccess callback]')
  },

  //清除当前选区的样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },

  //插入图片
  insertImageEvent() {
    wx.chooseImage({
      count: 1,
      success: res => {
        // 上传获取url
        common.uploadFile(res.tempFilePaths[0], 'IMG').then((url) => {
          //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
          richText.insertImageMethod(url).then(res => {
            console.log('[insert image success callback]=>', res)
          }).catch(res => {
            console.log('[insert image fail callback]=>', res)
          });
        }).catch(() => {
          wx.showToast({
            title: '出现问题',
            icon: 'none',
            duration: 1000
          })
        })

      }
    })
  },

  //保存，获取编辑器内容
  getEditorContent(res) {
    let {
      value
    } = res.detail;
    wx.showToast({
      title: '离线保存编辑器内容成功',
      icon: 'none',
    })
    console.log('[getEditorContent callback]=>', value)
    app.data.richTextContents = value.html;
  },

  //show文本工具栏
  showTextTool() {
    console.log('[bindfocus callback]=>', value)
    this.setData({
      textTool: !this.data.textTool
    })
  },

  //编辑器聚焦时触发
  bindfocus(res) {
    let {
      value
    } = res.detail;
    // console.log('[bindfocus callback]=>', value)
  },

  //编辑器失去焦点时触发
  bindblur(res) {
    let {
      value
    } = res.detail;
    // console.log('[bindblur callback]=>', value)
  },

  //编辑器输入中时触发
  bindinput(res) {
    let {
      value
    } = res.detail;
    console.log('[bindinput callback]=>', value)
    // app.data.richTextContents = value.detail.html;
  },

  //预览富文本
  preview() {
    wx.navigateTo({
      url: `../preview/preview`,
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