import 'es6-promise/auto';

import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import Cookies from 'js-cookie';
import { Plugin } from 'vue-fragment';
import _ from 'lodash';

import '@/components/unit/button/button.js';
import '@/components/unit/heading/heading.js';

import { validate, transport } from './functions';

Vue.config.productionTip = false;

Vue.use(Plugin);

Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.prototype.$validate = validate;

Vue.prototype.$transport = transport;

const initialize = () => {
  const accessToken = Cookies.get('accessToken');

  if (accessToken) {
    return store.dispatch('token', { accessToken });
  } else {
    return Promise.resolve();
  }
};

initialize().then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app');
});
