import { IResponse } from '@/types';
import http from '@/utils/axios'
export interface IMarkdown {
  blogId?: number;
  sortId?: number;
  title?: string;
  content?: string;
  createTime?: string;
  updateTime?: string;
  status?: number;
}
/** 查询所有 */
export const queryAllMarkdowns = (searchMsg: string): Promise<IResponse<IMarkdown[]>> => {
  return new Promise((resolve, reject) => {
    http
    ._get('/markdown/list', { searchMsg })
    .then((res) => {
      resolve(res.data)
    })
    .catch((error: Error) => {
      reject(error)
    })
  })
}
/**
 * 保存文章接口
 * @param markdown markdown 文章数据
 * @returns promise 对象
 */
export const saveMarkdown = (markdown: IMarkdown): Promise<IResponse<any>> => {
  return new Promise((resolve, reject) => {
    http._post('/markdown/save', markdown)
    .then((res) => {
      resolve(res.data)
    })
    .catch((error: Error) => {
      reject(error)
    })
  })
}
/**
 * 上传图片
 * @param file 图片文件
 * @param headers 请求头
 * @returns 
 */
export const uploadImage = (file: FormData, headers = {}) => {
  return new Promise((resolve, reject) => {
    http._post('/image/upload', file, headers)
    .then((res) => {
      resolve(res.data)
    })
    .catch((error: Error) => {
      reject(error)
    })
  })
}
// 删除草稿
export const deleteDraft = (draft: IMarkdown): Promise<IResponse<any>> => {
  return new Promise((resolve, reject) => {
    http._delete('/markdown/delete', draft)
    .then((res) => {
      resolve(res.data)
    })
    .catch((error: Error) => {
      reject(error)
    })
  })
}

// 编辑保存草稿
export const updateMarkdown = (markdown: IMarkdown): Promise<IResponse<any>> => {
  return new Promise((resolve, reject) => {
    http._post('/markdown/update', markdown)
    .then((res) => {
      resolve(res.data)
    })
    .catch((error: Error) => {
      reject(error)
    })
  })
}


