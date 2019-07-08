import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Booking.scss'

toast.configure();

export default class Bookings extends Component {
    constructor() {
        super()

        this.state = {
            edit: false,
            bookings: [],
            booking_id: '',
            name: '',
            bride_groom_name: '',
            email: '',
            phone: '',
            booking_date: '',
            location: '',
            notes: '',
            budget: '',
            how: ''
        }
    }

    componentDidMount() {
        let { bookings } = this.state
        axios.get('/get/bookings', { bookings }).then(res => {
            // console.log(res)
            this.setState({
                bookings: res.data
            })
        })
    }

    handleDelete = (booking_id) => {
        console.log(booking_id)
        axios.delete(`/delete/booking/${booking_id}`).then(res => {
            this.setState({
                bookings: res.data
            })
            toast.error('BOOKING DATE DELETED')
        })
    }

    updateBooking = (booking_id) => {
        let { name, email, phone, booking_date, location, notes } = this.state
        console.log(booking_id)
        axios.put(`/update/booking/${booking_id}`, { name, email, phone, booking_date, location, notes }).then(res => {
            this.setState({
                bookings: res.data,
                edit: false
            })
            toast('Information updated!')
        })
    }

    toggleEdit = (info) => {
        this.setState({
            edit: !this.state.edit,
            ...info
        })
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        // console.log(this.state.bookings)
        const mappedBookings = this.state.bookings.map(info => {
            return (
                <div className="allBookings" key={info.booking_id}>
                    <h1 className="Bnames">Names: {info.bride_groom_name}</h1>
                    <h2 className="Bphone">Phone Number: {info.phone}</h2>
                    <h2 className="Bemail">Email: {info.email}</h2>
                    <h3 className="Blocation">Location: {info.location}</h3>
                    <h3 className="Bdate">Date: {info.booking_date}</h3>
                    <h3 className="Bprice">Budget: ${info.budget}</h3>
                    <h3 className="Bhow">Reference: {info.how}</h3>
                    <h2 className="Bnotes">Notes: {info.notes}</h2>
                    <div className="Bbuttons">
                        <button className="BdeleteBooking" onClick={() => this.handleDelete(info.booking_id)} >Delete</button>
                        <button className="BeditBooking" onClick={() => this.toggleEdit(info)} >Edit</button>
                    </div>
                    <div className="bookingIcon">
                        <i className="fas fa-synagogue"></i>
                    </div>
                </div>
            )
        })
        let { bride_groom_name, email, phone, booking_date, location, notes, budget, how, booking_id } = this.state
        return (
            <div>
                <h1 className="bLable">Bookings</h1>

                {this.state.edit

                    ?

                    <div className="allBookings" >
                        <h1 className="Bnames">Names: {bride_groom_name}</h1>
                        <h2 className="Bphone">Phone Number: <input type="text" value={phone} className="contactInputs" name="phone" onChange={this.handleChange} /></h2>
                        <h2 className="Bemail">Email: <input type="text" value={email} className="contactInputs" name="email" onChange={this.handleChange} /></h2>
                        <h3 className="Blocation">Location: <input type="text" value={location} className="contactInputs" name="location" onChange={this.handleChange} /></h3>
                        <h3 className="Bdate">Date: <input type="date" value={booking_date} className="contactInputs" name="booking_date" onChange={this.handleChange} /></h3>
                        <h3 className="Bprice">Budget: ${budget}</h3>
                        <h3 className="Bhow">Reference: {how}</h3>
                        <h2 className="Bnotes">Notes: <input type="text" value={notes} className="contactInputs" name="notes" onChange={this.handleChange} /></h2>
                        <div className="Bbuttons">
                            <button className="BdeleteBooking" onClick={() => this.handleDelete(booking_id)} >Delete</button>
                            <button className="BsubmitBooking" onClick={() => this.updateBooking(booking_id)} >Submit</button>

                        </div >
                        <div className="bookingIcon">
                            <i className="fas fa-synagogue"></i>
                        </div>
                    </div>
                    :
                    <div>

                        {mappedBookings}

                    </div>
                }


            </div>
        )
    }
}
