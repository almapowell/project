import React, { Component } from 'react'
import Dropdown from './Dropdown'

export default class About extends Component {
    constructor() {
        super() 

        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Contact</h1>
                <p>I would love to hear from you or answer any questions that you may have for me. Please fill out the following below and I will reply as soon as possible. Thank you!</p>
                <div className="name" >
                    <p>Name: <span style={{color: 'red'}}>*</span><br /><input type="text"
                    name='name' onChange={this.handleChange}
                    /></p>
                </div>
                <div className="emailNumber" >
                    <p>Email: <span style={{color: 'red'}}>*</span><br /><input type="text"
                    name='email' onChange={this.handleChange}
                    />
                    </p>
                    <p>Phone Number: <span style={{color: 'red'}}>*</span><br /><input type="text"
                    name='phone' onChange={this.handleChange}
                    /></p>
                    <Dropdown contact={this.state} />
                </div>

            </div>
        )
    }
}
