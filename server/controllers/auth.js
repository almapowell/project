const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        
        try {
            const db = req.app.get('db')
            const { name, email, password } = req.body

            let users = await db.findUserByEmail(email)
            let user = users[0]

            if (user) {
                return res.status(409).send('email is being used')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.createUser({name, email, hash})
            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(req.session.user)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    login: async (req, res) => {

        try {
            const db = req.app.get('db')
            const { email, password } = req.body

            let users = await db.findUserByEmail(email)
            let user = users[0]

            if (!user) {
                return res.status(401).send('email or password incorrect')
            }

            let isAuth = bcrypt.compareSync(password, user.password)

            if (!isAuth) {
                return res.status(401).send('email or password incorrect')
            }

            delete user.password
            req.session.user = user
            res.send(req.session.user)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    currentUser: (req, res) => {
        res.send(req.session.user)
    }
}