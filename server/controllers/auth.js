const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        
        try {
            const db = req.app.get('db')
            const { name, email, password } = req.body

            let foundAdmin = await db.find_admin_by_email(email)
            let admin = foundAdmin[0]

            if (admin) {
                return res.status(409).send('email is being used')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.create_admin({name, email, hash})
            let newAdmin = response[0]

            delete newAdmin.password

            req.session.admin = newAdmin
            res.send(req.session.admin)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    login: async (req, res) => {

        try {
            const db = req.app.get('db')
            const { email, password } = req.body

            let foundAdmin = await db.find_admin_by_email(email)
            let admin = foundAdmin[0]

            if (!admin) {
                return res.status(401).send('email or password incorrect')
            }

            let isAuth = bcrypt.compareSync(password, admin.password)

            if (!isAuth) {
                return res.status(401).send('email or password incorrect')
            }

            delete admin.password
            req.session.admin = admin
            res.send(req.session.admin)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    currentAdmin: (req, res) => {
        res.send(req.session.admin)
    }
}