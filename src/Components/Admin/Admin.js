import React, { Component } from 'react'
import axios from 'axios';
import { SAVE_USER } from '../../Redux/Reducers/admin_reducer'
import createStore from '../../Redux/store'
import './Admin.css'

export default class Admin extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    login = () => {
        const { email, password } = this.state
        if (!email || !password) {
            alert('Please check your entries')
            return;
        }
        axios.post('/api/login', { email, password }).then(res => {
            console.log(res.data)
            createStore.dispatch({
                type: SAVE_USER,
                payload: res.data
            })
            this.props.history.push('/')
        }).catch(error => {
            console.log('Please check your entries')
            alert(error)
        })
    }



    render() {
        return (
            <div className="admin">
                <div className="email">
                    <input type="text"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        placeholder="Email"
                    />
                </div>
                <br />
                <div className="password" >
                    <input type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="Password"
                    />
                </div>
                <br />
                <div className="button" >
                    <button onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}
