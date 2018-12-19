import {sendingRequest, receivedResponse} from '../../../redux/http/redux'
import ajax from '../../../redux/http'
import {createAction} from '../../../utils/redux_utils'
// import axios from 'axios'
import {displayToastMessage} from '../../ToastMessages/redux/actions'

export const CREATE_NEW_USER = 'CREATE_NEW_USER'
export const createNewUserSuccess = createAction(CREATE_NEW_USER, 'id', 'createNewUser')

export const ERROR_CREATING_USER = 'ERROR_FETCHING_USER'
export const errorCreatingUser = createAction(ERROR_CREATING_USER, 'id', 'error')

export const createNewUserId = () => `createNewUser`
export function createNewUser (name, email) {
  const id = createNewUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return ajax.post(`mongoUser/doCreate/${name}/${email}`)
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(createNewUserSuccess(id, res.data))
      })
      .catch((errors) => {
        dispatch(receivedResponse(id, {errors}))
        return dispatch(errorCreatingUser(id, {errors}))
      })
  }
}

export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const fetchAllUsersSuccess = createAction(FETCH_ALL_USERS, 'id', 'fetchAllUsers')

export const ERROR_FETCHING_USER = 'ERROR_FETCHING_USER'
export const errorFetchingUser = createAction(ERROR_FETCHING_USER, 'id', 'error')

export const fetchAllUsersId = () => `fetchAllUsers`
export function fetchAllUsers () {
  const id = fetchAllUsersId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return ajax.get(`mongoUser/doRead`)
      .then(res => {
        dispatch(receivedResponse(id))
        if (res.data.length === 0) {
          dispatch(displayToastMessage(id, 'no users present in db', 'error'))
        }
        return dispatch(fetchAllUsersSuccess(id, res.data))
      })
      .catch((errors) => {
        dispatch(receivedResponse(id, {errors}))
        return dispatch(errorFetchingUser(id, {errors}))
      })
  }
}

export const DELETE_USER = 'DELETE_USER'
export const deleteUserSuccess = createAction(DELETE_USER, 'id', 'deleteUser')

export const ERROR_DELETING_USER = 'ERROR_DELETING_USER'
export const errorDeletingUser = createAction(ERROR_DELETING_USER, 'id', 'error')

export const deleteUserId = () => `deleteUser`
export function deleteUser (name) {
  const id = deleteUserId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return ajax.delete(`mongoUser/doDelete/${name}`)
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(deleteUserSuccess(id, res.data))
      })
      .catch((errors) => {
        dispatch(receivedResponse(id, {errors}))
        dispatch(displayToastMessage(id, 'user ' + {errors}.errors.response.data.error, 'warning'))
        return dispatch(errorDeletingUser(id, {errors}))
      })
  }
}
