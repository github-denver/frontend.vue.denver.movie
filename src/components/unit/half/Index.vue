<template>
  <div :class="['outer_half', attributes.className.outer ? attributes.className.outer : '']">
    <div :class="['inner_half', attributes.className.inner.first ? attributes.className.inner.first : '']" :style="styles.inner.first ? styles.inner.first : ''">
      <slot name="first"></slot>
    </div>

    <div :class="['inner_half', attributes.className.inner.second ? attributes.className.inner.second : '']" :style="styles.inner.second ? styles.inner.second : ''">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Half',
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
/* outer_half
---------- ---------- ---------- ---------- ---------- */
.outer_half {
  font-size: 0;
}

.outer_half .inner_half {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  text-align: right;
  vertical-align: middle;
}

.outer_half .inner_half:first-child {
  text-align: left;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
