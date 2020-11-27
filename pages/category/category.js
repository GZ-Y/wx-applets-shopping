const { request } = require('../../request/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCategoryList: [],
    rightCategoryList: [],
    currentIndex:0
  },
  categoryList:[],
  getCategoryData() {
    request({
      url:'/categories'
    }).then(res => {
      if (res.data.meta.status === 200) {
        this.categoryList = res.data.message;
        const leftCategoryList = this.categoryList.map(e => e.cat_name);
        const rightCategoryList = this.categoryList[0].children
        this.setData({
          leftCategoryList,
          rightCategoryList
        });
        wx.setStorageSync('cate',{
          time:Date.now(),
          data:this.categoryList
        });
      }

    })
  },

  itemChange(e){
    const {index} = e.currentTarget.dataset;
    const rightCategoryList = this.categoryList[index].children
    this.setData({
      currentIndex:index,
      rightCategoryList
    });

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cate = wx.getStorageSync('cate');
    if(Date.now() - cate.time < 6000 * 10 * 60){
      const leftCategoryList = cate.data.map(e => e.cat_name);
      const rightCategoryList = cate.data[0].children
      this.setData({
        leftCategoryList,
        rightCategoryList
      });
      return true
    }
    this.getCategoryData();
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