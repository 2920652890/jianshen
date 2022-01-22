
import { createStore, applyMiddleware, compose } from '../modules/redux/redux.min.js'

import reducers from './reduces/index.js'

const store = createStore(
  reducers
)

export default store