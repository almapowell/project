import React, { Component } from 'react';
import axios from 'axios';
import Stripe from './Stripe';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import './Dropdown.scss';
import './Stripe.scss'

toast.configure();

class Dropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: '',
            bookings: {},
            message: '',
            bride_groom_name: '',
            booking_date: '',
            location: '',
            budget: '',
            notes: '',
            how: ''
        }
    }

    createBooking = () => {
        let { name, email, phone } = this.props.contact
        let { bride_groom_name, booking_date, location, budget, notes, how } = this.state
        if (!name || !email || !phone) {
            toast.error('Uncomplete entries')
            return;
        }
        console.log(name, email, phone)
        axios.post('/create/booking', { name, email, phone, bride_groom_name, booking_date, location, budget, notes, how })
            .then(() => {
                toast.success(`Thank you ${name}, I look forward to working with ${bride_groom_name}!`)
            })
        this.props.history.push('/')
    }

    askQuestion = () => {
        let { name, email, phone } = this.props.contact
        let { message } = this.state
        console.log(name, email, phone, message)
        if (!name || !email || !phone) {
            toast.error('Uncomplete entries')
            return;
        }
        axios.post('/ask/question', { name, email, phone, message }).then(() => {
            toast.success(`Thank you ${name}. I will get back to you as soon as possible.`)
            this.props.history.push('/')
        }).catch(err => console.log('Question was not asked', err))
    }

    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        return (
            <div className="DropdownGrid">
                <div className="mainDropdownLabel">
                    <label>What are you here for?</label>
                    <br/>
                    <select className="mainSelector" value={this.state.selected} onChange={this.handleChange} >
                        <option className="placeholder" value="">Please Select One:</option>
                        <option className="placeholder" value="question" >Ask A Question</option>
                        <option className="placeholder" value="booking" >Book A Wedding</option>
                    </select>
                </div>

                {this.state.selected !== '' ? (this.state.selected === 'booking' ?

                    <div className="firstInfo">
                        <div className="bridegroom">
                            <p className="allBefores">Bride and Groom Name: <span style={{ color: 'red' }}>*</span></p>
                            <input className="contactInputs" value={this.state.bride_groom_name}
                                onChange={(e) => this.setState({ bride_groom_name: e.target.value })} />
                        </div>

                        <div className="date">
                            <p className="allBefores">Date: <span style={{ color: 'red' }}>*</span></p>
                            <input  className="contactInputs"
                                onChange={(e) => this.setState({ booking_date: e.target.value })}
                                value={this.state.booking_date} type="date" />
                        </div>

                        <div className="location">
                            <p className="allBefores">Location: <span style={{ color: 'red' }}>*</span></p><input  className="contactInputs"
                                onChange={(e) => this.setState({ location: e.target.value })}
                                value={this.state.location} type="text" />
                        </div>

                        <div className="price">
                            <p className="allBefores">Price:</p><input  className="contactInputs"
                                onChange={(e) => this.setState({ budget: e.target.value })}
                                placeholder="What is your budget?"
                                value={this.state.budget} type="number" />
                        </div>


                        <div className="how">
                            <label className="allBefores">How did you hear about me?</label><br />
                            <select  className="contactInputs" onChange={(e) => { this.setState({ how: e.target.value }) }} >
                                <option value='' >-</option>
                                <option value='Google' >Google</option>
                                <option value='Facebook' >Facebook</option>
                                <option value='Instagram' >Instagram</option>
                                <option value='Referal' >Friend/Family Member</option>
                                <option value='Other' >Other</option>
                            </select>
                        </div>

                        <div className="notes">
                            <p className="allBefores">Notes:</p><input  className="contactInputs" type="text" value={this.state.notes}
                                onChange={(e) => this.setState({ notes: e.target.value })} />
                        </div>

                        <div className="stripe">
                            <Stripe />
                        </div>
                        <div className="submitBtn">

                            <button className="submitBtn" onClick={this.createBooking} >Submit</button>
                        </div>
                    </div>
                    :
                    <div className="question" >
                        <p className="ptagQ">What is your question?</p>
                        <textarea className="textarea"
                            type="text"
                            value={this.state.message}
                            onChange={(e) => this.setState({ message: e.target.value })}
                        ></textarea>

                        <button className="submitBtn" onClick={this.askQuestion} >Submit</button>

                    </div>


                ) : null}


            </div>
        )
    }
}



export default withRouter(Dropdown)