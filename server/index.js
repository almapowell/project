require('dotenv/config')
const express = require('express')
const session = require('express-session')
const massive = require('massive')


const app = express()
const authCtrl = require('./controllers/auth')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Your data base is connected.')
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 534532543
    }
}))




app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentUser', authCtrl.currentUser)
