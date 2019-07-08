const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')

const { mongoURI, cookieKey } = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./services/passport')

const PORT = process.env.PORT || 5000
const app = express()
mongoose.connect(mongoURI, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, (err) => err ? console.warn(err) : console.log(`Listening on port: ${PORT}`))