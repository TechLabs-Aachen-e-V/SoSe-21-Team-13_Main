require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/user')
const app = express()
const port = 5000

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection open');
  })
  .catch(err => {
    console.log("Error: ", err);
  })

// import models from ./models
// const User = require('./models/user');
const Errand = require('./models/errand');


app.get('/errands', async (req, res) => {
  const errands = await Errand.find()
  res.json(errands)
})

app.post('/errands', async (req, res) => {

  try {
    const newErrand = new Errand(req.body)

    //insert error handling here !!
    const errand = await newErrand.save()
    res.json(errand)

  } catch (error) {
    res.send('Failed to create new errand')
  }
})

app.get('/signup', (req, res) => {
  res.send('Signup page')
})

app.post('/signup', async (req, res) => {
  
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: req.body.password
    })

    const savedUser = await user.save()
    res.send(savedUser)

  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/login', (req, res) => {
  res.send('login')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})