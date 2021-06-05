const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs');
const path = require('path');
const app = express()
const port = 5000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/helpify', { useNewUrlParser: true, useUnifiedTopology: true })
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
  location: {
    type: String
  },
  compensation: {
    type: Number,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  dateDue: {
    type: String,
    required: true
  },
  timeDue: {
    type: String,
  },
  category: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  errandStatus: {
    type: Boolean,
  }
})
const Errand = mongoose.model('Errand', errandSchema)

// Errand.insertMany([
//   {
//     title: 'Grocery shopping', description: 'Please do grocery shopping for me. List...', compensation: 5,
//     location: 'Aachen', dateDue: '06.10.21', timeDue: '4pm', category: 'grocery', imageUrl: '', errandStatus: true
//   },
// ])


app.get('/errands', async (req, res) => {
  const errands = await Errand.find()
  console.log(errands)
  res.json(errands)
})

app.post('/errands', async (req, res) => {

  try {
    const newErrand = new Errand({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      compensation: req.body.compensation,
      dateDue: req.body.dateDue,
      timeDue: req.body.timeDue,
      category: req.body.category,
      imageUrl: req.body.image
    })
  
    //insert error handling here !!
    const errand = await newErrand.save()
    res.json(errand)

  } catch (error) {
    res.send('Failed to create new errand')
  }
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