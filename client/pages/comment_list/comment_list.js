// client/pages/comment_list/comment_list.js
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
    this.getComments(options.dest)
    this.setData({
      commentId: options.dest
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getComments(this.data.commentId)
    wx.stopPullDownRefresh()
  },


  getComments(id) {
    wx.showLoading({
      title: '评论数据加载中...',
    })
    qcloud.request({
      url: config.service.getCommentList + id,
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data);
        if (!data.code) {
          this.setData({
            comments: data.data
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
        // console.log(this.data.comments)
      },
      
      fail: () => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })

  },
  onTapComment: function (event) {
    console.log(event.currentTarget.dataset.dest)
    let dest = event.currentTarget.dataset.dest
    wx.navigateTo({
      url: '/pages/comment_detail/comment_detail?dest=' + dest,
    })
  },
})
