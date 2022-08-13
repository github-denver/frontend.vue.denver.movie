<template>
  <div :class="['information_common', attributes.className]" :style="styles">
    <strong class="title_common">{{ attributes.subject }}</strong>
    <p class="description_common">{{ attributes.description }}</p>

    <slot name="children"></slot>
  </div>
</template>

<script>
export default {
  name: 'Information',
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
/* information_common
---------- ---------- ---------- ---------- ---------- */
.information_common .title_common {
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.information_common .description_common {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
