<template>
  <router-link
    v-if="properties.tagName === 'router-link'"
    :to="{
      name: properties.name,
      params: {
        service: properties.params.service,
        number: properties.params.number
      },
      query: {
        select: properties.query.select,
        keyword: properties.query.keyword,
        page: properties.query.page
      }
    }"
    :class="['button_common', properties.className]"
  >
    <slot name="children" v-if="!!slot"></slot>
    <span class="text_local" v-else>{{ properties.text }}</span>
  </router-link>

  <button-component
    v-else
    :attributes="{
      tagName: properties.tagName,
      type: properties.type,
      className: properties.className,
      event: properties.event
    }"
  >
    <slot name="children" v-if="!!slot"></slot>
    <span class="text_local" v-else>{{ properties.text }}</span>
  </button-component>
</template>

<script>
export default {
  name: 'Button',
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
        tagName: 'button',
        type: 'button',
        select: null,
        keyword: null
      },
      slot: false
    };
  },
  created() {
    this.$_.assign(this.properties, this.attributes);
  },
  mounted() {
    this.slot = this.$slots.children;
  }
};
</script>

<style scoped>
/* button_common
---------- ---------- ---------- ---------- ---------- */
.button_common {
  display: inline-block;
  border: 0 none;
  box-sizing: border-box;
  line-height: 1;
  text-align: center;
  background-color: transparent;
  vertical-align: middle;
  cursor: pointer;
}

.button_common .text_local {
  display: inline-block;
  font-size: 1.2rem;
  vertical-align: middle;
}

.button_common .text_local:only-child {
  vertical-align: top;
}

/* round */
.button_common.round {
  border-radius: 0.6rem;
}

/* thin */
.button_common.thin {
  border-width: 0.1rem;
  border-style: solid;
}

/* thick */
.button_common.thick {
  border-width: 0.2rem;
  border-style: solid;
}

.button_common.regular.thick {
  padding: 1.3rem 3.7rem;
}

/* small */
.button_common.small {
  padding: 0.6rem 1.2rem;
}

.button_common.small .text_local {
  font-size: 1.2rem;
}

/* regular */
.button_common.regular {
  padding: 1.5rem 3.9rem;
}

.button_common.regular .text_local {
  font-size: 1.4rem;
}

/* max */
.button_common.max {
  width: 100%;
}

/* circle */
.button_common.circle {
  border-radius: 100%;
}

/* normal */
.button_common.normal {
  background-color: #fff;
}

/* pure */
.button_common.pure {
  background-color: transparent;
}

.button_common.pure.thick {
  border-color: #1b3c69;
}

/* active */
.button_common.active {
  border-color: #1b3c69;
  background-color: #1b3c69;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* button_common
---------- ---------- ---------- ---------- ---------- */
.button_common :deep(.text_local) {
  font-weight: 400;
}

.button_common :deep(.text_local + .icon_common) {
  margin-left: 1.2rem;
}

.button_common :deep(.icon_common) {
  display: inline-block;
  vertical-align: middle;
}

/* regular */
.button_common.regular :deep(.text_local) {
  font-size: 1.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* button
  ---------- ---------- ---------- ---------- ---------- */
  /* thick */
  /* .button_common.regular.thick {
    padding: 0.8rem 1.6rem;
  } */

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* regular */
  .button_common.regular :deep(.text_local) {
    font-size: 1.2rem;
  }
}
</style>
