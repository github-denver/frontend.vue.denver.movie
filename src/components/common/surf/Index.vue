<template>
  <div class="card_common">
    <Hgroup :attributes="{ heading: attributes.heading }">
      <template v-slot:second></template>
    </Hgroup>

    <div :class="['carousel_common', attributes.category]">
      <div class="box_carousel" v-for="(list, index) in popular" :key="index">
        <a href="javascript:;" class="link_carousel" @click="handleRouter(list.number)">
          <Thumbnail :attributes="{ image: { url: list.poster } }" />
        </a>

        <Information :attributes="{ subject: list.subject, description: list.content }" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Hgroup from '@/components/common/hgroup/Index.vue';
import Thumbnail from '@/components/common/thumbnail/Index.vue';
import Information from '@/components/common/information/Index.vue';

export default {
  name: 'Surf',
  components: { Hgroup, Thumbnail, Information },
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
      number: 1,
      select: this.$route.query.select,
      keyword: this.$route.query.keyword
    });
  },
  watch: {
    $route() {
      this.fetchPopular({
        category: this.attributes.category,
        number: 1,
        select: this.$route.query.select,
        keyword: this.$route.query.keyword
      });
    }
  },
  computed: {
    ...mapState({
      popular: (state) => state.popular
    })
  },
  methods: {
    ...mapActions(['fetchPopular']),
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
  padding: 2.4rem 0 5.4rem;
}

.card_common .carousel_common {
  margin: -3.6rem 0 0 -1.2rem;
  padding: 2.4rem 4.8rem 0;
}

.card_common .carousel_common .box_carousel {
  display: inline-block;
  width: 16.6666%;
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
.card_common :deep(.carousel_common .slick-list) {
  margin: 0 0 0 -0.6rem;
  padding: 0 6rem;
}

.card_common :deep() + .banner_common,
.card_common :deep() + .video_common {
  margin-top: 9.6rem;
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
  /* container
  ---------- ---------- ---------- ---------- ---------- */
  .container {
    padding: 0;
  }

  /* .card_common
  ---------- ---------- ---------- ---------- ---------- */
  .card_common .carousel_common {
    margin-top: -2.4rem;
    padding: 2.4rem 2.4rem 0;
  }

  .card_common .carousel_common .box_carousel {
    width: 33.3333%;
    margin-top: 2.4rem;
  }
}
</style>
