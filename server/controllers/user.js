const db = require('../../models')

class UserController {
  static getUser(ctx, next) {
    let paths = ctx.path.split('/')
    let id = paths[paths.length - 1]
    id = parseInt(id)
    db.User.findAll({
      where: {
        id
      }
    }).then(users => {
      ctx.body = users[0]
      next()
    })
  }
  static getUserList(ctx, next) {
    let { page, count } = ctx.query
    page = parseInt(page)
    count = parseInt(count)

    db.User.findAll().then(users => {
      let totalPage =
        users.length % count === 0
          ? users.length / count
          : users.length / count + 1
      let result = {
        page,
        count,
        totalPage: parseInt(totalPage),
        list: users.slice((page - 1) * count, page * count)
      }
      ctx.body = result
      next()
    })
  }
  static addUser(ctx, next) {
    let {firstName,lastName,email} = ctx.request.body
    if (!firstName) {
      ctx.body = {
        message: '请输入用户姓'
      }
      next()
      return
    }if (!lastName) {
        ctx.body = {
          message: '请输入用户名'
        }
        next()
        return
      } else if (!email) {
      ctx.body = {
        message: '请输入邮箱'
      }
      next()
      return
    } 
    db.User.create({firstName,lastName,email}).then(user => {
      ctx.body = user
      next()
    })
  }
  static updateUser(ctx, next) {
    let paths = ctx.path.split('/')
    let id = paths[paths.length - 1]
    id = parseInt(id)
    let user = ctx.request.body
    if (!id && id !== 0) {
      ctx.body = {
        message: '请传入用户ID'
      }
      next()
      return
    }
    db.User.update(user, {
      where: {
        id
      }
    }).then(() => {
      ctx.body = {
        message: '用户信息更新成功'
      }
      next()
    })
  }
   static deleteUser(ctx, next) {
      let paths = ctx.path.split('/')
      let id = paths[paths.length - 1]
      id = parseInt(id)
      if (!id && id !== 0) {
        ctx.body = {
          message: '请传入用户ID'
        }
        next()
        return
      }
  
      db.User.destroy({
        where: {
          id
        }
      }).then(() => {
        ctx.body = {
          message: '用户信息删除成功'
        }
        next()
      })
    }
  }
  
  module.exports = UserController