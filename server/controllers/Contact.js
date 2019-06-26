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
            let db = req.app.get('db')
            let { bride_groom_name, booking_date, location, budget, notes, how, name, email, phone } = req.body
            // let newDate = new Date()
            // let date = newDate.getDate().toString()
            // let month = (newDate.getMonth()+1).toString()
            // let year = newDate.getFullYear().toString()
 
            // let postDate =  `${date} ${month} ${year}`
 
            // let time = newDate.getHours().toString()
            // let min = newDate.getMinutes().toString()
 
            // let postTime = `${time} : ${min}`

            let newBooking = { bride_groom_name, booking_date, location, budget, notes, how, name, email, phone}
            let postedBookings = await db.post_booking(newBooking)
            console.log(postedBookings)
            res.status(200).send(postedBookings)
        } catch (error) {
            console.log('Error posting the bookings', error)
            res.status(500).send(error)
        }
    },

    // question: async (req, res) => {
    //     try {
    //         let db = req.app.get('db')
    //         let { name, email, phone, message } = req.body
    //         let question = db.ask_question()
    //     } catch (error) {
    //         console.log('Error posting the bookings', error)
    //         res.status(500).send(error)
    //     }
    // }







}




