const Router = require('@koa/router')
const Mock = require('mockjs')

const router = new Router()

let data = Mock.mock({
  'array|1-10': [
    {
      'name|+1': ['Hello', 'Mock.js', '!']
    }
  ]
})

router.all('/user', (ctx, next) => {
  ctx.body = data
  next()
})

module.exports = router
