<template>
  <div :class="['menu_common', visible.menu ? 'active' : null]">
    <Button
      :attributes="{
        className: 'small round thick',
        event: () => {
          handleVisible({ name: 'menu', value: !visible.menu });
        }
      }"
    >
      <template v-slot:children>
        <span class="text_local">{{ visible.menu ? '지역메뉴 닫기' : '지역메뉴 열기' }} </span>
      </template>
    </Button>

    <div class="inner_menu">
      <Heading :attributes="{ tagName: attributes.heading.tagName, size: attributes.heading.size }">
        <template v-slot:subject>
          <span class="text_local">{{ attributes.heading.subject }}</span>
        </template>
      </Heading>

      <ul class="list_menu">
        <li>
          <router-link
            :to="{
              name: 'list',
              params: {
                service: 'notice',
                number: '1'
              }
            }"
            class="link_menu"
          >
            <span class="text_menu">공지사항</span>
          </router-link>
        </li>
      </ul>

      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/unit/heading/Index.vue';
import Button from '@/components/unit/button/Index.vue';

export default {
  name: 'Menu',
  components: { Heading, Button },
  props: {
    attributes: {
      type: Object,
      default() {
        return {};
      }
    },
    styles: {
      type: Object
    }
  },
  data() {
    return {
      visible: {
        menu: false
      }
    };
  },
  methods: {
    handleVisible(payload) {
      this.visible[payload.name] = payload.value;
    }
  }
};
</script>

<style scoped>
/* menu_common
---------- ---------- ---------- ---------- ---------- */
.menu_common {
  padding: 2.4rem;
  box-sizing: border-box;
}

.menu_common .button_common:first-child {
  display: none;
}

.menu_common .inner_menu {
  box-sizing: border-box;
}

.menu_common .list_menu {
  margin-top: 1.6rem;
}

.menu_common .list_menu:first-child {
  margin-top: 0;
}

/* list_menu
---------- ---------- ---------- ---------- ---------- */
.list_menu {
  font-size: 0;
}

.list_menu li {
  margin-top: 0.6rem;
}

.list_menu li:first-child {
  margin-top: -0.6rem;
}

.list_menu .text_menu {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: middle;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* menu_common
---------- ---------- ---------- ---------- ---------- */
  .menu_common {
    padding: 0;
    background-color: #0f223c;
  }

  .menu_common .button_common:first-child {
    display: inline-block;
    margin: 1.2rem;
  }

  .menu_common .inner_menu {
    display: none;
    overflow: auto;
    height: 13rem;
    padding: 1.2rem 2.4rem;
    background-color: #122947;
    text-align: left;
  }

  /* active */
  .menu_common.active {
    background-color: #122947;
  }

  .menu_common.active .inner_menu {
    display: block;
    background-color: #0f223c;
  }
}
</style>
