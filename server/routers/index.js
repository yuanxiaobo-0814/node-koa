const Router = require('@koa/router')
const user = require('./user.js')

const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
