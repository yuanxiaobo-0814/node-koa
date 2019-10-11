// const Mock = require('mockjs')

let data = require('../models/user')

class User {
  constructor(ctx) {
    this.data = data
  }
  getUser(id) {
    let arg = arguments[0]
    let result

    if (typeof arg === 'number') {
      result = this.data.filter(item => item.id === arg)[0]
    } else if (typeof arg === 'string') {
      result = this.data.filter(item => item.name === arg)[0]
    }
    return result
  }
  getUserList(page, count) {
    let totalPage =
      this.data.length % count === 0
        ? this.data.length / count
        : this.data.length / count + 1
    let result = {
      page,
      count,
      totalPage: parseInt(totalPage),
      list: this.data.slice((page - 1) * count, page * count)
    }
    return result
  }
  addUser(name, phone) {
    let result
    if (!name) {
      return {
        message: '请输入用户名'
      }
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      return {
        message: '请输入正确的手机号码'
      }
    }
    let lastUser = this.data[this.data.length - 1]
    let user = {
      name,
      phone,
      id: lastUser.id + 1
    }
    this.data.push(user)

    return {
      message: '用户添加成功'
    }
  }
  updateUser(id, user) {
    if (!id && id !== 0) {
      return {
        message: '请传入用户ID'
      }
    }
    if (user.phone && !/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      return {
        message: '请输入正确的手机号码'
      }
    }
    for (let i = 0, len = this.data.length; i < len; i++) {
      let target = this.data[i]
      if (target.id === id) {
        target.name = user.name || target.name
        target.phone = user.phone || target.phone
        return {
          message: '用户信息更新成功'
        }
      }
    }
  }
  deleteUser(id) {
    if (!id && id !== 0) {
      return {
        message: '请传入用户ID'
      }
    }

    for (let i = 0, len = this.data.length; i < len; i++) {
      let target = this.data[i]
      if (target.id === id) {
        let result = this.data.splice(i, 1)
        return result[0]
      }
    }
  }
}

module.exports = User
