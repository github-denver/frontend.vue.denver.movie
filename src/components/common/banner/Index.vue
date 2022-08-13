<template>
  <div class="banner_common">
    <img :src="`${getBaseURL}/${getUploadFolderName}/image_banner.png`" alt="" class="image_banner" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Banner',
  computed: {
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  }
};
</script>

<style scoped>
/* banner_common
---------- ---------- ---------- ---------- ---------- */
.banner_common {
  display: none;
}

.banner_common .image_banner {
  width: 100%;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
