const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId: {},
    collegeIdx: 0,
    departmentIdx: 0,
    multiArray: [],
    collegeData: [{
        collegeName: '四川大学',
        collegeId: 101,
        departments: [{
            departmentId: 1001,
            departmentName: '计算机学院'
          },
          {
            departmentId: 1002,
            departmentName: '艺术学院'
          },
          {
            departmentId: 1003,
            departmentName: '电气信息学院'
          }
        ]
      },
      {
        collegeName: '电子科大',
        collegeId: 102,
        departments: [{
            departmentId: 1004,
            departmentName: '水利水电学院'
          },
          {
            departmentId: 1005,
            departmentName: '外国语学院'
          },
          {
            departmentId: 1006,
            departmentName: '文学与新闻学院'
          }
        ]
      }
    ],
    multiIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载数据中',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.setMultiArray()
    wx.hideLoading()
  },
  // 通过学校信息数据，提取到multiArray中
  setMultiArray() {
    // TODO 这里的数据应该是完整的
    var collegeData = this.data.collegeData
    console.log('collegeData:' + collegeData)
    var collegeNameList = collegeData.map(item => { // 此方法将学校名称区分到一个新数组中
      return item.collegeName;
    });
    var departmentNameList = collegeData[0].departments.map(item => { // 此方法将专业名称区分到一个新数组中
      return item.departmentName;
    });
    var multiArray = []
    multiArray[0] = collegeNameList
    multiArray[1] = departmentNameList
    console.log('multiArray:' + multiArray)
    this.setData({
      multiArray: multiArray,
      collegeData: collegeData
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log('getUserInfo:', app.globalData.userInfo)
    if (app.globalData.userInfo != null) {
      // 如果成功获取到，设置一下
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
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

  },
  collegeChange(e) {
    console.log(e);
    this.setData({
      collegeIdx: e.detail.value
    })
  },
  departmentChange(e) {
    console.log(e);
    this.setData({
      departmentIdx: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    if (e.detail.value.memo.length >= 50) {
      //名字限制在50字符
      wx.showToast({
        title: '简介限制在50字符',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (app.globalData.userInfo == null) {
      //需要获取昵称
      wx.showToast({
        title: '需要授权获取昵称信息',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (e.detail.value.major==null || e.detail.value.major=='' 
     || e.detail.value.stuId==null || e.detail.value.stuId==''
     || e.detail.value.realName==null || e.detail.value.realName=='') {
      //需要专业
      wx.showToast({
        title: '专业、学号、真实姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    //数据正确，发起网络请求

    console.log('发起注册网络请求')
    var collegeId = this.data.collegeData[this.data.multiIndex[0]].collegeId
    var departmentId = this.data.collegeData[this.data.multiIndex[0]].departments[this.data.multiIndex[1]].departmentId
    var nickName = app.globalData.userInfo.nickName
    var rootUserId = app.globalData.userId
    console.log(collegeId + ' ' + departmentId + ' ' + nickName + ' ' + rootUserId)
    wx.request({
      url: app.globalData.baseUrl + '/desire_fu/v1/normal_account/add', // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        account_type: 1,
        college_id: collegeId,
        department_id: departmentId,
        major: e.detail.value.major,
        memo: e.detail.value.memo,
        nick_name: nickName,
        root_user_id: rootUserId,
        stu_id: e.detail.value.stuId,
        real_name: e.detail.value.realName
      },
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      success(res) {
        console.log('请求成功...')

        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 1000
        })

      }
    })

  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;

    if (e.detail.column == 0) {
      // 只有改变第一列的时候，第二列的值才会随之改变
      var departments = this.data.collegeData[e.detail.value].departments
      var departNameList = departments.map(item => {
        return item.departmentName;
      });
      console.log('departNameList:' + departNameList);
      data.multiArray[1] = departNameList
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
})