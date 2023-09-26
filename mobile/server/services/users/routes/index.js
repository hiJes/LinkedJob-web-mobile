const Controller = require('../controllers/controller')

const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => {
  res.send('Annyeong!')
})

router.post('/users', Controller.register)
router.get('/users', Controller.showAllUser)
router.get('/users/:id', Controller.showUserById)
router.delete('/users/:id', Controller.deleteUser)