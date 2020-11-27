const { request } = require('../../request/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabsList: [
      { id: 0, name: '综合', isActive: true },
      { id: 1, name: "销量", isActive: false },
      { id: 2, name: '价格', isActive: false },
    ],
    goods_list: {
      query: '',
      cid: '',
      pagenum: 1,
      pagesize: 7
    },
    goods: [],
    total: 0
  },
  getGoodsListData() {
    request({
      url: '/goods/search',
      data: this.data.goods_list
    }).then(res => {
      if (res.data.meta.status === 200) {
        const { goods,total } = res.data.message;
        this.setData({
          goods: [...this.data.goods, ...goods],
          total
        });
        wx-wx.stopPullDownRefresh();
      }
    })
  },
  itemChange(e) {
    const { index } = e.detail
    let { TabsList } = this.data
    console.log(TabsList);
    TabsList.forEach(i => {
      return i.id === index ? i.isActive = true : i.isActive = false
    });
    this.setData({
      TabsList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.cid);
    this.data.goods_list.cid = options.cid
    this.getGoodsListData();
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉成功');
    this.setData({
      goods:[]
    });
    this.data.goods_list.pagenum = 1
    this.getGoodsListData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.goods.length >= this.data.total) {
      console.log('我也是有底线的，您不能再拉了');
      return false
    }
    console.log('上拉刷新成功');
    this.data.goods_list.pagenum++;
    this.getGoodsListData()

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})