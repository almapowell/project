import React, { Component } from 'react';
import './Home.scss'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoURL: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
        }
    }


    render() {
        return (
            <div className="videoContainer">
                <h1 className="Hlabel">Home</h1>
                <iframe title="ok" className="singleVideo" src="https://www.youtube.com/embed/wSr7pWjHY-0?autoplay=1"></iframe>
                {/* <iframe class="embed-responsive-item"id="ytplayer" type="text/html" width="640" height="360" src=""
      frameborder="0" allowfullscreen></iframe> */}
            </div>
        )
    }
}
