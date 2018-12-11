// client/pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getComList()
    this.getFavList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getComList() {
    wx.showLoading({
      title: '个人数据加载中。。。',
    })
    qcloud.request({
      url: 'https://bsfs9n5c.qcloud.la/weapp/mycom',
      login: true,
      success: response => {
        wx.hideLoading()
        console.log(response.data.data)
        if (!response.data.code) {
          this.setData({
            myCom: response.data.data
          })
        } else {
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

  getFavList() {
    wx.showLoading({
      title: '个人数据加载中。。。',
    })
    qcloud.request({
      url: 'https://bsfs9n5c.qcloud.la/weapp/myfav',
      login: true,
      success: response => {
        wx.hideLoading()
        console.log(response.data.data)
        if (!response.data.code) {
          this.setData({
            myFav: response.data.data
          })
        } else {
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
})