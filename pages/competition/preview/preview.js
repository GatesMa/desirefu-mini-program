const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    competition: {},
    isPre: false, // 是否是预览


    isFold: false, // 是否折叠按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hasId = options.hasId == 'true' // 是否是通过id查看详情
    var isPre = options.isPre == 'true' // 是否预览
    if (hasId) {
      var competitionId = options.competitionId
      var competitionIds = []
      competitionIds[0] = competitionId
      wx.request({
        url: app.globalData.baseUrl + '/desire_fu/v1/competition/select_scroll',

        data: {
          "competition_ids": competitionIds
        },
        method: "POST",
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        success: (res) => {
          console.log('res:', res.data)
          var competition = res.data.data.list[0]
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
        fail: (err) => {
          wx.showToast({
            title: '获取数据异常',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      console.log(competition)
      console.log(isPre)
      var competition = JSON.parse(decodeURIComponent(options.competition)); //解析得到对象
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
    }

  },

  foldBtn() {
    this.setData({
      isFold: !this.data.isFold
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onEditorReady() {

  }
})