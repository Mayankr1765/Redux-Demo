const redux = require('redux')
const reduxLogger = require('redux-logger')

const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware




const logger = reduxLogger.createLogger()


const createStore = redux.createStore

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

const initialCakeState ={
     noOfCakes: 10
}

const initialIceState ={
    noOfIce: 20
}

const cakereducer = (state = initialCakeState,action) =>{
    switch(action.type){
        case BUY_CAKE:
        return{
            ...state,
            noOfCakes: state.noOfCakes-1
        }
            default:
            return state
    }

}

const icereducer = (state = initialIceState,action) =>{
    switch(action.type){
        case BUY_ICE:
        return{
            ...state,
            noOfIce: state.noOfIce-1
        }
        default:
        return state
    }
    
}

const rootReducer = combineReducers({

    cake: cakereducer,
    icecream: icereducer
})

const store = createStore(rootReducer,applyMiddleWare(logger))
console.log('Initial State',store.getState())
 const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyICE())
store.dispatch(buyICE())
store.dispatch(buyCake())
unsubscribe()