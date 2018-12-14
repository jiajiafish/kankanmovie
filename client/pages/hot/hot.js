// client/pages/hot/hot.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
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
      url: config.service.gethotlist,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMovieList()
    wx.stopPullDownRefresh()
  },

})