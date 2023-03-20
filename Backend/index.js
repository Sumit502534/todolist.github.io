require('dotenv').config()
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport.setup')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

app.use(cookieSession({
  maxAge : 24 * 60 * 60 * 1000,
  keys : ['sandip@low']
}))

app.use(passport.initialize())
app.use(passport.session())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Todo List backend listening on port ${port}`)
})
