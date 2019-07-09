import axios from "axios";

const initialState = {
    admin_id: 0,
    email: ''
}

const SAVE_USER = 'SAVE_USER'

const CLEAR_USER = 'CLEAR_USER'

const GET_USER = 'GET_USER'
// const GET_USER_FULFILLED = 'GET_USER_FULFILLED'
// const GET_USER_PENDING = 'GET_USER_PENDING'
// const GET_USER_REJECTED = 'GET_USER_REJECTED'



export default function (state = initialState, action) {
    switch(action.type) {
        case SAVE_USER:
            return { ...state, admin_id: action.payload.admin_id, email: action.payload.email }
        case GET_USER + '_PENDING':
            return { ...state }
        case GET_USER + '_FULFILLED':
            const adminInfo = action.payload.data ? action.payload.data : {}
            // const { admin_id, email } = action.payload.data
            return { ...state, ...adminInfo }
        case GET_USER + '_REJECTED':
            return { ...state }
        case CLEAR_USER: 
            return { ...state, ...initialState }
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
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}