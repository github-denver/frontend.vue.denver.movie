import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const original_replace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(location) {
  return original_replace.call(this, location).catch((error) => {
    if (error.name !== 'NavigationDuplicated') {
      console.error(error);

      throw error;
    }
  });
};

const original_push = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return original_push.call(this, location).catch((error) => {
    if (error.name !== 'NavigationDuplicated') {
      console.error(error);

      throw error;
    }
  });
};

const routes = [
  {
    path: '/board/:service/read/:number',
    name: 'read',
    components: {
      default: () => import(/* webpackChunkName: "read" */ '@/views/board/read/Index.vue')
    },
    props: {
      default: true
    }
  },
  {
    path: '/board/:service/list/:number',
    name: 'list',
    components: {
      default: () => import(/* webpackChunkName: "list" */ '@/views/board/list/Index.vue')
    },
    props: {
      default: true
    }
  },
  {
    path: '/member/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/member/profile/Index.vue'),
    beforeEnter(to, from, next) {
      const { isUserLoggedIn } = store.getters;

      if (!isUserLoggedIn) {
        alert('로그인 안 한 상태에서는 접근할 수 없습니다.');

        next({ name: 'main' });
      }

      next();
    }
  },
  {
    path: '/member/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/member/login/Index.vue'),
    beforeEnter(to, from, next) {
      const { isUserLoggedIn } = store.getters;

      if (isUserLoggedIn) {
        alert('로그인한 상태에서는 접근할 수 없습니다.');

        next({ name: 'main' });
      }

      next();
    }
  },
  {
    path: '/member/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/member/register/Index.vue'),
    beforeEnter(to, from, next) {
      const { isUserLoggedIn } = store.getters;

      if (isUserLoggedIn) {
        alert('로그인한 상태에서는 접근할 수 없습니다.');

        next({ name: 'main' });
      }

      next();
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search/Index.vue'),
    props: {
      default: true
    }
  },
  {
    path: '/finder',
    name: 'finder',
    component: () => import(/* webpackChunkName: "finder" */ '@/views/finder/Index.vue'),
    props: {
      default: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/Index.vue'),
    props: {
      default: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
