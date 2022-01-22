import { combineReducers } from '../../modules/redux/redux.min.js'
import user from './user.js'
import stack from './stack'

export default combineReducers({
  user,
  stack
})
