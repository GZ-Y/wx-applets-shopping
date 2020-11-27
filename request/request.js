module.exports = {
  request:(params)=>{
    wx.showLoading({
      title: '加载中',
    });
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject)=>{
      wx.request({
        ...params,
        url:baseURL+params.url,
        success:res=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err);
        },
        complete:()=>{
          setTimeout(function () {
            wx.hideLoading()
          }, 700)
        }
      })
    })
  }
}