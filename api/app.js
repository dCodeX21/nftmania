const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = require('./configs/db')
const apiRoutes = require('./configs/routes')

const app = express()

//--------------------------------------------------------------------------
// Handle CORS + Middleware
//--------------------------------------------------------------------------
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE') // If using .fetch and not axios
  res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept')
  next()
})
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// MongoDB
//--------------------------------------------------------------------------
mongoose
  .connect(db.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => {
    console.log({ database_error: err })
  })
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//CORS Policy
//--------------------------------------------------------------------------
// app.use(cors());
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// Body Parser
//--------------------------------------------------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
//Morgan Logging
// app.use(morgan("dev"));
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// API Routes
//--------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send({
    'Backend Server': 'Express NodeJS',
    'Frontend': 'VueJS',
    'Listening Port': 3000,
    'Database': 'MongoDB',
    'Server Status': 'Alive'
  })
})

app.get('/api', (req, res) => {
  res.redirect('/');
})

app.use('/api', apiRoutes)
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// Start Server
//--------------------------------------------------------------------------
app.listen(3000, () => {
  console.log('Server Started \n\rRunning at Port 3000')
})
//--------------------------------------------------------------------------