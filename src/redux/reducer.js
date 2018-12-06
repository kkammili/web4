/**
 * ALL reducers should go here.
 * The combined reducer is then fed into the store.
 */
import {combineReducers} from 'redux-immutable'
import {LOCATION_CHANGE} from 'react-router-redux'
import http from './http/redux'
import {FormsReducer} from '../utils/form_utils'
import {fromJS} from 'immutable'

import Dashboard from '../../src/modules/Dashboard/redux/reducer'
import AppReducer from '../../src/app/redux/reducer'
import Questionnaire from '../../src/modules/Onboarding/redux/reducer'
import UsersReducer from '../app/auth/redux/reducer'
import About from '../../src/modules/About/redux/reducer'
import Documentation from '../../src/modules/Documentation/redux/reducer'
import HealthMetrics from '../../src/modules/HealthMetrics/redux/reducer'
import SuccessStories from '../../src/modules/SuccessStories/redux/reducers'

const initialState = fromJS({
  locationBeforeTransitions: null
})

function Routes (state = initialState, {type, payload} = {}) {
  if (type === LOCATION_CHANGE) {
    return state.merge({locationBeforeTransitions: fromJS(payload)})
  }

  return state
}

export default combineReducers({
  Routes,
  [http.key]: http,
  Forms: FormsReducer,
  [UsersReducer.key]: UsersReducer,
  [AppReducer.key]: AppReducer,
  [Dashboard.key]: Dashboard,
  [Questionnaire.key]: Questionnaire,
  [About.key]: About,
  [HealthMetrics.key]: HealthMetrics,
  [Documentation.key]: Documentation,
  [SuccessStories.key]: SuccessStories
})
