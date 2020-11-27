const {
  request
} = require('../../request/request')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    value:''
  },
  time: null,
  //搜索功能
  commoditySearch(e) {
    let {
      value
    } = e.detail;
    if (value.length === 0) {
      this.setData({
        searchList: [],
      });
      return 
    }
    value = value.trim();
    clearInterval(this.time);
    this.time = setInterval(() => {
      if (new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5]+$").test(value)) {
        this.getSearchData(value);
      } else {
        console.log('您输入的不是非法字符而且有空格出现');
      }
      clearInterval(this.time);
    }, 1000)

  },
  //得到搜索列表的数据。
  getSearchData(query) {
    request({
      url: '/goods/qsearch',
      data: {
        query
      }
    }).then(res => {
      let searchList = res.data.message;
      this.setData({
        searchList
      });
    })
  },
  //清空搜索框内容以及下拉列表
  emptyTap() {
    console.log();
    this.setData({
      searchList: [],
      value: ''
    });
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