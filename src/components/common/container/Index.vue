<template>
  <section class="container">
    <slot name="children"></slot>
  </section>
</template>

<script>
export default {
  name: 'Container',
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
  }
};
</script>

<style scoped>
/* container
---------- ---------- ---------- ---------- ---------- */
.container {
  position: relative;
}

.container:after {
  display: block;
  clear: both;
  content: '';
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* container
  ---------- ---------- ---------- ---------- ---------- */
  .container {
    padding: 5.4rem 0;
  }
}
</style>
