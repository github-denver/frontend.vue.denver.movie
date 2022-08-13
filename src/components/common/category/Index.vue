<template>
  <div class="category_common">
    <ul class="list_category">
      <li>
        <Button
          :attributes="{
            className: 'link_category regular round pure thick active',
            event: (event) => {
              handleCategory(event, { keyword: '' });
            }
          }"
        >
          <template v-slot:children>
            <span class="text_local">전체</span>
          </template>
        </Button>
      </li>
      <li>
        <Button
          :attributes="{
            className: 'link_category regular round pure thick',
            event: (event) => {
              handleCategory(event, { keyword: 0 });
            }
          }"
        >
          <template v-slot:children>
            <span class="text_local">SF 영화</span>
          </template>
        </Button>
      </li>
      <li>
        <Button
          :attributes="{
            className: 'link_category regular round pure thick',
            event: (event) => {
              handleCategory(event, { keyword: 1 });
            }
          }"
        >
          <template v-slot:children>
            <span class="text_local">코미디</span>
          </template>
        </Button>
      </li>
      <li>
        <Button
          :attributes="{
            className: 'link_category regular round pure thick',
            event: (event) => {
              handleCategory(event, { keyword: 2 });
            }
          }"
        >
          <template v-slot:children>
            <span class="text_local">액션 &amp; 어드벤처</span>
          </template>
        </Button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Button from '@/components/unit/button/Index.vue';

export default {
  name: 'Category',
  components: { Button },
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
  methods: {
    ...mapActions(['fetchCategory']),
    handleCategory(event, payload) {
      const { keyword } = payload;

      const parentElement = event.currentTarget.parentElement;

      if (parentElement.children[0].className.indexOf('active') > -1) return;

      for (let i = 0; i < parentElement.parentElement.children.length; i++) {
        parentElement.parentElement.children[i].children[0].classList.remove('active');
      }

      parentElement.children[0].classList.add('active');

      this.fetchCategory({
        category: this.attributes.category,
        number: 1,
        select: 'genre',
        keyword
      });
    }
  }
};
</script>

<style scoped>
/* category_common
  ---------- ---------- ---------- ---------- ---------- */
.category_common {
  display: inline-block;
  vertical-align: middle;
}

/* list_category
---------- ---------- ---------- ---------- ---------- */
.list_category {
  display: inline-block;
  margin: -0.6rem 0 0 -0.6rem;
  font-size: 0;
  vertical-align: middle;
}

.list_category:first-child {
  padding-left: 0;
}

.list_category li {
  display: inline-block;
  margin: 0.6rem 0 0 0.6rem;
  vertical-align: top;
}

.list_category .link_category {
  overflow: hidden;
  display: block;
  padding: 1.2rem 2.4rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* category_common
  ---------- ---------- ---------- ---------- ---------- */
  .category_common {
    overflow: auto;
    white-space: nowrap;
  }
}
</style>
