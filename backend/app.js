require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/user')
const { signupValidation, loginValidation } = require('./validation')
const bcrypt = require('bcrypt')
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
    const { error } = signupValidation(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    //Check if user exists
    const emailExists = await User.findOne({ email: req.body.email })
    if(emailExists) return res.status(400).send('Email already exists')

    //Hash password
    hashedPassword = await bcrypt.hash(req.body.password, 10)

    //Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hashedPassword: hashedPassword
    })

    //Save the user
    const savedUser = await user.save()
    res.send({ user: user._id })

  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/login', (req, res) => {
  res.send('login')
})

app.post('/login', async (req, res) => {
  try {
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Email or password is invalid')

    //Verify password
    const isValidPassword = await bcrypt.compare(req.body.password, user.hashedPassword);

    if(!isValidPassword) return res.send('Email or password is invalid')

    res.send('Logged in')

  } catch (error) {
    res.status(400).send(error.message)
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})