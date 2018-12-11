import {sendingRequest, receivedResponse} from '../../redux/http/redux'
import ajax from '../../redux/http'
import {createAction} from '../../utils/redux_utils'

export const FETCH_GITHUB_DATA = 'FETCH_GITHUB_DATA'

export const fetchGitHubDataSuccess = createAction(FETCH_GITHUB_DATA, 'id', 'gitData')
export const fetchGitHubDataId = () => `fetchGitHubData`
export function fetchGitHubData () {
  const id = fetchGitHubDataId()
  return dispatch => {
    dispatch(sendingRequest(id))
    return ajax.get(`/git/fetchGitHubData`)
      .then(res => {
        dispatch(receivedResponse(id))
        return dispatch(fetchGitHubDataSuccess(id, res.data))
      })
      .catch(errors => dispatch(receivedResponse(id, {errors})))
  }
}
