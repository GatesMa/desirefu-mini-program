
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    competition: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var competition = JSON.parse(decodeURIComponent(options.competition));//解析得到对象
    console.log(competition)
    this.setData({
      competition: competition
    })
    // 设置富文本的值
    wx.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      var text = competition.content
      this.editorCtx.setContents({
        html: text,
        success: res => {
          console.log('[setContents success]')
        }
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onEditorReady() {
    
  }
})