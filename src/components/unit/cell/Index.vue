<template>
  <div class="outer_cell" :style="styles">
    <div class="inner_cell">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cell',
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
/* outer_cell
---------- ---------- ---------- ---------- ---------- */
.outer_cell {
  display: table;
  width: 100%;
  box-sizing: border-box;
}

.outer_cell .inner_cell {
  display: table-cell;
  box-sizing: border-box;
  vertical-align: middle;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
