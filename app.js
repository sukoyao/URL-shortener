const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Url = require('./models/url')

if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urls', {
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

app.post('/shorten', (req, res) => {
  Url.findOne({ name: req.body.name }, (err, result) => {
    if (result) {
      console.log('此網址已存在!請重新輸入新網址', req.body.name, result)
      return res.render('index')

    } else {
      const newUrl = new Url({
        name: req.body.name,
        key: generateUrl()
      })

      newUrl
        .save()
        .then(user => {
          console.log('https://shrouded-cliffs-24731.herokuapp.com/' + newUrl.key)
          res.redirect(`/urls/${newUrl.key}`)
        })
        .catch(err => console.log(err))
    }
  })
})

const generateUrl = () => {
  const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let url = ''
  for (let i = 0; i < 5; i++) {
    const randomChar = Math.floor(Math.random() * char.length)
    url += char[randomChar]
  }

  return url
}

app.get('/urls/:key', (req, res) => {
  Url.findOne({ key: req.params.key }, (err, url) => {
    if (err) return console.error(err)
    newUrl = 'https://shrouded-cliffs-24731.herokuapp.com/' + url.key

    return res.render('new', { url, newUrl })
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})
