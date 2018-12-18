import {createAction} from '../../../utils/redux_utils'

export const DISPLAY_TOAST_MESSAGE = 'DISPLAY_TOAST_MESSAGE'
export const displayToastMessage = (id, message) => {
  return dispatch => {
    dispatch(createAction(DISPLAY_TOAST_MESSAGE, id, message))
  }
}
