import {createStructuredSelector} from 'reselect'

import {allUsers} from './redux/input-selectors'

export const allUsersData = createStructuredSelector({
  allUsers
})
