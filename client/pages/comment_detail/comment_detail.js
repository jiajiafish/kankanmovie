const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
  },

  onLoad: function (options) {

    this.getComments(options.dest)
    this.setData({
      movieId: options.dest
    })

  },
  getComments(id) {
    wx.showLoading({
      title: '评论数据加载中...',
    })
    qcloud.request({
      url: config.service.getTheComment + id,
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data);
        if (!data.code) {
          this.setData({
            comment: data.data
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
// 按照老师要求改的

  OnTapAudio: function () {
    console.log(this.data.comment.content)
    innerAudioContext.src = this.data.comment.content;
    innerAudioContext.play();
  },
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
  onTapFav: function (event) {
    console.log(event.currentTarget.dataset.commentid)
    var commentId = event.currentTarget.dataset.commentid
    console.log("*************************")

    console.log(commentId)
    console.log("*************************")
    // 这个需要发个post到后台
    qcloud.request({
      url: config.service.addFav,
      method: 'POST',
      login: true,
      data: {
        id: commentId
      },
      success: result => {
        wx.hideLoading()
        console.log(result)
        let data = result.data

        wx.showToast({
          icon: 'none',
          title: '收藏影评成功'
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
})