// client/pages/detail/detail.js
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

    this.getMovie(options.dest)
    this.setData({
      movieId: options.dest
    })
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


// 按照老师要求改的
  onTapAction: function (event) {
    let dest = event.currentTarget.dataset.dest

    qcloud.request({
      url: config.service.mymoviecom,
      method: 'POST',
      login: true,
      data: {
        movieId: dest,

      },
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data)
        console.log(data.data.length)
        if (data.data.length>0) {
          wx.navigateTo({
            url: '/pages/comment_detail/comment_detail?dest=' + data.data[0].id,
          })
        }else{
          wx.showActionSheet({
            itemList: ['文字', '音频'],
            success(res) {
              console.log(res.tapIndex)
              wx.navigateTo({
                url: '/pages/comment_edit/comment_edit?dest=' + dest + "&type=" + res.tapIndex,
              })
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
        }

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
  

})