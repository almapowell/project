import React, { Component } from 'react';
import Dropdown from './Dropdown';
import Questions from './Questions';
import Bookings from './Bookings';
import { connect } from 'react-redux';

import './Contact.scss';

class Contact extends Component {
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
        let { admin_id } = this.props
        return (
            <div>
                {!admin_id ?
                    <form className="contactLabel">
                        <h1 className="Clabel">Contact</h1>
                        <p className="contactP">I would love to hear from you or answer any questions that you may have for me. Please fill out the following below and I will reply as soon as possible. Thank you!</p>
                        <br/>
                        <div className="grid">
                            <div className="firstInfo">
                                <div className="Cname" >
                                    <p>Name: <span style={{ color: 'red' }}>*</span><br /><input className="contactInputs" type="text"
                                        name='name' onChange={this.handleChange}
                                    /></p>
                                </div>
                                <div className="Cemail" >
                                    <p>Email: <span style={{ color: 'red' }}>*</span><br /><input className="contactInputs" type="text"
                                        name='email' onChange={this.handleChange}
                                    />
                                    </p>
                                </div>
                                <div className="Cphone">
                                    <p>Phone Number: <span style={{ color: 'red' }}>*</span><br /><input className="contactInputs" type="text"
                                        name='phone' onChange={this.handleChange}
                                    /></p></div>
                                <div className="Cdropdown">
                                    <Dropdown contact={this.state} />
                                </div>
                            </div>
                        </div>



                    </form>
                    :
                    <div className="">
                        <Questions />
                        <Bookings />
                    </div>

                }
            </div>


        )
    }
}


function mapStateToProps(reduxState) {
    console.log('Films knows')
    return {
        admin_id: reduxState.admin_id,
        email: reduxState.email
    }
}

export default connect(mapStateToProps)(Contact)