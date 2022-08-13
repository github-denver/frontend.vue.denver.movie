<template>
  <nav class="navigation_common">
    <Heading :attributes="{ tagName: 'h2', invisible: true }">
      <template v-slot:subject>
        <span class="text_local">전체 메뉴</span>
      </template>
    </Heading>

    <Button
      :attributes="{
        className: '',
        event: () => {
          handleBurger({ name: 'navigation', value: true });
        }
      }"
    >
      <template v-slot:children>
        <span class="icon_common icon_burger">주메뉴 열기</span>
      </template>
    </Button>

    <div :class="['inner_navigation', visible.navigation ? 'active' : null]" v-if="visible.navigation">
      <div class="profile_common">
        <Picture :attributes="{ authorized: isUserLoggedIn }" />

        <router-link :to="{ name: 'profile' }" class="text_picture" v-if="user.name">{{ user.name }}</router-link>
        <router-link :to="{ name: 'login' }" class="text_picture" v-else>로그인해 주세요.</router-link>
      </div>

      <strong class="title_navigation">주 서비스</strong>
      <ul class="list_navigation">
        <li v-for="(list, index) in navigation" :key="index">
          <router-link :to="{ path: list.url }" class="link_navigation">{{ list.subject }}</router-link>
        </li>
      </ul>

      <Button
        :attributes="{
          className: '',
          event: () => {
            handleBurger({ name: 'navigation', value: false });
          }
        }"
      >
        <template v-slot:children>
          <span class="icon_common icon_cross">주메뉴 닫기</span>
        </template>
      </Button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Heading from '@/components/unit/heading/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Picture from '@/components/common/picture/Index.vue';

export default {
  name: 'Navigation',
  components: { Heading, Button, Picture },
  data() {
    return {
      visible: {
        navigation: false
      }
    };
  },
  created() {
    this.fetchNavigation();
  },
  mounted() {
    const $ = window.$;
    const that = this;

    var scrollbar = function () {
      var $d1 = $('<div class="inner_scrollbar"></div>'),
        $d2 = $('<div class="outer_scrollbar"></div>').append($d1),
        e1 = $d1[0],
        e2 = $d2[0],
        w1,
        w2;
      $('body').append(e2);
      w1 = e1.offsetWidth;
      $d2.css({ 'overflow-y': 'scroll' });
      w2 = e2.clientWidth;
      $d2.remove();
      return w1 - w2;
    };

    function resizing() {
      if ($(window).width() + scrollbar() >= 1024) {
        that.visible.navigation = true;
      } else if ($(window).width() + scrollbar() <= 1023) {
        that.visible.navigation = false;
      }
    }

    resizing();

    $(window).on('resize', function () {
      if (this.resizeTO) {
        clearTimeout(this.resizeTO);
      }
      this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
      }, 400);
    });

    $(window).on('resizeEnd', function () {
      resizing();
    });
  },
  computed: {
    ...mapState(['user', 'navigation']),
    ...mapGetters(['isUserLoggedIn'])
  },
  methods: {
    ...mapActions(['fetchNavigation']),
    handleBurger(payload) {
      this.visible[payload.name] = payload.value;
    }
  }
};
</script>

<style scoped>
/* navigation_common
---------- ---------- ---------- ---------- ---------- */
.navigation_common {
  display: inline-block;
  vertical-align: middle;
}

.navigation_common .button_common {
  display: none;
}

.navigation_common .profile_common {
  display: none;
}

/* list_navigation
---------- ---------- ---------- ---------- ---------- */
.list_navigation {
  margin-left: -1.2rem;
  font-size: 0;
}

.list_navigation li {
  display: inline-block;
  margin-left: 1.2rem;
  vertical-align: top;
}

.list_navigation .link_navigation {
  display: block;
  font-weight: 500;
  font-size: 1.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* navigation_common
  ---------- ---------- ---------- ---------- ---------- */
  .navigation_common {
    float: left;
  }

  .navigation_common .button_common {
    display: block;
    width: 3rem;
    height: 3rem;
  }

  .navigation_common .profile_common {
    display: block;
  }

  .navigation_common .inner_navigation {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    margin: 0 -0.1rem -0.1rem;
    background-color: #0a1625;
  }

  .navigation_common .inner_navigation .title_navigation {
    display: block;
    margin-top: 1.2rem;
    padding: 1.4rem 1.4rem;
    border-top: 1px solid #1b3c69;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: #122947;
  }

  .navigation_common .inner_navigation .button_common {
    position: absolute;
    top: 2.5rem;
    right: 1.4rem;
    z-index: 1;
  }

  /* profile_common
  ---------- ---------- ---------- ---------- ---------- */
  .profile_common {
    padding: 1.4rem 1.4rem 1.4rem 1.4rem;
    border-top: 1px solid #1b3c69;
    border-bottom: 1px solid #1b3c69;
    box-sizing: border-box;
    background-color: #0f223c;
  }

  .profile_common .picture_common {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    margin: 0;
    vertical-align: middle;
  }

  .profile_common .text_picture {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1.4rem;
    vertical-align: middle;
  }

  /* list_navigation
  ---------- ---------- ---------- ---------- ---------- */
  .list_navigation {
    position: relative;
    border-top: 0.1rem solid #1b3c69;
    background-color: #0f223c;
  }

  .list_navigation:before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border-top: 0.1rem solid #1b3c69;
    content: '';
  }

  .list_navigation li {
    position: relative;
    width: 50%;
    margin: -0.1rem 0 0 0;
    border: 0.1rem solid #1b3c69;
    box-sizing: border-box;
  }

  .list_navigation li:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -0.1rem;
    border-left: 0.1rem solid #1b3c69;
    content: '';
  }

  .list_navigation .link_navigation {
    display: block;
    padding: 1rem 0;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
