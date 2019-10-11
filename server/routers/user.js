const Router = require('@koa/router')
const Mock = require('mockjs')

const router = new Router()

let users = Mock.mock({
  'data|5-20': [
    {
      'id|+1': 10,
      name: '@name'
    }
  ]
})

router.all('/', (ctx, next) => {
  ctx.body = users
  next()
})

module.exports = router
