import {createAction} from '../../../utils/redux_utils'

export const DISPLAY_TOAST_MESSAGE = 'DISPLAY_TOAST_MESSAGE'
export const displayToastMessage = createAction(DISPLAY_TOAST_MESSAGE, 'id', 'message', 'style')

export const CLEAR_TOAST_MESSAGE = 'CLEAR_TOAST_MESSAGE'
export const clearToastMessage = createAction(CLEAR_TOAST_MESSAGE, 'indexClear')
