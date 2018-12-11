const DB = require('../utils/db')
module.exports = {
    list :async ctx =>{
        ctx.state.data = await DB.query("SELECT * FROM movies;")
    },
  detail: async ctx => {
    // 尴这里是params
    movieID = +ctx.params.id
    if (!isNaN(movieID)) {
      ctx.state.data = (await DB.query("SELECT * FROM movies where movies.id = ?", [movieID]))[0]
    } else {
      ctx.state.data = {}
    }
}
}
