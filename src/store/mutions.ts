import { IMarkdown } from './../api/markdownApi';
import IState from '@/types';
import { SET_IS_EDIT_DRAFT, SET_IS_SEARCH, SET_LOADING, SET_MARKDOWN_ITEM, SET_SAVE_STATUS, SET_SIDEBAR_SHOW } from "./actionTypes"

export default {
  [SET_SIDEBAR_SHOW](state: IState, val: boolean) {
    state.showSidebar = val
  },
  [SET_LOADING](state: IState, val: boolean) {
    state.loading = val
  },
  [SET_MARKDOWN_ITEM](state: IState, val: IMarkdown) {
    state.markdown = val
    sessionStorage.setItem('markdown', JSON.stringify(val))
  },
  [SET_SAVE_STATUS](state: IState, val: boolean) {
    state.haveSave = val
  },
  [SET_IS_EDIT_DRAFT](state: IState, val: boolean) {
    state.isEditDraft = val
  },
  [SET_IS_SEARCH](state: IState, val: boolean) {
    state.isSearch = val
  }
}