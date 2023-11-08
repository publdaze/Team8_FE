import { instance } from './axios';

// post 관련 api

interface PostInfo {
  groupId: number;
  title?: string;
  content?: string;
  pageId?: number;
  postId?: number;
  parentPostId?: number;
  order?: number;
}

export const createPostFn = ({ groupId, pageId, parentPostId, order, title, content }: PostInfo) =>
  instance.post(`/group/${groupId}/post/create`, { pageId, parentPostId, order, title, content });

export const modifyPostFn = ({ groupId, postId, title, content }: PostInfo) =>
  instance.put(`/group/${groupId}/post/modify`, { postId, title, content });

export const deletePostFn = ({ groupId, postId }: PostInfo) => instance.delete(`/group/${groupId}/post/${postId}`);

export const getHistoryFn = ({ groupId, postId }: PostInfo) =>
  instance.get(`/group/${groupId}/post/${postId}/history?page=1`);

export const reportPostFn = ({ groupId, postId, content }: PostInfo) =>
  instance.post(`/group/${groupId}/post/report`, { postId, content });
