const DB = require('../utils/db')
module.exports = {
    list :async ctx =>{
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
      ctx.state.data = (await DB.query("SELECT * FROM movie_comment LEFT JOIN movies ON movie_comment.movie_id = movies.id WHERE movie_comment.id =?", [commentID]))[0]
    } else {
      ctx.state.data = {}
    }
}
}