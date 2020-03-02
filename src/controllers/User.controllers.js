const { getHash, compare } = require('../utils/hash')
const UserModel = require('../models/User.model')

const jwt = require('jsonwebtoken')

const addUser = async user => {
  const { name, email, password } = user
  const hashPassword = await getHash(password)

  // validate is email is taken
  const resultEmail = await UserModel.find({ email })
  if (resultEmail.length) {
    return {
      code: 409,
      json: {
        message: 'Email already taken',
        error: '409 conflict - Email already taken',
      },
    }
  }

  const newUser = new UserModel({
    name,
    email,
    password: hashPassword,
    dateCreated: new Date(),
  })
  const savedUser = await newUser.save()
  let noPassUser = {
    _id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    dateCreated: savedUser.dateCreated,
  }

  console.log('user created')
  return {
    code: 200,
    json: {
      message: 'User created',
      data: noPassUser,
    },
  }
}

const login = async user => {
  // finde user by that email
  const userData = await UserModel.find({ email: user.email })
  if (!userData.length) {
    return {
      code: 404,
      json: {
        message: 'User with that email not found',
        error: '404 not found - User with that email not found',
      },
    }
  }

  // console.log(userData, user)
  const passwordMatch = await compare(user.password, userData[0].password)
  if (!passwordMatch) {
    return {
      code: 401,
      json: {
        message: 'Wrong password',
        error: '403 unauthorized - Wrong password',
      },
    }
  }

  const noPassUser = {
    _id: userData[0]._id,
    name: userData[0].name,
    email: userData[0].email,
    dateCreated: userData[0].dateCreated,
  }

  // get token
  const accessToken = jwt.sign(noPassUser, process.env.ACCESS_TOKEN_SECRET)
  const refreshToken = jwt.sign(noPassUser, process.env.REFRESH_TOKEN_SECRET)

  return {
    code: 200,
    json: {
      message: 'User logged in',
      data: {
        user: noPassUser,
        accessToken,
        refreshToken,
      },
    },
  }
}

module.exports = {
  addUser,
  login,
}
