// client/pages/hot/hot.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList()
  },

  getMovieList(){
    wx.showLoading({
      title: '电影数据加载中。。。',
    })
    qcloud.request({
      url: 'https://bsfs9n5c.qcloud.la/weapp/movies',
      success: response => {
        wx.hideLoading()
        console.log(response.data.data)
        if(!response.data.code){
          this.setData({
            movieList: response.data.data
          })
        }else{
          wx.showToast({
            title: '电影数据加载失败',
          })
        }

      },
      fail: function (err) {
        wx.hideLoading()
        wx.showToast({
          title: '电影数据加载失败',
        })
      }
    });
  },
  onTapMovie: function (event) {
    console.log(event.currentTarget.dataset.dest)
    let dest = event.currentTarget.dataset.dest
    wx.navigateTo({
      url: '/pages/detail/detail?dest=' + dest,
    })
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