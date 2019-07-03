import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './Reducers/index'

// export default createStore(reducer, [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(promiseMiddleware)])
export default createStore(reducer, applyMiddleware(promiseMiddleware))
