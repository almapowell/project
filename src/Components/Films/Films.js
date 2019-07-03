import React, { Component } from 'react';
import axios from 'axios';
import './Films.css';
import { loggedIn } from '../../Redux/Reducers/index'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

toast.configure();

export default class Films extends Component {
    constructor() {
        super()

        this.state = {
            films: [],
            url: ''
            // loading: false
        }
    }

    componentDidMount() {
        let { films } = this.state
        
        axios.get('/videos', { films }).then(res => {
            this.setState({
                films: res.data
            })
        })
    }

    postFilm = () => {
        let { url } = this.state
        axios.post('/video', { url }).then(res => {
            this.setState({
                films: res.data
            })
            toast.success('Video Added')
        })
        this.setState({
            url: ''
        })
        // if (!url) {
        // alert('Empty input')
        // return;
        // }
    }

    deleteFilm = (video_id) => {
        axios.delete(`/delete/video/${video_id}`).then(res => {
            this.setState({
                films: res.data
            })
            toast.error('VIDEO DELETED')
        })
    }

    render() {
        const mappedFilms = this.state.films.map(film => {
            return (
                <div key={film.video_id}>
                    <iframe className="film" title={film.video_id} src={film.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    <button onClick={() => this.deleteFilm(film.video_id)} className="deleteButton">Delete</button>
                </div>
            )
        })

        return (
            <div>
                <h1>Films</h1>
                <div className="allfilms">
                    {mappedFilms}
                </div>
                <div className="addUrl">
                    <input className="urlInput" placeholder="Add URL"
                        onChange={(e) => this.setState({ url: e.target.value })}
                        value={this.state.url} type="text" />
                    <button className="addButton" onClick={() => this.postFilm()} >Add</button>
                </div>

            </div>
        )
    }
}



