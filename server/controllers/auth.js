const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        
        try {
            console.log(req.body)
            const db = req.app.get('db')
            const { email, password } = req.body

            let foundAdmin = await db.find_admin_by_email(email)
            let admin = foundAdmin[0]

            if (admin) {
                return res.status(409).send('email is being used')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.create_admin({email, hash})
            let newAdmin = response[0]

            delete newAdmin.password

            req.session.admin = newAdmin
            console.log(req.session)
            res.send(req.session.admin)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    login: async (req, res) => {
        console.log('Back End')
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
            console.log(req.session.admin)
            res.send(req.session.admin)

        } catch (error) {
            console.log('ERROR', error)
            res.status(500).send(error)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send('Session Destroyed')
    },

    currentAdmin: (req, res) => {
        console.log(6551515, req.session.admin)
        res.send(req.session.admin)
    }
}
