import {sendingRequest, receivedResponse} from '../../../redux/http/redux'
// import ajax from '../../redux/http'
import {createAction} from '../../../utils/redux_utils'
import axios from 'axios'

export const FETCH_GITHUB_DATA = 'FETCH_GITHUB_DATA'
export const fetchGitHubDataSuccess = createAction(FETCH_GITHUB_DATA, 'id', 'gitData')

export const ERROR_FETCHING_USER = 'ERROR_FETCHING_USER'
export const errorFetchingUser = createAction(ERROR_FETCHING_USER, 'id', 'error')

export const fetchGitHubDataId = () => `fetchGitHubData`
export function fetchGitHubData (userName) {
  const id = fetchGitHubDataId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return axios.get(`https://api.github.com/users/${userName}`)
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(fetchGitHubDataSuccess(id, res.data))
      })
      .catch((errors) => {
        dispatch(receivedResponse(id, {errors}))
        return dispatch(errorFetchingUser(id, {errors}))
      })
  }
}
