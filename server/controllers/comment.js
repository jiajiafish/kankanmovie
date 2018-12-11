const DB = require('../utils/db')
module.exports = {
  list: async ctx => {
    //获取某个电影所有的评论
    movieID = +ctx.params.movieId
    if (!isNaN(movieID)) {
      ctx.state.data = await DB.query("SELECT * FROM movie_comment WHERE movie_comment.movie_id =?", [movieID])
    } else {
      ctx.state.data = {}
    }
  },
  detail: async ctx => {
    // 获取某个电影的评论的详情
    commentID = +ctx.params.commentId
    if (!isNaN(commentID)) {
      ctx.state.data = (await DB.query("SELECT co.id,co.movie_id,co.content,co.avatar,mo.title,mo.image,co.username,co.comment_type,co.user,mo.description  FROM movie_comment AS co  LEFT JOIN movies as mo ON co.movie_id = mo.id WHERE co.id =?", [commentID]))[0]
    } else {
      ctx.state.data = {}
    }
  },
  rand: async ctx => {

    ctx.state.data = (await DB.query("Select * From movie_comment left JOIN movies ON movie_comment.movie_id = movies.id order By Rand() Limit 1"))[0]
  },
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let avatarUrl = ctx.state.$wxInfo.userinfo.avatarUrl
    let nickName = ctx.state.$wxInfo.userinfo.nickName
    let comment = ctx.request.body
    // content 可以是字符也有可能是存储播放音频 type0代表字符，type1代表音频的地址
    await DB.query('INSERT INTO movie_comment( movie_id, comment_type, user, username, avatar, content) VALUES (?, ?, ?, ?, ?, ?)', [comment.movieId, comment.type, user, nickName, avatarUrl, comment.commentValue])
  },
  mycom: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    // content 可以是字符也有可能是存储播放音频 type0代表字符，type1代表音频的地址
    ctx.state.data = await DB.query('SELECT co.id, co.avatar, co.username, co.content, mo.title, mo.image FROM `movie_comment` AS co LEFT JOIN `movies` as mo ON co.movie_id = mo.id WHERE co.user = ?', [user])
  },
  myfav: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    // content 可以是字符也有可能是存储播放音频 type0代表字符，type1代表音频的地址
    ctx.state.data = await DB.query('SELECT co.id, co.avatar, co.username, co.content, mo.title, mo.image FROM`movie_comment` as co left join`movies` as mo on co.movie_id = mo.id left join`comment_fave` as fa on fa.comment_id = co.id where fa.open_id = ?', [user])
  },
  fav: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let comment = ctx.request.body
    let list = await DB.query('SELECT * FROM comment_fave WHERE comment_fave.comment_id = ? AND comment_fave.open_id = ?', [comment.id, user])
    if (!list.length) {
      await DB.query('INSERT INTO comment_fave( comment_id, open_id) VALUES (?, ?)', [comment.id, user])
    }
  }
}

