import React, { Component } from 'react'
import './Footer.scss'
// import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        let style = { color: 'white' }
        return (
            <div className="mainfooter">
                <div className="footer">
                    <div>
                        <ul className="footerIcons">
                            {/* <Link to="/" target="https://www.facebook.com/braiden.powell.3" className="facebook" ><i class="fab fa-facebook-f"></i></Link> */}
                            <li className="facebook"><a href="https://www.facebook.com/braiden.powell.3" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" style={style}></i></a></li>
                            <li className="instagram"><a href="https://www.instagram.com/braidenpowellfilms/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" style={style}></i></a></li>
                            <li className="youtube"><a href="https://www.youtube.com/channel/UCbZOypAgUKZqzaxEKmMlYTA" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" style={style}></i></a></li>
                        </ul>
                    </div>

                </div>
            </div>

        )
    }
}
