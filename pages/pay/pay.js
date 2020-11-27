// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    cartNum: 0,
    cartTotalPrice: 0,
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cart = wx.getStorageSync('cart') || [];
    this.setData({
      cart
    });
    this.totalPrice(cart);
  },
  //2、计算商品的总价格和总数量
  totalPrice(cart) {
    const cartCheckedAll = cart.length ? cart.every(i => i.checked) : false;
    const cartTotalPrice = cart.filter(i => {
      return i.checked
    }).reduce((grossValue, i) => {
      return grossValue + i.goods_price * i.num
    }, 0);
    let cartNum = 0;
    cart.forEach(i => i.checked ? cartNum += i.num : 0);
    this.setData({
      //首先要把值先存到data当中，然后在存入本地，之后再导入到data当中。
      cart,
      cartCheckedAll,
      cartTotalPrice,
      cartNum
    });
    //要让缓存当中的数据与data当中的数据同步
    wx.setStorageSync('cart', cart)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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