/**
 * 通用类型文件
 */
import { IMarkdown } from './../api/markdownApi';

export default interface IState {
  isSearch: boolean;
  haveSave: boolean;
  isEditDraft: boolean;
  showSidebar: boolean;
  loading: boolean;
  markdown: IMarkdown;
}


export interface IResponse<T> {
  code: number;
  data?: T;
  message?: string;
  token?: string;
}