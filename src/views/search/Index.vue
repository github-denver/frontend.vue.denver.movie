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
            <span class="text_local">검색 본문 시작</span>
          </template>
        </Heading>

        <Surf :attributes="{ heading: { tagName: 'h3', subject: `‘${$route.query.keyword}’ 검색 결과`, size: 'large' }, category: 'popular' }" />
      </template>
    </Container>

    <Footer />
  </div>
</template>

<script>
import Heading from '@/components/unit/heading/Index.vue';
import Header from '@/components/common/header/Index.vue';
import Navigation from '@/components/common/navigation/Index.vue';
import Utility from '@/components/common/utility/Index.vue';
import Container from '@/components/common/container/Index.vue';
import Surf from '@/components/common/surf/Index.vue';
import Footer from '@/components/common/footer/Index.vue';

export default {
  name: 'Search',
  components: { Heading, Header, Navigation, Utility, Container, Surf, Footer }
};
</script>

<style scoped>
/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
