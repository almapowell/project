require('dotenv/config')
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const app = express()

const authCtrl = require('./controllers/Auth')
const videoCtrl = require('./controllers/Video')
const contactCtrl = require('./controllers/Contact')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database connected.')
    app.listen(SERVER_PORT, () => console.log('Port is working on', SERVER_PORT))
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*365*50
    }
}))


app.get('/video/:id', videoCtrl.getOneFilm)
app.get('/videos', videoCtrl.getAllFilms)

app.get('/questions', contactCtrl.getQuestions)
app.get('/booking', contactCtrl.getBooking)
app.post('/create/booking', contactCtrl.postBooking)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentAdmin', authCtrl.currentAdmin)




