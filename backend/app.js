require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
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


app.get('/login', (req, res) => {
  res.send('login')
})

app.get('/signup', (req, res) => {
  res.send('Signup page')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})