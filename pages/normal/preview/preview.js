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

    organizeNickName: '', // 队伍名称

    // 抽屉
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    // 抽屉
    organizeList: []
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

    // 获取队伍列表
    this.getOrganize()

  },

  // 队伍列表
  getOrganize() {
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/organize/list',
      data: {
        "competitionId": this.data.competition.competition_id
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success: (res) => {
        console.log('res:', res.data.data)
        this.setData({
          organizeList: res.data.data
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

  // 发起队伍请求
  applicationOrganize(e) {
    var item = e.currentTarget.dataset.item
    var organizeId = item.organizeId // 队伍Id
    wx.showModal({
      title: '提示',
      content: '确定向该队伍发起进队请求吗',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/desire_fu/v1/organize_application/add', // 仅为示例，并非真实的接口地址
            method: 'POST',
            data: {
              accountType: 1,
              accountId: app.globalData.account.account_id,
              createdUserId: app.globalData.userId,
              organizeId: organizeId
            },
            header: {
              'content-type': 'application/json',
              'Accept': 'application/json'
            },
            success(res) {
              console.log('请求成功...')
              var content = ''
              if (res.data.code == 0) {
                content = '申请成功，等待队长审批'
              } else {
                content = res.data.message
              }
              wx.showModal({
                title: '提示',
                content: content,
                showCancel: false,
                success (res) {
                  // do noting
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  foldBtn() {
    this.setData({
      isFold: !this.data.isFold
    })
  },

  organize() {
    var that = this
    console.log(this.data.organizeNickName)
    console.log(this.data.competition.competition_id)
    console.log(app.globalData.userId)
    console.log(app.globalData.account.account_id)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/organize/add', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        account_type: 5,
        competitionId: this.data.competition.competition_id,
        memo: '',
        nick_name: this.data.organizeNickName,
        root_user_id: app.globalData.userId,
        srcAccountId: app.globalData.account.account_id
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...')

        wx.showToast({
          title: '创建队伍成功',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          showInputName: false
        })
      }
    })
  },

  // 标题input
  nameInput(e) {
    this.setData({
      organizeNickName: e.detail.value
    })
  },

  hideModal() {
    this.setData({
      modalName: ''
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
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