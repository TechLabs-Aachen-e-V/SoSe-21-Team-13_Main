const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs');
const path = require('path');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

mongoose.connect('mongodb://helpify:techlabs@cluster0-shard-00-00.g9aoz.mongodb.net:27017,cluster0-shard-00-01.g9aoz.mongodb.net:27017,cluster0-shard-00-02.g9aoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-111l0b-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connection open');
  })
  .catch(err => {
    console.log("Error: ", err);
  })

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
const User = mongoose.model('User', userSchema)

// User.insertMany([
//   {first: "Jon", last: "K", password: "12345"},
//   {first: "Konstantin", last:"Wehmeyer", password: "54321"}
// ])

const errandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  compensation: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
const Errand = mongoose.model('Errand', errandSchema)

// Errand.insertMany([
//   {title: 'Laundry', description: 'Please do my laundry', compensation: 5},
//   {title: 'Dog Walk', description: 'Please walk my dog', compensation: 4},
//   {title: 'Pick up package', description: 'Please pick up my package', compensation: 10},
//   {title: 'Grocery shopping', description: 'Please do grocery shopping for me. List...', compensation: 5},
// ])


app.get('/', async (req, res) => { 
  const errands = await Errand.find()
  console.log(errands)

  res.render('errands', {errands: errands})
})
 
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.send('Signup page')
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
