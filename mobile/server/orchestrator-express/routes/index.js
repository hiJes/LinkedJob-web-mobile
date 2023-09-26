const Controller = require("../controllers/controller")

const router = require("express").Router()

module.exports = router

router.get('/', (req, res) => {
  res.send('Annyeong bunny!')
})

router.get('/users', Controller.showAllUser)
router.get('/jobs', Controller.showAllJob)
router.get('/users/:id', Controller.showUserById)
router.get('/jobs/:id', Controller.showJobById)