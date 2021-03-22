// miniprogram/pages/index/index.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls: [],
    listData: [],
    current: 'links'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getBannerList();
    this.getListData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //点赞方法
  handleLinks(ev) {
    let id = ev.target.dataset.id //自定义属性
    console.log("id",id);
    wx.cloud.callFunction({
      //使用哪个方法
      name: 'update',
      data: {
        //哪个集合（表）
        collection: 'users',
        //精准查询到那一条
        doc: id,
        //使用db.command 点击一次+1
        data: "{links:_.inc(1)}"
      }
    }).then(res => {

      let updated = res.result.stats.updated;
      if (updated) {
        let cloneListData = [...this.data.listData];
        for (let i = 0; i < cloneListData.length; i++) {
          if (cloneListData[i]._id == id) {
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData: cloneListData
        })
      }

    })
  },
  //好友列表展示方法：当current为links，按照点赞数，当为time时，按照最新时间展示
  handleCurrent(ev) {
    let current = ev.target.dataset.current;
    if (current == this.data.current) {
      return false;
    }
    this.setData({
      current
    },()=>{
      this.getListData();
    });
  },
  //获取好友列表信息
  getListData() {
    db.collection('users').field({
      userPhoto: true,
      nickName: true,
      links: true
    }).orderBy(this.data.current, 'desc').get().then(res => {
      this.setData({
        listData: res.data
      })
    })
  },
  //跳转到详情
  handleDetail(ev){
    let id=ev.target.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?userId='+id,
    })
  },
  //获取轮播图
  getBannerList(){
db.collection('banner').get().then((res)=>{
  this.setData({
    imageUrls:res.data
  })
})
  }
})