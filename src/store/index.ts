import IState from '@/types'
import { createStore, Store } from 'vuex'
import actions from './actions'
import mutations from './mutions'
import state from './state'

const store: Store<IState> = createStore({
  state,
  mutations,
  actions,
})

export default store