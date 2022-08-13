<template>
  <article class="card_common">
    <Hgroup :attributes="{ heading: attributes.heading }">
      <template v-slot:second></template>
    </Hgroup>

    <div :class="['carousel_common', attributes.category]">
      <div class="box_carousel" v-for="(list, index) in finder.list" :key="index">
        <a href="javascript:;" class="link_carousel">
          <Thumbnail :attributes="{ image: { url: list.poster } }" />
        </a>

        <Information :attributes="{ subject: list.subject, description: list.content }" />
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Hgroup from '@/components/common/hgroup/Index.vue';
import Thumbnail from '@/components/common/thumbnail/Index.vue';
import Information from '@/components/common/information/Index.vue';

export default {
  name: 'Finder',
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
    const genre = this.handleQuery({ name: 'genre' });
    const score = this.handleQuery({ name: 'score' });

    this.fetchFinder({
      category: this.attributes.category,
      number: 1,
      genre,
      score
    });
  },
  watch: {
    $route() {
      const genre = this.handleQuery({ name: 'genre' });
      const score = this.handleQuery({ name: 'score' });

      this.fetchFinder({
        category: this.attributes.category,
        number: 1,
        genre,
        score
      });
    }
  },
  computed: {
    ...mapState({
      popular: (state) => state.popular,
      filter: (state) => state.filter,
      finder: (state) => state.finder
    })
  },
  methods: {
    ...mapActions(['fetchFinder']),
    handleQuery(payload) {
      const { name } = payload;

      let result = this.filter[name];

      if (this.$route.query[name]) {
        result = this.$route.query[name].split(',');
      }

      return result;
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
  /* container
  ---------- ---------- ---------- ---------- ---------- */
  .container {
    padding: 0;
  }

  /* card_common
  ---------- ---------- ---------- ---------- ---------- */
  .card_common {
    padding: 2.4rem 0 5.4rem;
  }

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
