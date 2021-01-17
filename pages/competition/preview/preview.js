
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    competition: {},
    isPre: false // 是否是预览
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var competition = JSON.parse(decodeURIComponent(options.competition));//解析得到对象
    var isPre = options.isPre == 'true' // 是否预览
    console.log(competition)
    console.log(isPre)
    this.setData({
      competition: competition,
      isPre: isPre
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