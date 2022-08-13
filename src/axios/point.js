import axios from '@/axios';

export const fetchBoard = (payload) => {
  const { category, number } = payload;

  return axios.get(`/api/movie/board/${category}/list/${number}`);
};

export const findBoard = (payload) => {
  const { category, number } = payload;

  return axios.get(`/api/movie/board/${category}/read/${number}`);
};

export const findContents = (payload) => {
  const { category, number } = payload;

  return axios.get(`/api/movie/board/${category}/view/${number}`);
};

export const fetchComments = (payload) => {
  const { number } = payload;

  return axios.get(`/api/movie/board/comment/list123/${number}`);
};

export const addComments = (payload) => {
  return axios.post(`/api/movie/board/comment/write123`, payload);
};

export const fetchNavigation = () => {
  const url = `/api/movie/board/navigation/list`;

  return axios.get(url);
};

export const fetchCategory = (payload) => {
  const { category, number, select, keyword } = payload;

  let url = `/api/movie/board/${category}/list/${number}`;

  if (typeof select !== 'undefined' && typeof keyword !== 'undefined') {
    url = `/api/movie/board/${category}/list/${number}?select=${select}&keyword=${keyword}`;
  }

  return axios.get(url);
};

export const fetchUtility = () => {
  const url = `/api/movie/board/utility/list`;

  return axios.get(url);
};

export const fetchTimeline = (payload) => {
  const { number } = payload;

  return axios.get(`/api/movie/board/live/timeline/list/${number}`);
};

export const fetchPromotion = (payload) => {
  const { number } = payload;

  return axios.get(`/api/movie/board/promotion/list/${number}`);
};

export const fetchPopular = (payload) => {
  const { category, number, select, keyword } = payload;

  let url = `/api/movie/board/${category}/list/${number}`;

  if (typeof select !== 'undefined' && typeof keyword !== 'undefined') {
    url = `/api/movie/board/${category}/list/${number}?select=${select}&keyword=${keyword}`;
  }

  return axios.get(url);
};

export const fetchFinder = (payload) => {
  const { number, genre, score } = payload;

  let url = `/api/movie/board/new/finder/list/${number}`;

  if (typeof genre !== 'undefined' && typeof score !== 'undefined') {
    url = `/api/movie/board/new/finder/list/${number}?genre=${genre}&score=${score}`;
  }

  return axios.get(url);
};

export const signup = (payload) => {
  return axios.post('/api/register', payload);
};

export const signin = ({ id, password }) => {
  return axios.post('/api/login', { id, password });
};

export const me = ({ accessToken }) => {
  return axios.get('/api/me', {
    params: {
      accessToken
    }
  });
};

export const signout = () => {
  return axios.get(`/api/logout`);
};

export const checkId = (payload) => {
  const { id } = payload;

  return axios.get(`/api/check/id?id=${id}`);
};

export const checkName = (payload) => {
  const { name } = payload;

  return axios.get(`/api/check/name?name=${name}`);
};

export const checkEmail = (payload) => {
  const { email } = payload;

  return axios.get(`/api/check/email?email=${email}`);
};

export const profile = (payload) => {
  return axios.post('/api/profile', payload);
};
