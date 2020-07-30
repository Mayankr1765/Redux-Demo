const redux = require('redux')
const createStore = redux.createStore

// Action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE = 'BUY_ICE'

{
    type: BUY_CAKE
    info: 'First Redux Action'
}
//Action Creator
function buyCake() {
    return{
        type: BUY_CAKE,
        info: 'First Redux Action'

    }
}

function buyICE(){
    return{
        type: BUY_ICE
        
    }
}

 // (previousState,Action) => newState

 const initialState = {
     noOfCakes: 10,
     noOfIceCreams: 20
 }
// Reducer
const reducer = (state = initialState,action) =>{
    switch(action.type){
        case BUY_CAKE:
        return{
            ...state,
            noOfCakes: state.noOfCakes-1
        }
        case BUY_ICE:
        return{
            ...state,
            noOfIceCreams: state.noOfIceCreams-1
        }
        default:
        return state
    }
}
// Store
const store = createStore(reducer)
console.log('Initial State',store.getState())
 const unsubscribe = store.subscribe(() => console.log('Updated State',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyICE())
store.dispatch(buyICE())
store.dispatch(buyCake())
unsubscribe()
