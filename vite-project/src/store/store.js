import { createStore, combineReducers } from 'redux'

import { pstReducer } from './pst.reducer.js'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    pstModule: pstReducer,
    userModule: userReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



