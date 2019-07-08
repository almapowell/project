import React, { Component } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import Image from './Image'

export default class Header extends Component {
    render() {
        return (
            <div>
                <Image />
                <nav className="navbar" >
                    <Link to="/" className="home" ><i className="fas fa-home fa-fw"></i>Home</Link>
                    <Link to="/about" className="about"><i className="fas fa-user-friends fa-fw"></i>About</Link>
                    <Link to="/films" className="films"><i className="fas fa-film fa-fw"></i>Films</Link>
                    <Link to="/contact" className="contact"><i className="fas fa-address-card fa-fw"></i>Contact</Link>
                </nav>

            </div>
        )
    }
}
