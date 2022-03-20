const CHANGE_TIMER = 'CHANGE_TIMER'

export const changeTimer = ({ current, duration }) => {
    return (dispatch) => {
      dispatch({
        type: CHANGE_TIMER,
        payload: { current, duration }
      })
    }
  }
  