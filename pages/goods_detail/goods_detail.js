const {
  request
} = require('../../request/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    col: [],
    icon: false
  },
  goodsInfo: {},
  getGoodsDetailData(id) {
    request({
      url: '/goods/detail',
      data: {
        goods_id: id
      }
    }).then(res => {
      const result = res.data.message;
      this.goodsInfo = result;
      let col = wx.getStorageSync('col');
      let icon = col.some(i => i.goods_id === this.goodsInfo.goods_id);
      // let icon = false
      // col.forEach(i=>i.goods_id === this.goodsInfo.goods_id ? icon = true:icon = false)
      this.setData({
        goods: {
          goods_name: result.goods_name,
          goods_price: result.goods_price,
          goods_number: result.goods_number,
          goods_introduce: result.goods_introduce,
          pics: result.pics,
          attrs: result.attrs,
        },
        icon
      });
      //1、先把请求过来的数据存储到本地
      // wx.setStorageSync('goods', {
      //   time: Date.now(),
      //   data: this.data.goods
      // })
    }, err => {
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //改变商品的收藏状态
  changeCollec() {
    let col = wx.getStorageSync('col') || [];
    let index = col.findIndex(i => i.goods_id === this.goodsInfo.goods_id)
    let icon = false
    if (index === -1) {
      col.push(this.goodsInfo);
      icon = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    } else {
      col.splice(index, 1)
      icon = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    };
    this.setData({
      col,
      icon
    })
    wx.setStorageSync('col', col);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    // 3、再次刷新页面时，首先获取到本地数据。
    // let goods = wx.getStorageSync('goods');
    // //4、如果当前刷新页面的时间小于了上次请求数据时间15秒，则不再进行重新请求，而是使用本地存储数据，不要忘了return true返回出来。
    // if (Date.now() - goods.time < 1000 * 10) {
    //   this.setData({
    //     goods: goods.data
    //   });
    //   return true
    // }
    // 2、页面加载时进行请求
    this.getGoodsDetailData(goods_id - 0);
    // this.changeCollec()
  },
  //预览图片
  previewImage(e) {
    let urls = this.goodsInfo.pics.map(i => i.pics_mid)
    let {
      index
    } = e.currentTarget.dataset
    wx.previewImage({
      current: urls[index],
      urls
    })
  },
  //加入购物车
  handleCartAdd() {
    //先获取本地存储中的数据为一个空字符串。
    let cart = wx.getStorageSync('cart') || [];
    //判断一下当前页面的id值与本地存储的id值相同吗？
    let index = cart.findIndex(i => i.goods_id === this.goodsInfo.goods_id);
    //如果不相同则返回-1，并且给当前商品的数据加上一个num = 1,再添加到本地存储的数组中
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      //如果有数据了，则让已经有的这份数据的num++
      cart[index].num++;
    };
    //最后在存储到本地当中。
    wx.setStorageSync('cart', cart);
    //可以来了提示。
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },
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