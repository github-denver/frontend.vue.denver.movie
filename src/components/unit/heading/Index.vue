<template>
  <div :class="['heading_common', attributes.invisible && 'accessibility']">
    <slot name="signature"></slot>

    <heading-component :attributes="{ tagName: properties.tagName, invisible: properties.invisible, className: `${properties.className} ${properties.size}` }">
      <slot name="subject"></slot>
    </heading-component>
  </div>
</template>

<script>
export default {
  name: 'Heading',
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
  data() {
    return {
      properties: {
        tagName: 'strong',
        className: 'title_common',
        size: 'regular',
        invisible: false
      },
      slot: false
    };
  },
  created() {
    this.$_.merge(this.properties, this.attributes);
  },
  mounted() {
    this.slot = this.$slots.children;
  }
};
</script>

<style scoped>
/* heading_common
---------- ---------- ---------- ---------- ---------- */
.heading_common {
  display: inline-block;
  vertical-align: middle;
}

.heading_common .title_common {
  display: inline-block;
  position: relative;
  z-index: 1;
  vertical-align: middle;
}

.heading_common .image_signature + .title_common {
  display: none;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* heading_common
---------- ---------- ---------- ---------- ---------- */
.heading_common :deep() + .category_common {
  display: block;
  padding-top: 1.2rem;
}

.heading_common .title_common :deep(.text_local) {
  display: inline-block;
  vertical-align: middle;
}

.heading_common .title_common :deep(.text_local:only-child) {
  display: block;
}

.heading_common :deep() + .description_common {
  margin-top: 1.2rem;
}

/* medium */
.heading_common .title_common.medium :deep(.text_local) {
  font-size: 1.4rem;
}

/* large */
.heading_common .title_common.large :deep(.text_local) {
  font-size: 2.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* heading_common
  ---------- ---------- ---------- ---------- ---------- */
  .heading_common {
    margin: 0.2rem 0 0 1.2rem;
  }

  .heading_common .image_signature + .title_common {
    display: block;
  }

  /* large */
  .heading_common .title_common.large :deep(.text_local) {
    font-size: 1.6rem;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* heading_common
  ---------- ---------- ---------- ---------- ---------- */
  .heading_common :deep() + .category_common {
    margin: 0 -2.4rem;
    padding: 1.2rem 2.4rem;
  }
}
</style>
