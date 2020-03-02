const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// middleware
app.use(cors())
app.use(bodyParser.json())

const userRouter = require('./routes/User.routes')

app.use('/auth', userRouter)

// connect to mongo
mongoose.connect(process.env.MONGO_URI, err => {
  if (err) {
    throw new Error(err)
  }
  //create a server object:
  app.listen(process.env.PORT || 8080, err => {
    if (err) {
      console.error("ERROR... server didn't run")
      throw new Error(err)
    }
    console.log(`Server running...`)
  })
})
