const jwt = require('jsonwebtoken')

function authToken(req, res, next) {
  // get bearer token
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).json({
      message: 'Invalid authentication token',
      error: '403 unauthorized - Invalid authentication token',
    })
  }

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid authentication token',
        error: '403 unauthorized - Invalid authentication token',
      })
    }
    req.user = user
    next()
  })
}

module.exports = authToken
