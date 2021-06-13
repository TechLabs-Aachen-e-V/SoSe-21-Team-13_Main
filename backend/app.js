require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const flash = require('connect-flash')
const jwt = require('jsonwebtoken')
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
app.use(flash());

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

  } catch (error) {
    res.status(400).send(error.message)
  }
})


app.post('/login', passport.authenticate('local', {
  session: false
}), (req, res) => {
  // Token
  const token = jwt.sign({ id: req.user._id }, 'jwt_secret')
  res.json({ token: token })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})