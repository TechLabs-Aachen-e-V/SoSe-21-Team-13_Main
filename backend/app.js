require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')

const User = require('./models/user')
const { signupValidation, loginValidation } = require('./validation')
const app = express()
const port = 5000

const sessionConfig = {
  secret: 'changeInProduction',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(express.json());
app.use(session(sessionConfig));

// Auth with passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection open');
  })
  .catch(err => {
    console.log("Error: ", err);
  })

// import models from ./models
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
    if (error) return res.status(400).send(error.details[0].message)

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username
    })
    const newUser = await User.register(user, req.body.password)
    console.log(newUser);
  } catch (error) {
    res.status(400).send(error.message)
  }
})


app.post('/login', async (req, res) => {
  try {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is invalid')

    //Verify password
    const isValidPassword = await bcrypt.compare(req.body.password, user.hashedPassword);

    if (!isValidPassword) return res.send('Email or password is invalid')

    res.send('Logged in')

  } catch (error) {
    res.status(400).send(error.message)
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})