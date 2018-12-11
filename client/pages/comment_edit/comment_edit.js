// client/pages/comment_edit/comment_edit.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    commentValue : "",
    preview: 0,

  },
  onUserInfo:function(){
    console.log(this.data.userInfo)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getMovie(options.dest)
    this.setData({
      movieId: options.dest,
      commentType: options.type
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
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        console.log(userInfo)
        this.setData({
          userInfo
        })
      }
    })
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

  },
  getMovie(id) {
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.getTheHotMovie + id,
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data);
        if (!data.code) {
          this.setData({
            movie: data.data
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: () => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })

  },
  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        console.log(userInfo)
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },
  onTapPreview(){
    this.setData({
      preview:1
    })
  },
  onBackEdit() {
    this.setData({
      preview: 0
    })
    
  },
  
  onTapSubmit(event) {
    wx.showLoading({
      title: '预览数据准备中...',
    })


    qcloud.request({
      url: config.service.addComment,
      method: 'POST',
      login: true,
      data: {
        movieId:this.data.movieId,
        commentValue: this.data.commentValue,
        type:this.data.commentType,
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (data.code) {
          wx.showToast({
            icon: 'none',
            title: '添加评论成功'
          })
        }
        let dest = event.currentTarget.dataset.dest
        wx.navigateTo({
          url: '/pages/comment_list/comment_list?dest=' + dest,
        })
      },
      fail: result => {
        wx.hideLoading()
        console.log(result)
        wx.showToast({
          icon: 'none',
          title: '添加评论失败'
        })
      }
    })
  },
  onInputValue(event){
    this.setData({
      commentValue: event.detail.value.trim()
    })
  }
})