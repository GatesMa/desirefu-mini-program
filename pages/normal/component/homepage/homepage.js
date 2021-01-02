var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },

  /* 组件的初始数据 */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],
    loadModal: false, // 是否加载

    // 列表相关
    competitions: [], // 比赛列表
    page: 1,
    pageSize: 10,

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
    // 状态选择 
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
      this.setData({
        loadModal: true
      })
      this.getCompetitions()
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
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
    // 获取比赛列表
    getCompetitions() {

      var v_state = this.data.state == -1 ? null : this.data.state;
      var v_type = this.data.type == -1 ? null : this.data.type;
      var v_sortField = this.data.sortField
      var v_sortType = this.data.sortType
      var v_title = this.data.title ? this.data.title : null;
      var v_founder = this.data.founder ? this.data.founder : null;

      console.log('param:',v_state,v_type,v_sortField,v_sortType,v_title,v_founder)

      wx.request({
        url: app.globalData.baseUrl + '/desire_fu/v1/competition/select_scroll',
        data: {
          status: 1, // 默认只获取正常状态，不获取草稿
          state:  this.data.state == -1 ? null : this.data.state,
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
          console.log('res:', res.data)
          // console.log('canLoginAccountData:' + canLoginAccountData)
          this.setData({
            competitions: res.data.data.list
          })
        },
        fail: (err) => {
          wx.showToast({
            title: '获取数据异常',
            icon: 'error',
            duration: 2000
          })
        },
        complete: () => {
          this.setData({
            loadModal: false
          })
        }
      })
    },
    
  }

})