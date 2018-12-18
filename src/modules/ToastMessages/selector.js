import {createStructuredSelector} from 'reselect'
import toastMessage from './redux/input-selector'

const toastMessageData = createStructuredSelector({
  toastMessage
})

export default toastMessageData
