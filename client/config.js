/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://bsfs9n5c.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,
    // 拉取用户信息
    user: `${host}/weapp/user`,
    // 获取到所有热门电影的信息
    gethotlist: `${host}/weapp/movies`,

    // 获取到指定ID的热门电影的信息
    getTheHotMovie: `${host}/weapp/movies/`,

    // 获取movieId电影的评论
    getCommentList: `${host}/weapp/comments/`,
    // 获取特定评论Id的评论
    getTheComment: `${host}/weapp/comment/`,

    addComment: `${host}/weapp/addcomment`,

    rand: `${host}/weapp/rand`,
    addFav: `${host}/weapp/addcfav`,
    mycom: `${host}/weapp/mycom`,
    myfav: `${host}/weapp/myfav`,
    mymoviecom:`${host}/weapp/mymoviecom`,






  }
};

module.exports = config;