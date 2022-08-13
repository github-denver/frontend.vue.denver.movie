<template>
  <div class="board_common" v-if="board.read">
    <Heading :attributes="{ tagName: 'h3', subject: '제목', size: 'large' }">
      <template v-slot:subject>
        <span class="text_local">공지사항</span>
      </template>
    </Heading>

    <div class="view_board">
      <div class="header_board">
        <strong class="subject_board">
          <Picture :attributes="{ images: `${getBaseURL}/${getUploadFolderName}/${board.read.picture}` }" />

          <span class="text_local">{{ board.read.subject }}</span>
        </strong>

        <div class="inner_header">
          <Half :attributes="{ className: { outer: '', inner: {} } }" :styles="{ inner: { first: {} } }">
            <template v-slot:first>
              <span class="text_board text_write">{{ board.read.name }}</span>
            </template>

            <template v-slot:second>
              <span class="text_board text_date">{{ board.read.regdate }}</span>
              <span class="text_board text_count">{{ board.read.count }}</span>
            </template>
          </Half>
        </div>
      </div>

      <div class="container_board" v-html="board.read.content"></div>
    </div>

    <Gravity>
      <template v-slot:children>
        <Half :attributes="{ className: { outer: '', inner: {} } }" :styles="{ inner: { first: {} } }">
          <template v-slot:first>
            <Button
              :attributes="{
                tagName: 'router-link',
                name: 'list',
                params: {
                  service: $route.params.service,
                  number: $route.query.page ? $route.query.page : 1
                },
                query: {
                  select: null,
                  keyword: null
                },
                className: 'regular round thin active'
              }"
            >
              <template v-slot:children>
                <span class="text_local">목록</span>
              </template>
            </Button>
          </template>

          <template v-slot:second></template>
        </Half>
      </template>
    </Gravity>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Half from '@/components/unit/half/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';
import Picture from '@/components/common/picture/Index.vue';
import Gravity from '@/components/common/gravity/Index.vue';

export default {
  name: 'Read',
  components: { Button, Half, Gravity, Picture, Heading },
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
    const { service, number } = this.$route.params;

    this.findBoard({ category: service, number: parseInt(number) });
  },
  computed: {
    ...mapState(['board']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  },
  methods: {
    ...mapActions(['findBoard'])
  }
};
</script>

<style scoped>
/* board_common
---------- ---------- ---------- ---------- ---------- */
.board_common {
  position: relative;
  z-index: 1;
}

.board_common .heading_common {
  margin-bottom: 2.4rem;
}

/* view_board
---------- ---------- ---------- ---------- ---------- */
.view_board {
  border-top: 0.1rem solid #122947;
  border-bottom: 0.1rem solid #122947;
  font-size: 0;
}

.view_board + .gravity_common {
  margin-top: 4.8rem;
}

/* header_board
---------- ---------- ---------- ---------- ---------- */
.header_board .subject_board {
  display: block;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
}

.header_board .inner_header {
  padding: 1.2rem 2.4rem;
  border-top: 0.1rem solid #122947;
}

.header_board .inner_header .text_board {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: middle;
}

/* picture_common
---------- ---------- ---------- ---------- ---------- */
.picture_common {
  display: inline-block;
  width: 4.8rem;
  height: 4.8rem;
  margin: 0;
  border-radius: 100%;
  box-sizing: border-box;
  background-size: 100% auto;
  vertical-align: middle;
}

.picture_common + .text_local {
  margin-left: 2.4rem;
  vertical-align: middle;
}

/* container_board
---------- ---------- ---------- ---------- ---------- */
.container_board {
  padding: 1.2rem 2.4rem;
  min-height: 36.9rem;
  border-top: 0.1rem solid #122947;
  box-sizing: border-box;
  font-size: 1.4rem;
}

.container_board img {
  max-width: 100%;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* header_board
  ---------- ---------- ---------- ---------- ---------- */
  .header_board .subject_board {
    padding: 1.2rem;
  }

  .header_board .subject_board:after {
    display: block;
    clear: both;
    content: '';
  }

  .header_board .inner_header {
    padding: 1.2rem;
  }

  .header_board .inner_header .text_date,
  .header_board .inner_header .text_count {
    margin-left: 1.2rem;
  }

  /* picture_common
  ---------- ---------- ---------- ---------- ---------- */
  .picture_common {
    float: left;
  }

  .picture_common + .text_local {
    overflow: hidden;
    display: block;
    margin-left: 0;
    padding-left: 1.2rem;
  }

  /* container_board
  ---------- ---------- ---------- ---------- ---------- */
  .container_board {
    padding: 1.2rem;
  }

  /* view_board
  ---------- ---------- ---------- ---------- ---------- */
  .view_board + .gravity_common {
    margin-top: 2.4rem;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  .inner_header :deep(.outer_half .inner_half) {
    width: auto;
  }
}
</style>
