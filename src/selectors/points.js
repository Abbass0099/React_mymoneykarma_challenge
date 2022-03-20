import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Points from '../actions.js/changePointsAction'

// changing points
export const usePointsActions = () => {
  const dispatch = useDispatch()

  const actions = (
     bindActionCreators({
        changePoints: Points.changePoints
      },
      dispatch
    )
  )

  const changePoints = ((points) => {
    actions.changePoints(points)
  })

  return { changePoints }
}

// current points
export const usePoints = () => {
  const currentPoints = useSelector((state) => state.points.current)
  
  return { currentPoints }
}