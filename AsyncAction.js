const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


// State
const initialState ={
    loading:false,
    users:[],
    errors: ''
}

// Actions 

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCESS = 'FETCH_USERS_SUCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// Action-Creators

const fetchUserRequest = () => {
    return {
        type:FETCH_USERS_REQUEST
    }

}

const fetchUserSucess = users =>{
    return {
        type: FETCH_USERS_SUCESS,
        payload:users
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// Reducer

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
        return{
            ...state,
            loading: true

        }
        case FETCH_USERS_SUCESS:
        return{
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE:
        return {
            loading: false,
            users: [],
            error: action.payload
        }
    }

}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then( response =>{
            // response.data is array of user
            const users = response.data.map(user => user.id)
            dispatch(fetchUserSucess(users))

        })
        .catch(error => {
            // error.message
            
            dispatch(fetchUserFailure(error.message))
        })
    }
}

const store = redux.createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState())})
store.dispatch(fetchUsers())