import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import timerReducer from './reducers/timerReducer'
import pointsReducer from './reducers/pointsReducer'

export const configureStore = () => {

  const reducers = combineReducers({
    timer: timerReducer,
    points: pointsReducer
  })

  const middleware = [thunk]

  const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducers,
    enhancers(applyMiddleware(...middleware))
  )

  return store
}