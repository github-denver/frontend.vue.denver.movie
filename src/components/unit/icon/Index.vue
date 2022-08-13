<template>
  <span :class="['icon_common', attributes.className]">{{ attributes.text }}</span>
</template>

<script>
export default {
  name: 'Icon',
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
/* icon_common
---------- ---------- ---------- ---------- ---------- */
.icon_common {
  display: block;
  font-size: 0.1rem;
  line-height: 0;
  color: transparent;
  text-indent: -999.9rem;
}

/* circle */
.icon_common.circle {
  border-radius: 100%;
}

/* icon_normal
---------- ---------- ---------- ---------- ---------- */
.icon_normal {
  width: 1.4rem;
  height: 1.4rem;
  background-color: #ff0000;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
