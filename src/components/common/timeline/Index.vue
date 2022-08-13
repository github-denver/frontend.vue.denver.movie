<template>
  <div class="timeline_common">
    <div class="list_timeline">
      <div class="box_timeline" v-for="(list, index) in timeline.list" :key="index">
        <a href="javascript:;" class="link_timeline">
          <Cell>
            <template v-slot:children>
              <Half :attributes="{ className: { outer: '', inner: {} } }" :styles="{ inner: { first: {} } }">
                <template v-slot:first>
                  <span class="text_timeline">{{ list.time }}</span>
                </template>

                <template v-slot:second>
                  <span class="circle_timeline">on</span>

                  <div class="information_timeline">
                    <strong class="title_timeline">{{ list.subject }}</strong>
                    <p class="text_timeline">{{ list.episode }}</p>
                  </div>
                </template>
              </Half>
            </template>
          </Cell>
        </a>
      </div>
      <!-- // box_timeline -->
    </div>
    <!-- // list_timeline -->

    <div class="direction_promotion">
      <a href="javascript:;" class="link_direction link_previous">
        <Icon :attributes="{ className: 'icon_previous', text: '이전' }" />
      </a>
      <a href="javascript:;" class="link_direction link_future">
        <Icon :attributes="{ className: 'icon_future', text: '다음' }" />
      </a>
    </div>
    <!-- // direction_promotion -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Icon from '@/components/unit/icon/Index.vue';
import Cell from '@/components/unit/cell/Index.vue';
import Half from '@/components/unit/half/Index.vue';

export default {
  name: 'Timeline',
  components: { Icon, Cell, Half },
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
    ...mapState(['timeline'])
  },
  updated() {
    const $ = window.$;

    $(`.timeline_common .list_timeline`)
      .not('.slick-initialized')
      .slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        autoplay: false,
        autoplaySpeed: 4000,
        appendDots: $('.timeline_common .indicator_common'),
        appendArrows: $('.timeline_common .direction_common'),
        prevArrow: $('.timeline_common .direction_common .link_previous'),
        nextArrow: $('.timeline_common .direction_common .link_future'),
        dots: true,
        customPaging: function (slider, i) {
          return '<a href="javascript:;" class="link_pagination" >' + i + '</a>';
        }
      });
  }
};
</script>

<style scoped>
.timeline_common {
  position: relative;
}

/* list_timeline
---------- ---------- ---------- ---------- ---------- */
.list_timeline {
  font-size: 0;
  background-color: #0f223c;
}

.list_timeline .box_timeline {
  display: inline-block;
  vertical-align: middle;
}

.list_timeline .box_timeline.slick-current {
  background-color: #122947;
}

.list_timeline .link_timeline {
  display: block;
}

.list_timeline .text_timeline {
  display: block;
}

.list_timeline .circle_timeline {
  display: inline-block;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 100%;
  background-color: #fff;
  vertical-align: middle;
}

.list_timeline .circle_timeline + .information_timeline {
  padding-left: 2.4rem;
}

.list_timeline .title_timeline {
  font-weight: 400;
  font-size: 1.4rem;
}

.list_timeline .title_timeline + .text_timeline {
  margin-top: 0.2rem;
}

.list_timeline .text_timeline {
  font-size: 1.2rem;
}

/* slick-slider */
.list_timeline.slick-slider {
  margin-bottom: 0;
}

/* information_timeline
---------- ---------- ---------- ---------- ---------- */
.information_timeline {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

/* direction_promotion
---------- ---------- ---------- ---------- ---------- */
.direction_promotion .link_direction {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 4.8rem;
  height: 100%;
  margin-top: auto;
  background-color: #333;
  background-color: rgba(0, 0, 0, 0.8);
}

.direction_promotion .link_previous {
  left: 0;
}

.direction_promotion .link_future {
  right: 0;
}

.direction_promotion .link_direction .icon_common {
  position: absolute;
  top: 50%;
  color: transparent;
}

.direction_promotion .link_direction .icon_previous {
  left: 50%;
  margin-left: -0.2rem;
}

.direction_promotion .link_direction .icon_future {
  right: 50%;
  margin-right: -0.2rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* list_timeline */
.list_timeline :deep(.link_timeline .cell_common) {
  height: 6.8rem;
}

.list_timeline :deep(.link_timeline .inner_half:first-child) {
  padding: 0 2.4rem;
}

.list_timeline :deep(.link_timeline .inner_half) {
  width: auto;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
