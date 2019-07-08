import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { loggedIn } from '../../Redux/Reducers/index'
import { connect } from 'react-redux';
import './Films.scss';


toast.configure();

class Films extends Component {
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
        if (!url) {
            toast.error('No URL')
            return;
        }
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
        let { admin_id } = this.props
        const mappedFilms = this.state.films.map(film => {
            return (
                
                <div key={film.video_id}>
                    <iframe className="film" title={film.video_id} src={film.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    {admin_id ? <button onClick={() => this.deleteFilm(film.video_id)} className="deleteButton">Delete</button> : null }
                </div>
            )
        })

        return (
            <div>
        
                    <div className="fLable">
                        <h1 className="Flabel">Films</h1>
                    <div className="allfilms">
                        {mappedFilms}
                    </div>
                    {admin_id ?
                    <div className="addUrl">
                        <input className="urlInput" placeholder="Add URL"
                            onChange={(e) => this.setState({ url: e.target.value })}
                            value={this.state.url} type="text" />
                        <button className="addButton" onClick={() => this.postFilm()} >Add <i className="fas fa-plus"></i></button>
                    </div>
                    : 
                    null}
                    </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    console.log('Films knows')
    return {
        admin_id: reduxState.admin_id,
        email: reduxState.email
    }
}

export default connect(mapStateToProps)(Films)