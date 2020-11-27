//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require("../../request/request")
Page({

      /**
       * 页面的初始数据
       */
      data: {
        swiperList: [],
        NavList:[],
        floorList:[]
      },

      //获取轮播图数据
      getSwiperData() {
        request({
          url:'/home/swiperdata'
        }).then(res=>{
          if(res.statusCode === 200){
            let {message} = res.data;
            this.setData({
              swiperList:message
            })
          }
        })
      },

      //获取导航的数据
      getNavData(){
        request({
          url:'/home/catitems'
        }).then(res=>{
          if(res.statusCode === 200){
            let {message} = res.data;
            this.setData({
              NavList:message
            })
          }
        })
      },

      //获取楼层数据
      getFloorData(){
        request({
          url:'/home/floordata'
        }).then(res=>{
          if(res.statusCode === 200){
            let {message} = res.data;
            this.setData({
              floorList:message
            })
          }
        })
      },
          /**
           * 生命周期函数--监听页面加载
           */
          onLoad: function (options) {
            this.getSwiperData();
            this.getNavData();
            this.getFloorData()
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