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

mongoose.connect('mongodb://localhost/urls', {
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
  const existUrl = []

  const generateUrl = () => {
    let url = ''
    url += bcrypt.hashSync(`${req.body.name}`, 10).slice(-5)

    return check(url)
  }

  // 防止重複
  const check = url => {
    if (existUrl.includes(url, '/', '.')) {
      return generateUrl()
    } else {
      existUrl.push(url)
      return url
    }
  }

  const newUrl = new Url({
    name: req.body.name,
    key: generateUrl()
  })

  newUrl
    .save()
    .then(user => {
      console.log('localhost:3000/urls/' + newUrl.key)
      res.redirect(`/urls/${newUrl.key}`)
    })
    .catch(err => console.log(err))
})

app.get('/urls/:key', (req, res) => {
  Url.findOne({ key: req.params.key }, (err, url) => {
    if (err) return console.error(err)
    newUrl = 'localhost:3000/urls/' + url.key

    return res.render('new', { url, newUrl })
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running: localhost:3000')
})