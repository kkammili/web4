import {Map} from 'immutable'

const toastMessage = (state) => {
  return state.getIn(['Toast', 'toast'], Map())
}

export default toastMessage
