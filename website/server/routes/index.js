'use strict'

const ControllerUser = require('../controllers/contrillerUser')
const ControllerAdmin = require('../controllers/controllerAdmin')
const { authenticationAdmin } = require('../middlewares/authentication')
const router = require('express').Router()

module.exports = router

router.get('/', (req, res) => {
  res.json({message: "Annyeong!"})
})

router.post('/login', ControllerAdmin.login)
router.get('/cust/jobs', ControllerUser.showAllJob)
router.get('/cust/companies', ControllerUser.showAllCompany)
router.get('/cust/jobs/:id', ControllerUser.jobDetail)
router.get('/cust/companies/:id', ControllerUser.companyDetail)

router.use (authenticationAdmin)

router.post('/register', ControllerAdmin.register)
router.get('/jobs', ControllerAdmin.showAllJob)
router.post('/jobs', ControllerAdmin.addJob)
router.get('/companies', ControllerAdmin.showAllCompany)
router.post('/companies', ControllerAdmin.addCompany)
router.delete('/jobs/:id', ControllerAdmin.deleteJob)
router.put('/jobs/:id', ControllerAdmin.updateJob)
router.get('/jobs/:id', ControllerAdmin.jobDetail)
router.delete('/companies/:id', ControllerAdmin.deleteCompany)
router.put('/companies/:id', ControllerAdmin.updateCompany)
router.get('/companies/:id', ControllerAdmin.companyDetail)
