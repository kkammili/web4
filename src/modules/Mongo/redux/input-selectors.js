import {List} from 'immutable'

export const allUsers = (state) => {
  return state.getIn(['mongo', 'users', 'readAllUsers'], List())
}
