// client/pages/comment_edit/comment_edit.js
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
    commentValue: "",
    preview: 0,
    record: 0

  },
  onUserInfo: function () {
    console.log(this.data.userInfo)

  },


  onLoad: function (options) {

    this.getMovie(options.dest)
    this.setData({
      movieId: options.dest,
      commentType: options.type
    })
    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      this.setData({
        src: res.tempFilePath 
      })
    })
  },

  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },

  startRecordMp3: function () {
    recorderManager.start({
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    });
    this.setData({
      record: 1
    })
  },

  stopRecord: function () {
    recorderManager.stop()
    this.setData({
      record: 0
    })
  },

  playRecord: function () {
    console.log(this.data.src)
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    innerAudioContext.src = src;
    innerAudioContext.play();
    this.setData({
      record: 1
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  onTapPreview() {
    this.setData({
      preview: 1
    })
  },
  onBackEdit() {
    this.setData({
      preview: 0,
      record: 0,
      commentValue:this.data.commentValue
    })

  },
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

  onTapSubmit(event) {
    wx.showLoading({
      title: '预览数据准备中...',
    })
    let dest = event.currentTarget.dataset.dest
    console.log(dest)
    if (this.data.commentType==1) {
      console.log("000")
      console.log(this.data.src)

      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: this.data.src,
        name: 'file',
        success: res => {

          console.log(res)
          console.log("success")
          let data = JSON.parse(res.data).data.imgUrl
          console.log(data)
          this.setData({
            commentValue:data
          })
          console.log("commentValue",this.data.commentValue)
          this.postDb(dest)

        },
        fail: res => {
          console.log("fail")

          console.log(res)
        }
      })
    }else{
      this.postDb(dest)
    }
  },
  postDb(dest){
    qcloud.request({
      url: config.service.addComment,
      method: 'POST',
      login: true,
      data: {
        movieId: this.data.movieId,
        commentValue: this.data.commentValue,
        type: this.data.commentType,
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
        console.log(dest)
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
  onInputValue(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  }
})