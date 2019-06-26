import React, { Component } from 'react'
import './Dropdown.css'
import axios from 'axios';

export default class Dropdown extends Component {
    constructor() {
        super()

        this.state = {
            selected: '',
            bookings: []
        }
    }

    createBooking = () => {
        let { bride_groom_name, booking_date, location, budget, notes, how, name, email, phone } = this.state
        axios.post('/create/booking', { bride_groom_name, booking_date, location, budget, notes, how, name, email, phone })
        .then(res => this.setState({
            bookings: res.data
        }))
    }

    handleChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    render() {
        console.log(this.state.selected)
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
                        <p>Bride and Groom Name:<br /><input /></p>

                        <p>Date:<br /><input type="date" /></p>

                        <p>Location:<br /><input  /></p>

                        <p>Price:<br /><input placeholder="What is your budget?" /></p>


                        <div>
                            <label>How did you hear about me?</label><br />
                            <select>
                                <option value='' >-</option>
                                <option value='google' >Google</option>
                                <option value='facebook' >Facebook</option>
                                <option value='instagram' >Instagram</option>
                                <option value='refer' >Friend/Family Member</option>
                                <option value='other' >Other</option>
                            </select>
                        </div>

                        <p>Notes:<br /><input /></p>

                        <button onClick={this.createBooking} >Submit</button>

                    </form>

                    :
                    
                    <div>
                        <p>What is your question?<br/><input type="text" /></p>
                        <button>Submit</button>                    

                    </div>


                ) : null}









            </div>
        )
    }
}


