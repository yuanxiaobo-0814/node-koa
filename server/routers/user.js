const Router = require('@koa/router')
const  UserController = require('../controllers/user')

const router = new Router()
const user = new User()

router.get('/', UserController.getUserList)

router.get('/:id', UserController.getUser)

router.post('/',UserController.addUser)
router.delete('/:id', UserController.deleteUser)
router.patch('/:id', UserController.updateUser)
module.exports = router
