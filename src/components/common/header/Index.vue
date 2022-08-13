<template>
  <header class="header" :style="styles">
    <Cell>
      <template v-slot:children>
        <Half :attributes="{ className: { inner: {} } }" :styles="{ inner: { first: {} } }">
          <template v-slot:first>
            <Heading :attributes="{ tagName: 'h1', className: 'title_brand' }">
              <template v-slot:subject>
                <router-link :to="{ name: 'main' }" class="link_brand">덴버무비</router-link>
              </template>
            </Heading>

            <slot name="first"></slot>
          </template>

          <template v-slot:second>
            <slot name="second"></slot>
          </template>
        </Half>
      </template>
    </Cell>
  </header>
</template>

<script>
import Cell from '@/components/unit/cell/Index.vue';
import Half from '@/components/unit/half/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';

export default {
  name: 'Header',
  components: { Cell, Half, Heading },
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
  mounted() {
    const header = document.querySelector('.header');

    document.addEventListener('scroll', function () {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > header.offsetHeight) {
        if (!header.classList.contains('active')) header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    });
  }
};
</script>

<style scoped>
/* header
---------- ---------- ---------- ---------- ---------- */
.header {
  position: static;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  padding: 0 4.8rem;
  -webkit-transition: background-color 0.4s;
  -moz-transition: background-color 0.4s;
  -o-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

.header .outer_cell {
  height: 6.4rem;
}

.header .link_brand {
  display: block;
  font-size: 2.4rem;
}

/* active */
.header.active {
  position: fixed;
  background-color: #1b3c69;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* header
  ---------- ---------- ---------- ---------- ---------- */
  .header {
    padding: 1.2rem;
    background-color: #1b3c69;
  }

  .header .outer_cell {
    height: auto;
  }

  .header .link_brand {
    display: inline-block;
    font-size: 1.6rem;
    vertical-align: middle;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* header
  ---------- ---------- ---------- ---------- ---------- */
  .header :deep(.outer_half) {
    margin-left: -1.2rem;
  }

  .header :deep(.outer_half .inner_half) {
    width: 37.5%;
    padding-left: 1.2rem;
  }

  .header :deep(.outer_half .inner_half:first-child) {
    width: 62.5%;
  }
}
</style>
