import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import './Stripe.scss'

toast.configure();

export default class Stripe extends Component {

    handleToken = async (token) => {
        try {
            console.log(token)
            const response = await axios.post('/checkout', { token })
            const { status } = response.data
            if (status === 'succeeded') {
                toast('Success!',
                    { type: 'success' })
            } else {
                toast('Something went wrong.',
                    { type: 'error' })
            }
        } catch (error) {
            console.log("Error", error)
        }

    }



    render() {
        return (
            <div>
                <div>
                    <StripeCheckout
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        token={this.handleToken}
                        amount={10000}
                        name='Almost There!'/>
                </div>
                <br />
                <span className="stripeSpan">Each booking needs $100 to reserve the date.</span>
            </div>
        )
    }
}
