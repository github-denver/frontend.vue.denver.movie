<template>
  <article :class="['card_common', attributes.category]">
    <Hgroup :attributes="{ heading: attributes.heading, half: true }">
      <template v-slot:category>
        <slot name="category"></slot>
      </template>

      <template v-slot:indicator>
        <Indicator />
      </template>
    </Hgroup>

    <div :class="['carousel_common', attributes.category]">
      <div class="box_carousel" v-for="(list, index) in popular" :key="index">
        <a href="javascript:;" class="link_carousel" @click="handleRouter(list.number)">
          <Thumbnail :attributes="{ image: { url: list.poster } }" />
        </a>

        <Information :attributes="{ subject: list.subject, description: list.content }" />
      </div>
    </div>

    <Direction :attributes="{ arrows: 'vertical' }" />
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Hgroup from '@/components/common/hgroup/Index.vue';
import Thumbnail from '@/components/common/thumbnail/Index.vue';
import Information from '@/components/common/information/Index.vue';
import Indicator from '@/components/common/indicator/Index.vue';
import Direction from '@/components/common/direction/Index.vue';

export default {
  name: 'Card',
  components: { Hgroup, Thumbnail, Information, Indicator, Direction },
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
  created() {
    this.fetchPopular({
      category: this.attributes.category,
      number: 1
    });
  },
  beforeUpdate() {
    const $ = window.$;

    if ($(`.card_common.${this.attributes.category} .carousel_common`).hasClass('slick-initialized')) {
      $(`.card_common.${this.attributes.category} .carousel_common`).slick('unslick');
    }
  },
  updated() {
    const $ = window.$;

    $(`.card_common.${this.attributes.category} .carousel_common`)
      .not('.slick-initialized')
      .slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ],
        autoplay: false,
        autoplaySpeed: 4000,
        appendDots: $(`.card_common.${this.attributes.category} .indicator_common`),
        appendArrows: $(`.card_common.${this.attributes.category} .direction_common`),
        prevArrow: $(`.card_common.${this.attributes.category} .direction_common .link_previous`),
        nextArrow: $(`.card_common.${this.attributes.category} .direction_common .link_future`),
        dots: true,
        customPaging: function (slider, i) {
          return '<a href="javascript:;" class="link_pagination" >' + i + '</a>';
        }
      });
  },
  computed: {
    ...mapState({
      popular: (state) => state.popular
    })
  },
  methods: {
    ...mapActions(['fetchPopular', 'fetchCategory']),
    handleRouter(number) {
      this.$router.push({
        query: {
          category: 'promotion',
          layer: 'episode',
          number
        }
      });
    }
  }
};
</script>

<style scoped>
/* card_common
---------- ---------- ---------- ---------- ---------- */
.card_common {
  position: relative;
}

.card_common .carousel_common {
  margin: -3.6rem 0 0 -1.2rem;
  padding-top: 2.4rem;
}

.card_common .carousel_common .box_carousel {
  display: inline-block;
  margin-top: 3.6rem;
  padding-left: 1.2rem;
  box-sizing: border-box;
  vertical-align: top;
}

.card_common .carousel_common .link_carousel {
  overflow: hidden;
  display: block;
  position: relative;
  border-radius: 0.6rem;
}

.card_common .carousel_common .link_carousel + .information_common {
  margin-top: 1.2rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* card_common
---------- ---------- ---------- ---------- ---------- */
.card_common :deep() + .banner_common,
.card_common :deep() + .video_common {
  margin-top: 9.6rem;
}

.card_common :deep(.carousel_common .slick-list) {
  margin: 0 0 0 -0.6rem;
  padding: 0 6rem;
}

/* information_common
---------- ---------- ---------- ---------- ---------- */
.information_common :deep(.title_common) {
  font-weight: 500;
  font-size: 1.8rem;
}

.information_common :deep(.description_common) {
  font-size: 1.6rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* .card_common
  ---------- ---------- ---------- ---------- ---------- */
  .card_common .carousel_common {
    margin: -1.2rem 0 0 -0.6rem;
    padding-top: 1.2rem;
  }

  .card_common .carousel_common .box_carousel {
    margin-top: 1.2rem;
    padding-left: 1.2rem;
  }

  /* direction_common
  ---------- ---------- ---------- ---------- ---------- */
  /* vertical */
  .direction_common.vertical :deep(.link_direction) {
    top: 12.2rem;
    bottom: 5.7rem;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* card_common
  ---------- ---------- ---------- ---------- ---------- */
  .card_common .hgroup_common :deep(.outer_half .inner_half) {
    width: 100%;
  }

  .card_common :deep() + .banner_common,
  .card_common :deep() + .video_common {
    margin-top: 3.6rem;
  }

  /* information_common
  ---------- ---------- ---------- ---------- ---------- */
  .information_common :deep(.title_common) {
    font-size: 1.6rem;
  }

  .information_common :deep(.description_common) {
    font-size: 1.4rem;
  }
}
</style>
