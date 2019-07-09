import React, { Component } from 'react';
import './About.scss'
import selfie from './selfie.jpg'

export default class About extends Component {
    render() {
        return (
            <div className="aboutPage">
                <h1 className="Alabel">About</h1>
                <div className="aboutContainer">
                    <img className="image" src={selfie} alt="" />
                    <div className="mainParagraph">
                        <p>Hi there! My name is Braiden Powell and I am a filmaker/cinematographer and I am based out of Utah. I fell in love with filming back in 2016 from a trip to Europe. I loved seeing different parts of the Earth and wanted a way to document special moments in life. I first filmed my friends wedding and loved seeing two people celebrate their special day, and letting me be apart of it. My goal is to capture and document each and every couple's story and create a timeless video unique to every story! </p>
                    </div>

                </div>
            </div>
        )
    }
}
