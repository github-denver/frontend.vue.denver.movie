<template>
  <article class="promotion_common">
    <div class="carousel_common">
      <div class="box_carousel" v-for="(list, index) in promotion" :key="index">
        <a href="javascript:;" class="link_carousel" @click="handleRouter(list.number)">
          <Thumbnail :attributes="{ image: { url: list.thumbnail }, className: 'promotion', shadow: true }" />

          <Information :attributes="{ subject: list.subject, description: list.content, className: 'promotion' }" />
        </a>
      </div>
    </div>

    <Indicator />

    <Direction :attributes="{ arrows: 'vertical' }" />
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Thumbnail from '@/components/common/thumbnail/Index.vue';
import Information from '@/components/common/information/Index.vue';
import Indicator from '@/components/common/indicator/Index.vue';
import Direction from '@/components/common/direction/Index.vue';

export default {
  name: 'Promotion',
  components: { Thumbnail, Information, Indicator, Direction },
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
    this.fetchPromotion({ number: 1 }).then(() => {
      const $ = window.$;

      $('.promotion_common .carousel_common')
        .not('.slick-initialized')
        .slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
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
          appendDots: $('.promotion_common .indicator_common'),
          appendArrows: $('.promotion_common .direction_common'),
          prevArrow: $('.promotion_common .direction_common .link_previous'),
          nextArrow: $('.promotion_common .direction_common .link_future'),
          dots: true,
          customPaging: function (slider, i) {
            return '<a href="javascript:;" class="link_pagination" >' + i + '</a>';
          }
        });
    });
  },
  computed: {
    ...mapState(['promotion'])
  },
  methods: {
    ...mapActions(['fetchPromotion']),
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
/* promotion_common
---------- ---------- ---------- ---------- ---------- */
.promotion_common {
  position: relative;
  z-index: 1;
}

.promotion_common .carousel_common {
  margin-bottom: 0;
}

/* box_carousel
---------- ---------- ---------- ---------- ---------- */
.box_carousel {
  display: inline-block;
  padding-left: 1.2rem;
  vertical-align: top;
}

.box_carousel .link_carousel {
  overflow: hidden;
  display: block;
  position: relative;
  border-radius: 0.6rem;
}

/* information_common
---------- ---------- ---------- ---------- ---------- */
.information_common {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* promotion_common
---------- ---------- ---------- ---------- ---------- */
.promotion_common .carousel_common :deep(.slick-list) {
  margin: 0 0 0 -1.2rem;
  padding: 0 6rem;
}

.promotion_common :deep() + .banner_common {
  margin-top: 6rem;
}

.promotion_common :deep() + .card_common {
  margin-top: 9.6rem;
}

/* information_common
---------- ---------- ---------- ---------- ---------- */
.indicator_common {
  padding: 1.2rem 0;
}

.information_common :deep(.title_common) {
  font-size: 1.8rem;
}

.information_common :deep(.description_common) {
  font-weight: 500;
  font-size: 2.4rem;
}

/* direction_common
---------- ---------- ---------- ---------- ---------- */
/* vertical */
.direction_common.vertical :deep(.link_direction) {
  bottom: 3.6rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* promotion_common
  ---------- ---------- ---------- ---------- ---------- */
  .promotion_common :deep() + .banner_common {
    margin-top: 3.6rem;
  }

  /* information_common
  ---------- ---------- ---------- ---------- ---------- */
  .information_common {
    padding: 1.2rem;
  }

  .information_common :deep(.description_common) {
    font-size: 1.4rem;
  }

  /* indicator_common
  ---------- ---------- ---------- ---------- ---------- */
  .indicator_common {
    padding: 1.2rem 0;
  }

  .information_common :deep(.title_common) {
    font-size: 1.6rem;
  }

  /* direction_common
  ---------- ---------- ---------- ---------- ---------- */
  /* vertical */
  .direction_common.vertical :deep(.link_direction) {
    bottom: 3.6rem;
  }
}
</style>
