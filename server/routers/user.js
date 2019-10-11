const Router = require('@koa/router')
const User = require('../controllers/user')

const router = new Router()
const user = new User()

router.get('/', (ctx, next) => {
  let { page, count } = ctx.query
  let result = user.getUserList(page, count)
  ctx.body = result
  next()
})

router.get('/:id', (ctx, next) => {
  let paths = ctx.path.split('/')
  let id = paths[paths.length - 1]
  let result = user.getUser(id)
  ctx.body = result
  next()
})

router.post('/', (ctx, next) => {
  let { name, phone } = ctx.request.body
  let result = user.addUser(name, user)
  ctx.body = result
  next()
})
router.delete('/:id', (ctx, next) => {
  let paths = ctx.path.split('/')
  let id = paths[paths.length - 1]
  let result = user.deleteUser(id)
  ctx.body = result
  next()
})
router.patch('/:id', (ctx, next) => {
  let paths = ctx.path.split('/')
  let id = paths[paths.length - 1]
  let user = ctx.request.body
  let result = user.updateUser(id, user)
  ctx.body = result
  next()
})
module.exports = router
