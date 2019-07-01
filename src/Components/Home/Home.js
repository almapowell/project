import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();
// import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor() {
        super() 

        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        let { questions } = this.state
        axios.get('/get/questions', { questions }).then(res => {
            console.log(res)
            this.setState({
                questions: res.data
            })
        })
    }
    
    handleDelete = question_id => {
        console.log("DELETED!")
        axios.delete(`/delete/question/${question_id}`).then(res => {
            this.setState({
                questions: res.data
            })
            toast.error('QUESTION DELETED')
        })
    }


    render() {
        console.log(this.state.questions)
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
