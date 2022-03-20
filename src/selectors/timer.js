import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Timer from '../actions.js/changeTimeAction'

// changing time
export const useTimerActions = () => {
  const dispatch = useDispatch()

  const actions = (
    bindActionCreators({
        changeTimer: Timer.changeTimer,
      },
      dispatch
    )
  )

  const changeTimer = (({ current, duration }) => {
    actions.changeTimer({ current, duration })
  })

  return { changeTimer }
}

// current time and current duration
export const useTimer = () => {
  const currentTimer = useSelector((state) => state.timer.current)
  const currentDuration = useSelector((state) => state.timer.duration)

  return { currentTimer, currentDuration }
}