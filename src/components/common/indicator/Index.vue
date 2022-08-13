<template>
  <div class="indicator_common"></div>
</template>

<script>
export default {
  name: 'Indicator'
};
</script>

<style scoped>
/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* indicator_common
---------- ---------- ---------- ---------- ---------- */
.indicator_common :deep(.slick-dots) {
  position: static;
  bottom: 0;
  width: auto;
  margin-left: -0.4rem;
  font-size: 0;
}

.indicator_common :deep(.slick-dots li) {
  width: auto;
  height: auto;
  margin: 0 0 0 0.4rem;
  padding: 0.4rem 0;
}

.indicator_common :deep(.link_pagination) {
  display: inline-block;
  overflow: hidden;
  width: 1.2rem;
  height: 0.4rem;
  font-size: 0.1rem;
  line-height: 0;
  color: transparent;
  background-color: #1b3c69;
  -webkit-transform: skewx(-30deg);
  -ms-transform: skewx(-30deg);
  -moz-transform: skewx(-30deg);
  -o-transform: skewx(-30deg);
  transform: skewx(-30deg);
}

.indicator_common :deep(.slick-active .link_pagination) {
  background-color: #fff;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
