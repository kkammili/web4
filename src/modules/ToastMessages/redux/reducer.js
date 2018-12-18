import {Map, fromJS} from 'immutable'
import * as actions from './actions.js'

function Toast (state = Map(), {type, ...action}) {
  switch (type) {
    case actions.DISPLAY_TOAST_MESSAGE:
      return state.set('message', fromJS(action.message))
    default:
      return state
  }
}

Toast.key = 'Toast'
export default Toast
