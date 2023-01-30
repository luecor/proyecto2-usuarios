const express = require('express')
const app = express()

app.use(express.json())
let baseID = 3
let userBD = [
  {
    "id": 1,
    "firstName": "Sahid",
    "lastName": "Kick",
    "email": "sahid.kick@academlo.com",
    "password": "root",
    "age": 22
  },
  {
    "id": 2,
    "firstName": "Luis",
    "lastName": "Valladolid",
    "email": "eluis@academlo.com",
    "password": "root",
    "age": 25
  }
]

app.get('/users', (req, res) => {
  res.status(200).json(userBD)
})

app.post('/users', (req, res) => {
  const data = req.body
  const newUser = {
    id: baseID++,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    age: data.age
  }
  userBD.push(newUser)
  res.status(201).json(newUser)
})

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = userBD.find((user) => id === user.id)
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({
      message: 'Invalid ID'
    })
  }
})

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = userBD.find((user) => id === user.id)
  if (data) {
    userBD = userBD.filter(user => user.id != id)
    res.status(200).json({
      message: 'Delete successful'
    })
  } else {
    res.status(404).json({
      message: 'Invalid ID'
    })
  }
})

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const validId = userBD.find((user) => id === user.id)
  const data = req.body
  if (validId) {
    const newUser = {
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      age: data.age
    }
    userBD[userBD.findIndex(user => user.id === id)] = newUser
    res.status(200).json({
      message: 'successful edit'
    })
  } else {
    res.status(404).json({
      message: 'Invalid ID'
    })
  }
})

app.listen(9000, () => {
  console.log('Server started at http://localhost:9000/')
})

module.exports = app
