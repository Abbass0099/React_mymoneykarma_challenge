import { createReducer } from '@reduxjs/toolkit'

const CHANGE_TIMER = 'CHANGE_TIMER'

const initialState = { current: '00:00', duration: 0 }

const currentReducer = createReducer(initialState, {
  [CHANGE_TIMER]: (state, action) => {
    state.current = action.payload.current
    state.duration = action.payload.duration
  },
})

export default function timerReducer(state = initialState, action = {}) {
  return currentReducer(state.timer, action)
}
