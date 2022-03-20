import { createReducer } from '@reduxjs/toolkit'

const CHANGE_POINTS = 'CHANGE_POINTS'

const initialState = { current: 0 }

const currentReducer = createReducer(initialState, {
  [CHANGE_POINTS]: (state, action) => {
    state.current = action.payload
  },
})


export default function pointsReducer(state = initialState, action = {}) {
  return currentReducer(state.points, action)
}