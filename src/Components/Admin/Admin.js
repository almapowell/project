import React, { Component } from 'react'
import axios from 'axios';
import { adminLogin } from '../../Redux/Reducers/index'
import { clearUser } from '../../Redux/Reducers/index'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import './Admin.scss'

toast.configure();

class Admin extends Component {
    constructor() {
        super()

        this.state = {
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
        axios.get('/auth/logout').then((res) => {
            this.props.clearUser(res.data)
            console.log('passed clear user')
            this.props.history.push('/films')
            toast('Logged out successfully!')
        })
    }



    render() {
        return (
            <div className="adminScreen">
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
                    <div>
                        <input type="password"
                            className="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            placeholder="Password"
                        />
                    </div>

                    <div className="adminBtns">
                        <button className="login" onClick={this.handleLogin}>Login <i className="fas fa-arrow-alt-circle-right"></i></button>
                        <button className="logout" onClick={this.handleLogout} >Logout <i className="fas fa-times-circle"></i></button>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(reduxState) {
    console.log(reduxState)
    return {
        admin_id: reduxState.admin_id,
        email: reduxState.email
    }
}

let mapDispatchToProps = { clearUser, adminLogin }

export default connect(mapStateToProps, mapDispatchToProps)(Admin) 