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

    <Container :attributes="{ className: 'navigation' }">
      <template v-slot:children>
        <Heading :attributes="{ tagName: 'h2', invisible: true }">
          <template v-slot:subject>
            <span class="text_local">게시판 본문 시작</span>
          </template>
        </Heading>

        <Menu :attributes="{ heading: { tagName: 'strong', subject: '새소식', size: 'medium' } }" />

        <Location />

        <NormalBoardRead />
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
import Menu from '@/components/common/menu/Index.vue';
import Location from '@/components/common/location/Index.vue';
import NormalBoardRead from '@/components/common/board/normal/read/Index.vue';
import Footer from '@/components/common/footer/Index.vue';

export default {
  name: 'Read',
  components: { Header, Navigation, Utility, Container, Heading, Menu, Location, NormalBoardRead, Footer }
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

.container .menu_common {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 24rem;
}

/* board_common
---------- ---------- ---------- ---------- ---------- */
.board_common {
  overflow: hidden;
  padding: 4.8rem 4.8rem 10.8rem;
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

  .container .menu_common {
    position: relative;
    width: auto;
  }

  /* board_common
  ---------- ---------- ---------- ---------- ---------- */
  .board_common {
    padding: 2.4rem 2.4rem 5.4rem;
  }
}
</style>
