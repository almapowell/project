import React, { Component } from 'react'
import axios from 'axios';
import { adminLogin } from '../../Redux/Reducers/index'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import './Admin.css'

toast.configure();

class Admin extends Component {
    constructor() {
        super()

        this.state = {
            // user: {},
            email: '',
            password: ''
        }
    }

    handleLogin = () => {
        const { email, password } = this.state
        if (!email || !password) {
            toast.error('Please check your entries')
            return;
        }
        axios.post('/auth/login', { email, password }).then(res => {
            this.props.adminLogin(res.data)
            this.props.history.push('/')
            toast.success('Welcome Back, Braiden')
        }).catch(() => {
            console.log('Please check your entries')
            toast.error('Not Authorized')
        })
    }

    handleLogout = () => {
        axios.get('/auth/logout').then(() => {
            this.setState({
                email: '',
                password: ''
            })
            this.props.history.push('/films')
            toast('Logged out successfully!')
        })
    }



    render() {
        return (
            <div className="admin">
                <div >
                    <input type="text"
                        className="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <br />
                <div  >
                    <input type="password"
                        className="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="Password"
                    />
                </div>

                <div className="buttons">
                        <button className="login" onClick={this.handleLogin}>Login <i className="fas fa-arrow-alt-circle-right"></i></button>
                        <button className="logout" onClick={this.handleLogout} >Logout <i className="fas fa-times-circle"></i></button>
                </div>

            </div>
        )
    }
}

export default connect(null, { adminLogin })(Admin) 