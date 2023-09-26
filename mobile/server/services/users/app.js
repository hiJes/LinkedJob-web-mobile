'use strict'
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4001 //run di 80
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const { run } = require('./config/mongo')


app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

run().then(()=> {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

})