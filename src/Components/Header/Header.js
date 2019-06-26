import React, { Component } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Image from './Image'

export default class Header extends Component {
    render() {
        return (
            <div>
                <Image />
                <nav className="navbar" >
                    <Link to="/" className="home" ><i class="fas fa-home fa-fw"></i>Home</Link>
                    <Link to="/about" className="about"><i class="fas fa-user-friends fa-fw"></i>About</Link>
                    <Link to="/films" className="films"><i class="fas fa-film fa-fw"></i>Films</Link>
                    <Link to="/contact" className="contact"><i class="fas fa-address-card fa-fw"></i>Contact</Link>
                </nav>

            </div>
        )
    }
}
