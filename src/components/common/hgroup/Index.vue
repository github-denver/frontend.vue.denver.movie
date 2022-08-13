<template>
  <div class="hgroup_common" v-if="attributes.half">
    <Half :attributes="{ className: { inner: {} } }" :styles="{ inner: {} }">
      <template v-slot:first>
        <Heading
          :attributes="{
            tagName: attributes.heading.tagName,
            className: attributes.heading.className,
            size: attributes.heading.size
          }"
        >
          <template v-slot:subject>
            <span class="text_local">{{ attributes.heading.subject }}</span>
          </template>
        </Heading>

        <slot name="category"></slot>
      </template>

      <template v-slot:second>
        <slot name="indicator"></slot>

        <router-link :to="{ name: 'main' }" class="link_common">
          <span class="text_local">더 보기</span>
          <Icon :attributes="{ className: '' }" />
        </router-link>
      </template>
    </Half>
  </div>

  <div class="hgroup_common" v-else>
    <Heading :attributes="{ tagName: attributes.heading.tagName, className: attributes.heading.className, size: attributes.heading.size }">
      <template v-slot:subject>
        <span class="text_local">{{ attributes.heading.subject }}</span>
      </template>
    </Heading>

    <slot name="category"></slot>
    <slot name="description"></slot>
  </div>
</template>

<script>
import Icon from '@/components/unit/icon/Index.vue';
import Half from '@/components/unit/half/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';

export default {
  name: 'Hgroup',
  components: { Icon, Half, Heading },
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
/* hgroup_common
---------- ---------- ---------- ---------- ---------- */
.hgroup_common {
  position: relative;
  z-index: 1;
  margin: 0 4.8rem;
}

.hgroup_common .link_common {
  display: inline-block;
  vertical-align: middle;
}

.hgroup_common .link_common .text_local {
  display: inline-block;
  font-size: 1.2rem;
  vertical-align: middle;
}

.hgroup_common ~ .group_common {
  margin-top: 2.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* hgroup_common
---------- ---------- ---------- ---------- ---------- */
.hgroup_common .link_common .text_local + :deep(.icon_common) {
  margin-left: 0.6rem;
}

.hgroup_common .link_common :deep(.icon_common) {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.hgroup_common :deep(.indicator_common) {
  display: inline-block;
  vertical-align: middle;
}

.hgroup_common :deep(.indicator_common + .link_common) {
  margin-left: 1.2rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* hgroup_common
  ---------- ---------- ---------- ---------- ---------- */
  .hgroup_common {
    margin: 0 2.4rem;
  }

  .hgroup_common :deep(.indicator_common) {
    padding: 0.3rem 0;
  }
}
</style>
