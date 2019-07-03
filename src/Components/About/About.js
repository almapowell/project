import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();

export default class About extends Component {
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
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        // console.log(this.state.bookings)
        const mappedBookings = this.state.bookings.map(info => {
            return(
                <div key={info.booking_id}>
                    <h1>Names: {info.bride_groom_name}</h1>
                    <h3>Phone Number: {info.phone}</h3>
                    <h3>Email: {info.email}</h3>
                    <h1>Location: {info.location}</h1>
                    <h1>Date: {info.booking_date}</h1>
                    <h1>Budget: ${info.budget}</h1>
                    <h1>Reference: {info.how}</h1>
                    <h1>Notes: {info.notes}</h1>
                    <button className="deleteBooking" onClick={() => this.handleDelete(info.booking_id)} >Delete</button>
                    <button className="editBooking" onClick={() => this.toggleEdit(info)} >Edit</button>
                </div>
            )
        })
        let { bride_groom_name, email, phone, booking_date, location, notes, budget, how, booking_id } = this.state
        return (
            <div>
                
                <h1>About</h1>
                { this.state.edit 
                ?
                
                <div>
                <h1>Names: {bride_groom_name}</h1>
                <h3>Phone Number: <input type="text" value={phone} name="phone" onChange={this.handleChange} /></h3>
                <h3>Email: <input type="text" value={email} name="email" onChange={this.handleChange} /></h3>
                <h1>Location: <input type="text" value={location} name="location" onChange={this.handleChange} /></h1>
                <h1>Date: <input type="date" value={booking_date} name="booking_date" onChange={this.handleChange} /></h1>
                <h1>Budget: ${budget}</h1>
                <h1>Reference: {how}</h1>
                <h1>Notes: <input type="text" value={notes} name="notes" onChange={this.handleChange} /></h1>
                <button className="deleteBooking" onClick={() => this.handleDelete(booking_id)} >Delete</button>
                <button className="submitBooking" onClick={() => this.updateBooking(booking_id)} >Submit</button>
                </div>
                :
                mappedBookings
               }
        
               
            </div>
        )
    }
}
