<template>
  <div :class="['thumbnail_common', attributes.className]">
    <img :src="`${getBaseURL}/${getUploadFolderName}/${attributes.image.url}`" alt="" class="image_common" />
    <img src="~@/assets/images/common/bg_visual.png" alt="" class="image_shadow" v-if="!!attributes.shadow" />
    <span class="gradation" v-if="!!attributes.gradation"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Thumbnail',
  props: {
    attributes: {
      type: Object,
      default() {
        return {
          shadow: false
        };
      }
    },
    styles: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  }
};
</script>

<style scoped>
/* thumbnail_common
---------- ---------- ---------- ---------- ---------- */
.thumbnail_common {
  position: relative;
}

.thumbnail_common .image_common {
  width: 100%;
}

.thumbnail_common .image_shadow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: linear-gradient(to top, rgb(0, 0, 0) 0, rgba(0, 0, 0, 0) 100%);
  content: '';
}

.thumbnail_common .gradation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(to top, rgb(0, 0, 0) 0, rgba(0, 0, 0, 0) 100%);
  content: '';
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
