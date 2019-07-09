import React from 'react';
import WhiteLogo from './LogoWhite1.png'
import './Image.scss'

export default function Image() {
    return (
        <div className="container" >
            <img className="headerImg" src={WhiteLogo} alt=""/>
        </div>
    )
}
