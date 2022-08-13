<template>
  <div :class="['picture_common', attributes.className]">
    <div class="circle_common">
      <Cell v-if="attributes.authorized || attributes.images">
        <template v-slot:children>
          <img v-if="attributes.images" :src="`${attributes.images}`" class="image_common" alt="" />
          <img v-else :src="`${getBaseURL}/${getUploadFolderName}/${user.picture}`" class="image_common" alt="" />
        </template>
      </Cell>

      <Cell v-else>
        <template v-slot:children>
          <img :src="`${getBaseURL}/${getUploadFolderName}/default_picture.png`" class="image_common" alt="" />
        </template>
      </Cell>
    </div>

    <slot name="upload"></slot>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Cell from '@/components/unit/cell/Index.vue';

export default {
  name: 'Picture',
  components: { Cell },
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
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  }
};
</script>

<style scoped>
/* picture_common
---------- ---------- ---------- ---------- ---------- */
.picture_common {
  position: relative;
  width: 9.6rem;
  height: 9.6rem;
  margin: 2.4rem auto;
}

.picture_common .upload_common {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}

/* circle_common
---------- ---------- ---------- ---------- ---------- */
.circle_common {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.circle_common .cell_common {
  height: 100%;
}

.circle_common .image_common {
  width: 100%;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
