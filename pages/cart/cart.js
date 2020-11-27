// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    cartCheckedAll: false,
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
  //1、购物商品的复选框
  handleChange(e) {
    let {
      index
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    cart[index].checked = !cart[index].checked;

    this.totalPrice(cart);
  },
  //3、全选框
  totalChange() {
    let {
      cart,
      cartCheckedAll
    } = this.data;
    //没有商品时不能让全选钩上
    if (!cart.length) cartCheckedAll = false
    cartCheckedAll = !cartCheckedAll
    console.log(cartCheckedAll);
    cart.forEach(i => i.checked = cartCheckedAll);
    this.totalPrice(cart);
    // this.setData({
    //   cart,
    //   cartCheckedAll
    // })
    //这里点击无法取反cartCheckedAll的值，是没有给data当中赋值。
  },
  //4、商品数量的增加与减少,并且带有删除商品功能
  numChange(e) {
    const {
      addsub,
      id
    } = e.currentTarget.dataset;
    const {
      cart
    } = this.data;
    const index = cart.findIndex(i => i.goods_id === id);
    if (addsub === 1) {
      cart[index].num++
    } else {
      if (cart[index].num <= 1) {
        wx.showModal({
          title: '提示',
          content: '您确定要删除此商品吗',
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定');
              cart.splice(index, 1);
              this.totalPrice(cart);
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
          fail(err) {
            console.log(err);
          }
        });
      }
      cart[index].num--
    };
    this.totalPrice(cart)
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
  //跳转到支付页面。
  jumpPay(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
  ,

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