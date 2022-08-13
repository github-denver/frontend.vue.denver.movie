<template>
  <div class="wrapper">
    <Header>
      <template v-slot:first>
        <Navigation />
      </template>

      <template v-slot:second>
        <Utility />
      </template>
    </Header>

    <Container>
      <template v-slot:children>
        <Heading :attributes="{ tagName: 'h2', invisible: true }">
          <template v-slot:subject>
            <span class="text_local">찾기 본문 시작</span>
          </template>
        </Heading>

        <Filter2 />

        <Location />

        <Finder :attributes="{ heading: { tagName: 'h3', subject: `총 ${finder.list.length}개의 작품이 검색되었어요!`, size: 'large' }, category: 'popular' }" />
      </template>
    </Container>

    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Heading from '@/components/unit/heading/Index.vue';
import Header from '@/components/common/header/Index.vue';
import Navigation from '@/components/common/navigation/Index.vue';
import Utility from '@/components/common/utility/Index.vue';
import Container from '@/components/common/container/Index.vue';
import Filter2 from '@/components/common/filter/Index.vue';
import Location from '@/components/common/location/Index.vue';
import Finder from '@/components/common/finder/Index.vue';
import Footer from '@/components/common/footer/Index.vue';

export default {
  name: 'Search',
  components: { Heading, Header, Navigation, Utility, Container, Filter2, Location, Finder, Footer },
  computed: {
    ...mapState({
      finder: (state) => state.finder
    })
  }
};
</script>

<style scoped>
/* container
---------- ---------- ---------- ---------- ---------- */
.container {
  padding: 0 0 0 24rem;
}

.container:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 24rem;
  background-color: #0f223c;
  content: '';
}

.container .filter_common {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 24rem;
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

  .container:before {
    display: none;
    /* position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    width: auto;
    height: 24rem;
    content: ''; */
  }

  .container .filter_common {
    position: relative;
    width: auto;
  }
}
</style>
