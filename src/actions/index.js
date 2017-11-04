import { FETCH_POSTS,
         CREATE_POST,
         FETCH_POST,
         DELETE_POST,
         UPDATE_POST } from './action_types';
import axios from 'axios';

const ROOT_URL = "http://newlandp-posts-api.herokuapp.com";

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}

export function updatePost(id, values, callback) {
  const request = axios.put(`${ROOT_URL}/posts/${id}`, values)
    .then(() => callback());

  return {
    type: UPDATE_POST,
    payload: request
  };
}