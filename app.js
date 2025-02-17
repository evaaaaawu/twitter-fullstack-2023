require('dotenv').config()

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const dbConfig = require('./config/config.js')
const flash = require('connect-flash')
const helpers = require('./_helpers')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || 'ThisIsMySecret'

app.engine(
  'hbs',
  exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers })
)
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = helpers.getUser(req)
  next()
})
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.use(routes)

app.listen(port, () =>
  console.log('NODE_ENV:', process.env.NODE_ENV),
console.log('DB config:', dbConfig[process.env.NODE_ENV]),
console.log(`App is running on http://localhost:${port}`)
)

module.exports = app
