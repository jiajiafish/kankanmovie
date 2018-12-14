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
  getComList() {
    wx.showLoading({
      title: '个人数据加载中。。。',
    })
    qcloud.request({
      url: config.service.mycom,
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
      url:  config.service.myfav,
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getComList()
    this.getFavList()
    wx.stopPullDownRefresh()
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