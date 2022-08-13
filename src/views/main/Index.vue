<template>
  <div class="wrapper">
    <Header :styles="{ position: 'fixed' }">
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
            <span class="text_local">메인 본문 시작</span>
          </template>
        </Heading>

        <Hero />

        <Promotion />

        <Banner />

        <Card :attributes="{ heading: { tagName: 'h3', subject: '인기 영화', size: 'large' }, category: 'popular' }">
          <template v-slot:category>
            <Category :attributes="{ category: 'popular' }" />
          </template>
        </Card>

        <Video :attributes="{ heading: { tagName: 'h3', subject: '출시 예정, 신작 영화', size: 'large' } }" />
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
import Hero from '@/components/common/hero/Index.vue';
import Promotion from '@/components/common/promotion/Index.vue';
import Banner from '@/components/common/banner/Index.vue';
import Card from '@/components/common/card/Index.vue';
import Category from '@/components/common/category/Index.vue';
import Video from '@/components/common/video/Index.vue';
import Footer from '@/components/common/footer/Index.vue';

export default {
  name: 'Main',
  components: { Heading, Header, Navigation, Utility, Container, Hero, Promotion, Banner, Card, Category, Video, Footer }
};
</script>

<style scoped>
/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
