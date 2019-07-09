const stripe = require('stripe')(process.env.STRIPE_SECRET)
const uuid = require('uuid/v4')

module.exports = {
    payment: async (req, res) => {
        console.log('Request:', req.body)

        try {
            const { token } = req.body;

            const customer = await
                stripe.customers.create({
                    email: token.email,
                    source: token.id
                })

            const idempotency_key = uuid();
            console.log(idempotency_key)
            stripe.charges.create(
                {
                    amount: 10000,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: "You're date has been booked!"

                },
                (err, charge) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    } else {
                        console.log('Successful payment', charge)
                        //this is where you would do something with that purchase (i.e. store that information to your db)
                        return res.status(200).send(charge)
                    }
                }

            )

        } catch (error) {
            console.log('Error making payment', error)
        }
    }
}

