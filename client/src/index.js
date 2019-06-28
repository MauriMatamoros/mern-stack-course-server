import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/App'
import reducers from './reducers'


const store = createStore(reducers, {}, applyMiddleware(thunk))

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))