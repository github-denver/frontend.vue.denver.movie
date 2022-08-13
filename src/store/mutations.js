import { SET_COMMENTS, SET_CONTENTS, REMOVE_VISIBLE_SINGLE_LAYER, SET_LAYER, SET_VISIBLE, SET_BOARD_LIST, SET_BOARD_READ, SET_NAVIGATION, SET_CATEGORY, SET_TIMELINE, SET_PROMOTION, REMOVE_DATA, SET_UTILITY, SET_POPULAR, SET_FILTER, SET_FINDER, SET_ACCESS_TOKEN, SET_USER, REMOVE_ACCESS_TOKEN, REMOVE_USER } from './mutation-types';

import Cookies from 'js-cookie';
import axios from '@/axios';

export default {
  [SET_CONTENTS](state, payload) {
    state.contents = payload.result;
  },
  [SET_COMMENTS](state, payload) {
    state.comments = payload.list;
  },
  [REMOVE_DATA](state, payload) {
    const { category } = payload;

    state[category] = [];
  },
  [SET_VISIBLE](state, payload) {
    const { name, value } = payload;

    state.visible[name] = value;
  },
  [SET_LAYER](state, payload) {
    const { layer } = payload;

    state.visible.single.layer.flag = layer;
  },
  [REMOVE_VISIBLE_SINGLE_LAYER](state) {
    state.visible.single.layer.flag = false;
  },
  [SET_NAVIGATION](state, payload) {
    state.navigation = payload.list;
  },
  [SET_PROMOTION](state, payload) {
    state.promotion = payload.list;
  },
  [SET_CATEGORY](state, payload) {
    const { category } = payload;

    state[category] = payload.list;
  },
  [SET_TIMELINE](state, payload) {
    state.timeline = payload.list;
  },
  [SET_UTILITY](state, payload) {
    state.utility = payload.list;
  },
  [SET_POPULAR](state, payload) {
    const { category } = payload;

    state[category] = payload.list;
  },
  [SET_FILTER](state, payload) {
    const { checked, name, value } = payload;

    const index = state.filter[name].findIndex((element) => element === value);

    if (index > -1) {
      // console.log('존재하는 값이기 때문에 삭제합니다.');

      if (checked) {
        // console.log('그러나 강제 추가 건이기 때문에 삭제하지 않습니다.');
      } else {
        state.filter[name].splice(index, 1);
      }
    } else {
      // console.log('존재하지 않는 값이기 때문에 추가합니다.');

      state.filter[name].push(value);
    }
  },
  [SET_FINDER](state, payload) {
    state.finder.list = payload.list;
  },
  [SET_ACCESS_TOKEN](state, token) {
    if (token) {
      state.token = token;

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      Cookies.set('accessToken', token);
    }
  },
  [SET_USER](state, user) {
    if (user) state.user = user;
  },
  [REMOVE_ACCESS_TOKEN](state) {
    state.token = null;

    delete axios.defaults.headers.common.Authorization;

    Cookies.remove('accessToken');
  },
  [REMOVE_USER](state) {
    state.user = {};
  },
  [SET_BOARD_LIST](state, payload) {
    state.board.list = payload.list;
    state.pagination = payload.pagination;
  },
  [SET_BOARD_READ](state, payload) {
    state.board.read = payload.result[0];
  }
};
