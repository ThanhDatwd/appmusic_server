
const songsRouter = require('./songs')
const artistesRouter = require('./artistes')
const albumRouter = require('./albums')
const pageRouter = require('./page/index')
const authRouter = require('./auth')
const userRouter = require('./user')
function routes(app) {
    app.use('/api/songs',songsRouter)
    app.use('/api/artist',artistesRouter)
    app.use('/api/albums',albumRouter)
    app.use('/api/page/',pageRouter)
    app.use('/api/auth/',authRouter)
    app.use('/api/user/',userRouter)
}
module.exports=routes