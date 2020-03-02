const express = require('express')
const router = express.Router()
const { addUser, login } = require('../controllers/User.controllers')
const jwt = require('jsonwebtoken')

let refreshTokens = []

router.post('/register', async (req, res) => {
  try {
    const resolve = await addUser(req.body)
    res.status(resolve.code).json(resolve.json)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: '5xx server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const resolve = await login(req.body)
    res.status(resolve.code).json(resolve.json)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: '5xx server error' })
  }
})

router.post('/refresh', (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) {
    res.status(401).json({
      message: 'Invalid Token',
      error: '403 unauthorized - Invalid Token',
    })
  }
  if (!refreshToken.includes(refreshToken)) {
    res.status(403).json({
      message: 'Invalid Token',
      error: '403 forbidden - Invalid Token',
    })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({
        message: 'Invalid Token',
        error: '403 forbidden - Invalid Token',
      })
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({
      message: 'Token refreshed',
      data: {
        accessToken,
      },
    })
  })
})

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.status(200).json({ message: 'User logged out' })
})

module.exports = router
