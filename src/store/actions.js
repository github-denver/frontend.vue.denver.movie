import { SET_CONTENTS, SET_COMMENTS, SET_BOARD_LIST, SET_BOARD_READ, SET_NAVIGATION, SET_CATEGORY, SET_TIMELINE, SET_PROMOTION, REMOVE_DATA, SET_UTILITY, SET_POPULAR, SET_FINDER, SET_ACCESS_TOKEN, SET_USER, REMOVE_ACCESS_TOKEN, REMOVE_USER } from './mutation-types';

import * as point from '@/axios/point';

export default {
  async fetchBoard({ commit }, payload) {
    try {
      const response = await point.fetchBoard(payload);

      commit(SET_BOARD_LIST, { list: response.data.list, pagination: response.data.pagination });
    } catch (error) {
      console.error(error);
    }
  },
  async findBoard({ commit }, payload) {
    try {
      const response = await point.findBoard(payload);

      commit(SET_BOARD_READ, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async findContents({ commit }, payload) {
    try {
      const response = await point.findContents(payload);

      commit(SET_CONTENTS, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchComments({ commit }, payload) {
    try {
      const response = await point.fetchComments(payload);

      commit(SET_COMMENTS, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async addComments({ commit }, payload) {
    try {
      await point.addComments(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchNavigation({ commit }) {
    try {
      const response = await point.fetchNavigation();

      commit(SET_NAVIGATION, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchUtility({ commit }) {
    try {
      const response = await point.fetchUtility();

      commit(SET_UTILITY, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCategory({ commit }, payload) {
    try {
      const response = await point.fetchCategory(payload);

      commit(REMOVE_DATA, payload);
      commit(SET_CATEGORY, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchTimeline({ commit }, payload) {
    try {
      const response = await point.fetchTimeline(payload);

      commit(SET_TIMELINE, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchPromotion({ commit }, payload) {
    try {
      const response = await point.fetchPromotion(payload);

      commit(SET_PROMOTION, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchPopular({ commit }, payload) {
    try {
      const response = await point.fetchPopular(payload);

      commit(SET_POPULAR, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchFinder({ commit }, payload) {
    try {
      const response = await point.fetchFinder(payload);

      commit(SET_FINDER, response.data);
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async signup({ commit }, payload) {
    try {
      await point.signup(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async signin({ commit }, payload) {
    const response = await point.signin(payload);

    const { accessToken } = response.data;

    commit(SET_ACCESS_TOKEN, accessToken);

    const me = await point.me({ accessToken });

    const { user2 } = me.data;

    commit(SET_USER, user2);
  },
  async signout({ commit }) {
    await point.signout();

    commit(REMOVE_ACCESS_TOKEN);
    commit(REMOVE_USER);
  },
  async token({ commit }, payload) {
    const { accessToken } = payload;

    commit(SET_ACCESS_TOKEN, accessToken);

    const me = await point.me({ accessToken });

    if (me.data.code === 419) {
      commit(REMOVE_ACCESS_TOKEN);
      commit(REMOVE_USER);
    }

    const { user2 } = me.data;

    commit(SET_USER, user2);
  },
  // eslint-disable-next-line no-unused-vars
  async checkId({ commit }, payload) {
    try {
      const response = await point.checkId(payload);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async checkName({ commit }, payload) {
    try {
      const response = await point.checkName(payload);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async checkEmail({ commit }, payload) {
    try {
      const response = await point.checkEmail(payload);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async profile({ commit }, payload) {
    const response = await point.profile(payload);

    const { accessToken } = response.data;

    commit(SET_ACCESS_TOKEN, accessToken);

    const me = await point.me({ accessToken });

    const { user2 } = me.data;

    commit(SET_USER, user2);
  }
};
