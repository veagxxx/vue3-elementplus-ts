import { IMarkdown } from './../api/markdownApi';
import IState from '@/types';
import { SET_IS_EDIT_DRAFT, SET_LOADING, SET_MARKDOWN_ITEM, SET_SIDEBAR_SHOW, SET_SAVE_STATUS, SET_IS_SEARCH } from './actionTypes';
import { Commit } from "vuex"
interface IContext {
  commit: Commit,
  state: IState
}
export default {
  // 侧边菜单是否折叠
  [SET_SIDEBAR_SHOW]({ commit, state }: IContext, val: boolean) {
    commit(SET_SIDEBAR_SHOW, val)
  },
  // 设置加载状态
  [SET_LOADING]({ commit, state }: IContext, val: boolean) {
    commit(SET_LOADING, val)
  },
  // 文章详情数据
  [SET_MARKDOWN_ITEM]({ commit, state }: IContext, val: IMarkdown) {
    commit(SET_MARKDOWN_ITEM, val)
  },
  [SET_SAVE_STATUS]({ commit, state }: IContext, val: boolean) {
    commit(SET_SAVE_STATUS, val)
  },
  // 是否编辑草稿
  [SET_IS_EDIT_DRAFT]({ commit, state }: IContext, val: boolean) {
    commit(SET_IS_EDIT_DRAFT, val)
  },
  // 是否编辑草稿
  [SET_IS_SEARCH]({ commit, state }: IContext, val: boolean) {
    commit(SET_IS_SEARCH, val)
  }
}