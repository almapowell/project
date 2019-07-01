import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();

export default class About extends Component {
    constructor() {
        super() 

        this.state = {
            bookings: []
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
        console.log(booking_id)
        axios.put(`/update/booking/${booking_id}`, ).then(res => {
            this.setState({
                bookings: res.data
            })
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
                    <button onClick={() => this.handleDelete(info.booking_id)} >Delete</button>
                    <button onClick={() => this.updateBooking(info.booking_id)} >Edit</button>
                </div>
            )
        })
        return (
            <div>
                <h1>About</h1>
                {/* <image alt="" src="https://gm1.ggpht.com/4NmUUnDyl3w6HwzCAMe08-HZgaDPNQNhUyr4ZS3IFluIdXRh55Cy6OH6XevOcBi1OC0adVKB73OuF7FWXv4hDhsNrOGaOIMer7zAzU6kMBD-cvT3upJXtC8HlYG0YpxdFg34ajnPYKG94Uzk1yhjmX3xJ0Ed3mVc56AKuu-UVMocuaepiA4bOmwNKWPVs7yHxsJsAtLoH21vtBx7Bd3h4beiw7Uqx0-YlXgY9DuQv4nxIEKNFjUehMqwzSLpEtmQoBT_mTL3xRYu71L8iIT3077WteH4VsWsTE5j5e-QN6e-x-NLTpsFs5oth9rjcC1BZX7tOmBSEtx3hWQOWOw9MMb49ZglVZqHkVJGDih694R-NqQitXWeVTBcKA--SF69YdjKyWCsp4m2Zm-1uwAeSVLDzSKALeXtPR9TNyKjmbqtbEJc8sz78MP1LON29iRp_dFiDpNKCAYVnnaPautgGjgox6Kb7OQNljsI8jp6Vq19lFdwJBKNm6R0_8MpGSUPdcwHuRB0QMT9OllL8BIGdjwlWWkhzVvah8B7ISZovdmFRF7EuTOxlLwRpn8gDIne6Hx8EWLy_mGv6u3rRbh6B37i5yIFgVdZa-QimCipiJgzIj0zUBZr3Oy2MvSd922j_SGVH1Jd4Ya94N1PndmluKP56pfx32l6MIYtbBA5z6Sliu_6YKyGyOY4sO7_MD4lM7mV5oY6TwyXQbWATOqKE7SsF4k2L6mTi1E6zg=s0-l75-ft-l75-ft" /> */}
                {mappedBookings}
            </div>
        )
    }
}
