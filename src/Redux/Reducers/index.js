import axios from "axios";

const initialState = {
    admin_id: 0,
    email: ''
}

const SAVE_USER = 'SAVE_USER'

const GET_USER = 'GET_USER'
// const GET_USER_FULFILLED = 'GET_USER_FULFILLED'
// const GET_USER_PENDING = 'GET_USER_PENDING'
// const GET_USER_REJECTED = 'GET_USER_REJECTED'



export default function (state = initialState, action) {
    console.log(state, action, action.type, action.payload)
    switch(action.type) {
        case SAVE_USER:
            return { ...state, admin_id: action.payload.admin_id, email: action.payload.email }
        case GET_USER + '_PENDING':
            console.log('hit pending',state)
            return { ...state }
        case GET_USER + '_FULFILLED':
            console.log('hit fulfilled',state)
            const { admin_id, email } = action.payload.data
            return { ...state, admin_id, email }
        case GET_USER + '_REJECTED':
            console.log('hit rejected',state)
            return { ...state }
        default: 
           return { ...state }
    }
}


export function adminLogin(data) {
    return {
        type: SAVE_USER,
        payload: data
    }
}

export function loggedIn() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/currentAdmin')

        //pending
        //fulfilled or rejected
    }
}