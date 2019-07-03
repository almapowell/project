import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

toast.configure();
// import { Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super() 

        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        let { questions } = this.state
        axios.get('/get/questions', { questions }).then(res => {
            this.setState({
                questions: res.data
            })
        })
    }
    
    handleDelete = question_id => {
        axios.delete(`/delete/question/${question_id}`).then(res => {
            this.setState({
                questions: res.data
            })
            toast.error('QUESTION DELETED')
        })
    }


    render() {
        const mappedQuestions = this.state.questions.map(question => {
            return (
                <div key={question.question_id} >
                    <h2>Name: {question.name}</h2>
                    <h2>Phone Number:{question.phone}</h2>
                    <h3>Email: {question.email}</h3>
                    <p>{question.message}</p>
                    <button onClick={() => this.handleDelete(question.question_id)} >Delete</button>
                    <button>Reply</button>
                </div>
            )
        })
        return (
            <div>

                {mappedQuestions}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
         admin_id: reduxState.admin_id,
         email: reduxState.email
    }
}
 
//mapstatetoprops => returns an object
//connect puts these properties on the local component's props
//connect takes in two arguments :1. it puts stateful items on to local component,2. it puts action creators (both have to be an object)
export default connect(mapStateToProps)(Home)