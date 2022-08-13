<template>
  <article class="hero_common">
    <div class="inner_hero">
      <Heading :attributes="{ tagName: 'h3', invisible: true }">
        <template v-slot:subject>
          <span class="text_local">제목</span>
        </template>
      </Heading>

      <div class="carousel_common">
        <div class="box_carousel" v-for="(list, index) in promotion" :key="index">
          <img :src="`${getBaseURL}/${getUploadFolderName}/${list.hero}`" alt="" class="image_carousel" />
          <img src="~@/assets/images/common/img_cover.png" alt="" class="image_shadow" />

          <div class="information_carousel">
            <Heading :attributes="{ tagName: 'strong' }">
              <template v-slot:signature>
                <img :src="`${getBaseURL}/${getUploadFolderName}/${list.signature}`" alt="" class="image_signature" />
              </template>

              <template v-slot:subject>
                <span class="text_local">{{ list.subject }}</span>
              </template>
            </Heading>

            <p class="text_carousel">{{ list.content }}</p>

            <Button
              :attributes="{
                className: 'regular round pure thick',
                event: () => {
                  handleRouter(list.number);
                }
              }"
            >
              <template v-slot:children>
                <span class="text_local">자세히 보기</span>
              </template>
            </Button>
          </div>
        </div>
      </div>

      <Indicator />

      <Direction />
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Button from '@/components/unit/button/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';
import Indicator from '@/components/common/indicator/Index.vue';
import Direction from '@/components/common/direction/Index.vue';

export default {
  name: 'Hero',
  components: { Button, Heading, Indicator, Direction },
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

      $('.hero_common .carousel_common')
        .not('.slick-initialized')
        .slick({
          fade: true,
          infinite: false,
          autoplay: false,
          autoplaySpeed: 4000,
          appendDots: $('.hero_common .indicator_common'),
          appendArrows: $('.hero_common .direction_common'),
          prevArrow: $('.hero_common .direction_common .link_previous'),
          nextArrow: $('.hero_common .direction_common .link_future'),
          dots: true,
          customPaging: function (slider, i) {
            return '<a href="javascript:;" class="link_pagination" >' + i + '</a>';
          }
        });
    });
  },
  computed: {
    ...mapState(['promotion']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
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
/* hero_common
---------- ---------- ---------- ---------- ---------- */
.hero_common {
  position: relative;
  padding-top: 56.2501%;
}

.hero_common .inner_hero {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.hero_common .carousel_common {
  margin-bottom: 0;
}

/* box_carousel
---------- ---------- ---------- ---------- ---------- */
.box_carousel {
  position: relative;
}

.box_carousel .image_carousel {
  width: 100%;
}

.box_carousel .image_shadow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: linear-gradient(to top, rgb(0, 0, 0) 0, rgba(0, 0, 0, 0) 100%);
  content: '';
}

/* information_carousel
---------- ---------- ---------- ---------- ---------- */
.information_carousel {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  margin: 0 4.8rem 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}

.information_carousel .image_signature {
  max-width: 100%;
  height: 18rem;
}

.information_carousel .image_signature + .text_carousel {
  margin-top: 2.4rem;
}

.information_carousel .title_common .text_local {
  display: block;
  font-size: 2.8rem;
}

.information_carousel .text_carousel {
  margin-top: 2.4rem;
  font-size: 1.6rem;
}

.information_carousel .text_carousel:first-child {
  margin-top: 0;
}

.information_carousel .text_carousel + .button_common {
  margin-top: 2.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* hero_common
---------- ---------- ---------- ---------- ---------- */
.hero_common :deep() + .promotion_common {
  margin-top: -19rem;
}

/* direction_common
---------- ---------- ---------- ---------- ---------- */
.direction_common :deep(.link_direction) {
  margin-top: -11.9rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* hero_common
  ---------- ---------- ---------- ---------- ---------- */
  .hero_common {
    padding-top: 0;
  }

  .hero_common .inner_hero {
    position: static;
  }

  /* information_carousel
  ---------- ---------- ---------- ---------- ---------- */
  .information_carousel {
    top: auto;
    right: 0;
    bottom: 0;
    margin: 0 3rem 3rem;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  .information_carousel .image_signature {
    display: none;
    height: auto;
  }

  .information_carousel .title_common .text_local {
    font-size: 1.6rem;
  }

  .information_carousel .text_carousel {
    overflow: hidden;
    margin-top: 0.4rem;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .information_carousel .text_carousel + .button_common {
    margin-top: 0.8rem;
  }

  .information_carousel .button_common .icon_common {
    display: none;
  }

  /* indicator_common
  ---------- ---------- ---------- ---------- ---------- */
  .indicator_common {
    position: absolute;
    right: 3rem;
    bottom: 3rem;
    left: auto;
    z-index: 1;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* hero_common
  ---------- ---------- ---------- ---------- ---------- */
  .hero_common :deep() + .promotion_common {
    margin-top: 2.4rem;
  }

  /* information_carousel
  ---------- ---------- ---------- ---------- ---------- */
  .information_carousel :deep(.title_common) {
    margin-top: 0;
  }

  /* direction_common
  ---------- ---------- ---------- ---------- ---------- */
  .direction_common :deep(.link_direction) {
    top: 50%;
    width: 3rem;
    height: 3rem;
    margin-top: -1.5rem;
  }

  .direction_common :deep(.link_direction .icon_common) {
    position: static;
    margin: 0;
  }
}
</style>
