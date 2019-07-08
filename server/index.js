require('dotenv/config')
const express = require('express');
const session = require('express-session');
const massive = require('massive');

// Controllers
const authCtrl = require('./controllers/Auth');
const videoCtrl = require('./controllers/Video');
const contactCtrl = require('./controllers/Contact');
const stripeCtrl = require('./controllers/Stripe');


const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*365*50
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database connected.')
    app.listen(SERVER_PORT, () => console.log('Port is working on', SERVER_PORT))
})


// Videos
app.get('/video/:video_id', videoCtrl.getOneFilm)
app.get('/videos', videoCtrl.getAllFilms)
app.post('/video', videoCtrl.createVideo)
app.delete('/delete/video/:video_id', videoCtrl.deleteVideo)

// Questions
app.post('/ask/question', contactCtrl.askQuestion)
app.get('/get/questions', contactCtrl.getQuestions)
app.delete('/delete/question/:question_id', contactCtrl.deleteQuestion)

// Booking  
app.get('/get/bookings', contactCtrl.getBooking)
app.post('/create/booking', contactCtrl.postBooking)
app.delete('/delete/booking/:booking_id', contactCtrl.deleteBooking)
app.put('/update/booking/:booking_id', contactCtrl.updateBooking)

// Authentication
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentAdmin', authCtrl.currentAdmin)

// Stripe
app.post('/checkout', stripeCtrl.payment)



