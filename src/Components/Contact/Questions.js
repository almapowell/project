import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import './Questions.scss';

toast.configure();
// import { Link } from 'react-router-dom'

class Quesions extends Component {
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
                <div className="allQuestions" key={question.question_id} >

                    <h1 className="Qname">Name: {question.name}</h1>
                    <h2 className="Qphone">Phone Number: {question.phone}</h2>
                    <h2 className="Qemail">Email: {question.email}</h2>
                    <h2 className="Qquestion">Question: {question.message}</h2>
                    <div>
                        <button className="QdeleteBtn btn" onClick={() => this.handleDelete(question.question_id)} >Delete</button>

                    </div>
                    <div className="commentIcon">
                        <i className="fas fa-comment-alt"></i>
                    </div>
                </div>
            )
        })
        return (
            <>
                <h1 className="qLabel">Questions</h1>
                {mappedQuestions}
            </>
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
export default connect(mapStateToProps)(Quesions)