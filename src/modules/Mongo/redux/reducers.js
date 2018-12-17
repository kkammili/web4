import {Map, fromJS} from 'immutable'
import * as actions from './actions.js'

function Mongo (state = Map(), {type, ...action}) {
  switch (type) {
    case actions.CREATE_NEW_USER:
      return state.setIn(['users', 'createNewUser'], fromJS(action.createNewUser))
    case actions.FETCH_ALL_USERS:
      return state.setIn(['users', 'readAllUsers'], fromJS(action.fetchAllUsers))
    default:
      return state
  }
}

Mongo.key = 'mongo'
export default Mongo
