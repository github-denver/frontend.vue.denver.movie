<template>
  <ul class="location_common">
    <li>
      <router-link :to="{ name: 'main' }" class="link_location">-</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'main' }" class="link_location">-</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Location',
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
/* location_common
---------- ---------- ---------- ---------- ---------- */
.location_common {
  overflow: hidden;
  display: none;
  font-size: 0;
  background-color: #122947;
}

.location_common li {
  display: inline-block;
  vertical-align: middle;
}

.location_common .link_location {
  display: inline-block;
  padding: 1.2rem;
  font-size: 1.2rem;
  vertical-align: middle;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* location_common
  ---------- ---------- ---------- ---------- ---------- */
  .location_common {
    padding: 0 1.2rem;
  }

  .location_common .link_location {
    padding: 1.2rem;
  }
}
</style>
