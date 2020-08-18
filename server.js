require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser")
 
const cpRouter = require('./routes/cp')
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '15mb', extended: false }))
  
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/" + process.env.DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/cp', cpRouter)
app.use('/', indexRouter)

app.listen(process.env.PORT)