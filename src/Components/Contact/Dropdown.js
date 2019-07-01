import React, { Component } from 'react';
import Stripe from './Stripe'
import './Dropdown.css';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();


export default class Dropdown extends Component {
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
        let { bride_groom_name, booking_date, location, budget, notes, how} = this.state
        if (!name || !email || !phone) {
            toast.error('Uncomplete entries')
            return;
    }
    console.log(name, email, phone)
        axios.post('/create/booking', { name, email, phone, bride_groom_name, booking_date, location, budget, notes, how })
        .then(() => {
            toast.success(`Thank you ${name}, I look forward to working with ${bride_groom_name}!`)
        })
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
            // this.props.history.push('/')
        })
    }

    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        return (
            <div>
                <label>What are you here for?</label><br />
                <select value={this.state.selected} onChange={this.handleChange} >
                    <option value="">Please Select One:</option>
                    <option value="question" >Ask A Question</option>
                    <option value="booking" >Book A Wedding</option>
                </select>

                {this.state.selected !== '' ? (this.state.selected === 'booking' ?

                    <form>

                        <p>Bride and Groom Name:<br /><input
                        onChange={(e) => this.setState({bride_groom_name: e.target.value})}
                        value={this.state.bride_groom_name} /></p>
                        
                        <p>Date:<br /><input 
                        onChange={(e) => this.setState({booking_date: e.target.value})}
                        value={this.state.booking_date} type="date" /></p>
                        
                        <p>Location:<br /><input 
                        onChange={(e) => this.setState({location: e.target.value})}
                        value={this.state.location} type="text" /></p>
                       
                       <p>Price:<br /><input
                        onChange={(e) => this.setState({budget: e.target.value})}
                        placeholder="What is your budget?"
                        value={this.state.budget} type="number" /></p>
                        
                        <div>
                            <label>How did you hear about me?</label><br />
                            <select onChange={(e) => {this.setState({how: e.target.value})}} >
                                <option value='' >-</option>
                                <option value='Google' >Google</option>
                                <option value='Gacebook' >Facebook</option>
                                <option value='Instagram' >Instagram</option>
                                <option value='Refer' >Friend/Family Member</option>
                                <option value='Other' >Other</option>
                            </select>
                        </div>

                        <p>Notes:<br/><input type="text" value={this.state.notes}
                        onChange={(e) => this.setState({notes: e.target.value})} /></p>
                        
                        <Stripe/>
                        <button onClick={this.createBooking} >Submit</button>
                    </form>
                    :
                    <div>
                        <p>What is your question?<br /><textarea type="text" 
                        value={this.state.message} 
                        onChange={(e) => this.setState({message: e.target.value})}
                        ></textarea> </p>
                        
                        <button onClick={this.askQuestion} >Submit</button>                    
                        
                    </div>


                ) : null}





            </div>
        )
    }
}


