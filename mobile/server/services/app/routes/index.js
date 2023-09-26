'use strict'

const Controller = require('../controllers/controller')

const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => {
  res.json({message: "Annyeong!"})
})

router.get('/jobs', Controller.showAllJob)
router.post('/jobs', Controller.addJob)
router.delete('/jobs/:id', Controller.deleteJob)
router.get('/jobs/:id', Controller.jobDetail)
router.put('/jobs/:id', Controller.updateJob)
