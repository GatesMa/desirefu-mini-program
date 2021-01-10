// pages/competition/component/list/list.js
var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loadModal: false, // 是否加载

    // 列表相关
    competitions: [], // 比赛列表
    page: 1,
    pageSize: 5,

    // model相关
    modalName: null,
    // 状态选择
    state: -1,
    stateName: '全部',
    stateList: [{
      state: '-1',
      stateName: '全部'
    }, {
      state: '0',
      stateName: '未开始'
    }, {
      state: '1',
      stateName: '进行中'
    }, {
      state: '2',
      stateName: '已结束'
    }],
    // 省级选择 
    type: -1,
    typeName: '全部',
    typeList: [{
      type: '-1',
      typeName: '全部'
    }, {
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
    // 排序选择 
    sortField: 'pv',
    sortType: 'desc',
    sortList: [{
      sortField: 'pv',
      sortType: 'desc',
      name: '浏览量高-低'
    }, {
      sortField: 'pv',
      sortType: 'asc',
      name: '浏览量低-高'
    }, {
      sortField: 'createdTime',
      sortType: 'desc',
      name: '创建时间晚-早'
    }, {
      sortField: 'createdTime',
      sortType: 'asc',
      name: '创建时间早-晚'
    }, {
      sortField: 'beginTime',
      sortType: 'desc',
      name: '开始时间晚-早'
    }, {
      sortField: 'beginTime',
      sortType: 'asc',
      name: '开始时间早-晚'
    }, {
      sortField: 'endTime',
      sortType: 'desc',
      name: '结束时间晚-早'
    }, {
      sortField: 'endTime',
      sortType: 'asc',
      name: '结束时间早-晚'
    }],
    // status草稿选择 
    status: -1,
    statusName: '全部',
    statusList: [{
      status: '-1',
      statusName: '全部'
    }, {
      status: '0',
      statusName: '是'
    }, {
      status: '1',
      statusName: '否'
    }],
    // 标题
    title: null,
    // founder
    founder: null
  },

  /* 组件声明周期函数 */
  lifetimes: {
    created: function () {

    },
    attached: function () {
      this.fillCompetitions()
      console.log('attached')
    },
    moved: function () {
    },
    detached: function () {
    },
  },

  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log('show')
      this.fillCompetitions()
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    chooseState(e) {
      var item = e.currentTarget.dataset.item
      // 修改数据同时隐藏model
      this.setData({
        state: item.state,
        stateName: item.stateName,
        modalName: null
      })
    },
    chooseType(e) {
      var item = e.currentTarget.dataset.item
      // 修改数据同时隐藏model
      this.setData({
        type: item.type,
        typeName: item.typeName,
        modalName: null
      })
    },
    chooseSort(e) {
      var item = e.currentTarget.dataset.item
      // 修改数据同时隐藏model
      this.setData({
        sortField: item.sortField,
        sortType: item.sortType,
        modalName: null
      })
      // 提升修改
      wx.showToast({
        title: '修改排序方式为：' + item.name,
        icon: 'none',
        duration: 1000
      })
    },
    chooseStatus(e) {
      var item = e.currentTarget.dataset.item
      // 修改数据同时隐藏model
      this.setData({
        status: item.status,
        statusName: item.statusName,
        modalName: null
      })
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
        page: this.data.page - 1,
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
    scrollFront() {

      this.setData({
        page: this.data.page + 1,
        loadModal: true
      })

      this.getCompetitionData().then((list) => {
        // console.log('competitionList:', list)
        // console.log('list.length, ', list.length)
        // console.log('list, ', list == null)
        // 这一页是空的
        if (list == null || list.length == 0) {
          wx.showToast({
            title: '已是最后一页',
            icon: 'none',
            duration: 2000
          })
          // page设置回去
          this.setData({
            page: this.data.page - 1,
            loadModal: false
          })
        } else {
          this.setData({
            competitions: list,
            loadModal: false
          })
        }
      })
    },
    // 获取比赛列表
    fillCompetitions() {
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
            status: this.data.status == -1 ? null : this.data.status, // 默认只获取正常状态，不获取草稿
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
            // console.log('res:', res.data)
            // console.log('canLoginAccountData:' + canLoginAccountData)
            // this.setData({
            //   competitions: res.data.data.list
            // })
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

    }
  }
})