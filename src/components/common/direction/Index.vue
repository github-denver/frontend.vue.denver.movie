<template>
  <div :class="['direction_common', attributes.arrows === 'vertical' ? 'vertical' : null]">
    <a href="javascript:;" class="link_direction link_previous">
      <Icon :attributes="{ className: 'icon_previous', text: '이전' }" />
    </a>

    <a href="javascript:;" class="link_direction link_future">
      <Icon :attributes="{ className: 'icon_future', text: '다음' }" />
    </a>
  </div>
</template>

<script>
import Icon from '@/components/unit/icon/Index.vue';

export default {
  name: 'Direction',
  components: { Icon },
  props: {
    attributes: {
      type: Object,
      default() {
        return { arrows: null };
      }
    },
    styles: {
      type: Object
    }
  }
};
</script>

<style scoped>
/* direction_common
---------- ---------- ---------- ---------- ---------- */
.direction_common .link_direction {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 4.8rem;
  height: 4.8rem;
  margin-top: -2.6rem;
  -webkit-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.direction_common .link_direction .icon_common {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  margin: -1.5rem auto 0;
}

.direction_common .link_previous {
  left: 0;
}

.direction_common .link_future {
  right: 0;
}

.direction_common .slick-disabled {
  opacity: 0;
  pointer-events: none;
}

/* vertical */
.direction_common.vertical .link_direction {
  top: 0;
  bottom: 0;
  height: auto;
  margin-top: 0;
  background-color: #000;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
