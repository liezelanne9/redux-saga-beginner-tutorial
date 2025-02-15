import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware];

import Counter from './Counter'
import reducer from './reducers'

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({ type })

function render() {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => action('INCREMENT')}
            onDecrement={() => action('DECREMENT')}
            onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)
