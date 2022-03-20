const CHANGE_POINTS = 'CHANGE_POINTS'

export const changePoints = (points) => {
    return (dispatch) => {
      dispatch({
        type: CHANGE_POINTS,
        payload: points,
      })
    }
  }