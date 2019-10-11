const Router = require('@koa/router')
const demo = require('./demo.js')

const router = new Router()

router.use('/v1', demo.routes(), demo.allowedMethods())

module.exports = router
