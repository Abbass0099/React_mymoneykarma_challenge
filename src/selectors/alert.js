import Swal from 'sweetalert2'

import { useTimerActions } from './timer'

export const useAlertActions = () => {
  const { changeTimer } = useTimerActions()

  const showConfirmationAlert = ({position, icon, title, showConfirmButton, timer}) => (
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton,
      timer
    })
  )

  const showCustomTimerAlert = () => (
    Swal.fire({
      title: 'Enter your custom seconds:',
      html: `<input style="background: grey; color: white" type="text" id="customTimer" class="swal2-input" placeholder="Number of seconds">`,
      confirmButtonText: 'Confirm',
      focusConfirm: false,
      preConfirm: () => {
        const customTimer = Swal.getPopup().querySelector('#customTimer').value
        // console.log("Custom: ", customTimer)
        if (customTimer < 0 || isNaN(customTimer)) {
          Swal.showValidationMessage(`Please enter some time...`)
        }
        changeTimer({
          current: customTimer < 0 || isNaN(customTimer) || !customTimer ? 'Invalid Time' : customTimer + ' sec',
          duration: customTimer
        })
      }
    })
  )

  return { showConfirmationAlert, showCustomTimerAlert }
}