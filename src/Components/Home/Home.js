import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom'

export default class About extends Component {
    constructor() {
        super() 

        this.state = {
            questions: []
        }
    }


    getQuetions = () => {
        let { questions } = this.state
        axios.get('/get/questions', { questions }).then(res => {
            this.setState({
                questions: res.data
            })
        })
    }


    render() {
        console.log(this.state.questions)
        const mappedQuestions = this.state.questions.map(question => {
            return (
                <div key={question.question_id} >
                    <h1>{question.name}</h1>
                    <h1>{question.email}</h1>
                    <h1>{question.phone}</h1>
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
