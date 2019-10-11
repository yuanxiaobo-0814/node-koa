const path = require('path')
const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const cors = require('koa2-cors')

const config = require('./config')
const routers = require('./server/routers')

const app = new Koa()

app.use(cors())

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use((ctx, next) => {
  let data = ctx.body
  ctx.body = {
    status: 200,
    data,
    message: 'ok'
  }
})

// 监听启动端口
app.listen(config.PORT)
console.log(`the server is start at port ${config.PORT}`)
