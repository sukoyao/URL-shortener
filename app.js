const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Url = require('./models/url')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/url', {
  useNewUrlParser: true,
  useCreateIndex: true
})   // 設定連線到 mongoDB

const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.send('寫入 urls')
})

app.get('/urls', (req, res) => {
  res.render('new')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running!')
})