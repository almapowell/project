const { TWILIO_ACCOUNT_SECRET_ID, TWILIO_AUTH_TOKEN, PERSONAL_PHONE_NUMBER, TWILIO_PHONE_NUMBER } = process.env

module.exports = {
    getQuestions: async (req, res) => {
        try {
            let db = req.app.get('db')
            let questions = await db.get_questions()
            console.log('Questions')
            res.send(questions)
        } catch (error) {
            console.log('Error fetching the questions', error)
            res.status(500).send(error)
        }
    },

    getBooking: async (req, res) => {
        try {
            let db = req.app.get('db')
            let booking = await db.get_booking()
            console.log('Booked')
            res.send(booking)
        } catch (error) {
            console.log('Error fetching the bookings', error)
            res.status(500).send(error)
        }
    },

    postBooking: async (req, res) => {
        try {
            const accountSid = TWILIO_ACCOUNT_SECRET_ID;
            const authToken = TWILIO_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);

            let db = req.app.get('db')
            let { bride_groom_name, booking_id, booking_date, location, budget, notes, how, name, email, phone } = req.body

            client.messages
                .create({
                    body: 
                    `A date has been booked:
Name: ${name}
Email: ${email}
Phone: ${phone}
Bride&Groom Names: ${bride_groom_name} 
Date: ${booking_date} 
Location: ${location} 
Budget: ${budget} 
Notes: ${notes} 
Reference: ${how}`,
                    from: TWILIO_PHONE_NUMBER,
                    to: PERSONAL_PHONE_NUMBER
                })
            // let date = new Date(booking_date.toDateString())

            // let date = newDate.getDate().toString()
            // let month = (newDate.getMonth()+1).toString()
            // let year = newDate.getFullYear().toString()

            // let postDate =  `${date} ${month} ${year}`
            // let booking_date = postDate

            // let time = newDate.getHours().toString()
            // let min = newDate.getMinutes().toString()

            // let postTime = `${time} : ${min}`


            let newBooking = { bride_groom_name, booking_date, booking_id, location, budget, notes, how, name, email, phone }
            let postedBookings = await db.post_booking(newBooking)
            console.log(postedBookings)
            res.status(200).send(postedBookings)
        } catch (error) {
            console.log('Error posting the bookings', error)
            res.status(500).send(error)
        }
    },

    askQuestion: async (req, res) => {
        try {
            console.log('hit the back end for questions')
            const accountSid = TWILIO_ACCOUNT_SECRET_ID;
            const authToken = TWILIO_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);
            console.log(1111111332322323232332, client)

            let db = req.app.get('db')
            let { name, email, phone, message } = req.body
            let question = await db.ask_question({ name, email, phone, message })

            client.messages
                .create({
                    body: 
                    `You have been asked a question:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`,
                    from: TWILIO_PHONE_NUMBER,
                    to: PERSONAL_PHONE_NUMBER
                })
            res.status(200).send(question)
            // res.status(200).send([...question, message.sid])
        } catch (error) {
            console.log('Error asking the question', error)
            res.status(500).send(error)
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            let db = req.app.get('db')
            let { question_id } = req.params
            const questions = await db.delete_question({ question_id })
            res.status(200).send(questions)
        } catch (error) {
            console.log('Error deleting the question', error)
            res.status(500).send(error)
        }
    },

    deleteBooking: async (req, res) => {
        console.log(typeof req.params.booking_id)
        try {
            let db = req.app.get('db')
            let { booking_id } = req.params
            const bookings = await db.delete_booking({ booking_id })
            console.log(51516516516516, bookings)
            res.status(200).send(bookings)
        } catch (error) {
            console.log('Error deleting the bookings', error)
            res.status(500).send(error)
        }
    },

    updateBooking: async (req, res) => {
        console.log('Hit back end')
        try {
            let db = req.app.get('db')
            let { name, email, phone, booking_date, location, notes } = req.body
            let { booking_id } = req.params

            let editedBooking = await db.update_booking({ booking_id, name, email, phone, booking_date, location, notes })
            res.status(200).send(editedBooking)
        } catch (error) {
            console.log('Error updating the bookings', error)
            res.status(500).send(error)
        }
    }



}




