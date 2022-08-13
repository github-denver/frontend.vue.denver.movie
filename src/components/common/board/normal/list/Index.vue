<template>
  <div class="board_common">
    <Heading :attributes="{ tagName: 'h3', subject: '제목', size: 'large' }">
      <template v-slot:subject>
        <span class="text_local">공지사항</span>
      </template>
    </Heading>

    <ul class="list_board">
      <li v-for="(list, index) in board.list" :key="index">
        <span class="text_board text_number">{{ list.number }}</span>

        <span class="text_board text_subject">
          <Picture :attributes="{ images: `${getBaseURL}/${getUploadFolderName}/${list.picture}` }" />

          <router-link
            :to="{
              name: 'read',
              params: {
                service: $route.params.service,
                number: list.number
              },
              query: {
                select: null,
                keyword: null,
                page: $route.params.number
              }
            }"
            class="link_subject"
          >
            {{ list.subject }}
          </router-link>
        </span>

        <span class="text_board text_write">{{ list.name }}</span>
        <span class="text_board text_count">{{ list.count }}</span>
        <span class="text_board text_date">{{ list.regdate }}</span>
      </li>
    </ul>

    <ul class="list_pagination">
      <li v-if="pagination.current > 1">
        <router-link
          :to="{
            name: 'list',
            params: {
              number: pagination.current - 1
            },
            query: {
              select: null,
              keyword: null
            }
          }"
          class="link_pagination"
        >
          이전
        </router-link>
      </li>

      <li v-for="(i, index) in page" :key="index">
        <router-link
          :to="{
            name: 'list',
            params: {
              number: i
            },
            query: {
              select: null,
              keyword: null
            }
          }"
          :class="['link_pagination', pagination.current === i ? 'current' : null]"
        >
          {{ i }}
        </router-link>
      </li>

      <li v-if="pagination.current < pagination.total">
        <router-link
          :to="{
            name: 'list',
            params: {
              number: pagination.current + 1
            },
            query: {
              select: null,
              keyword: null
            }
          }"
          class="link_pagination"
        >
          다음
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Heading from '@/components/unit/heading/Index.vue';
import Picture from '@/components/common/picture/Index.vue';

export default {
  name: 'List',
  components: { Heading, Picture },
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

    this.fetchBoard({ category: service, number: parseInt(number) });
  },
  computed: {
    ...mapState(['board', 'pagination']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName']),
    page() {
      const result = [];

      for (let i = this.pagination.start; i <= this.pagination.end; i++) {
        result.push(i);
      }

      return result;
    }
  },
  methods: {
    ...mapActions(['fetchBoard'])
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

/* list_board
---------- ---------- ---------- ---------- ---------- */
.list_board {
  border-top: 0.1rem solid #122947;
  border-bottom: 0.1rem solid #122947;
  font-size: 0;
}

.list_board li {
  padding: 1.2rem 0;
  font-size: 1.4rem;
  text-align: center;
}

.list_board li + li {
  border-top: 0.1rem solid #122947;
}

.list_board .text_board {
  display: inline-block;
  width: 12%;
  box-sizing: border-box;
  vertical-align: middle;
  word-break: break-all;
}

.list_board .text_number {
  width: 6%;
}

.list_board .text_subject {
  width: 64%;
  padding: 0 1.2rem;
  box-sizing: border-box;
  text-align: left;
}

.list_board .text_write {
  width: 12%;
  text-align: left;
}

.list_board .text_count {
  width: 6%;
}

.list_board .link_subject {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: middle;
}

.list_board .link_subject:hover,
.list_board .link_subject:focus {
  text-decoration: underline;
}

.list_board + .list_pagination {
  margin-top: 2.4rem;
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

.picture_common + .link_subject {
  margin-left: 2.4rem;
}

/* list_pagination
---------- ---------- ---------- ---------- ---------- */
.list_pagination {
  font-size: 0;
  text-align: center;
}

.list_pagination li {
  display: inline-block;
}

.list_pagination li + li {
  margin-left: 1.2rem;
}

.list_pagination .link_pagination {
  display: block;
  min-width: 3rem;
  padding: 0.6rem 0.4rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  line-height: 1;
}

.list_pagination .link_pagination.current {
  font-weight: 500;
  border: 0.1rem solid #1b3c69;
  background-color: #0f223c;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* list_board
  ---------- ---------- ---------- ---------- ---------- */
  .list_board li {
    text-align: left;
  }

  .list_board .text_board {
    width: auto;
    padding: 0;
  }

  .list_board .text_number {
    width: 15%;
  }

  .list_board .text_subject {
    width: 85%;
  }

  .list_board .text_write,
  .list_board .text_count,
  .list_board .text_date {
    margin-top: 1.2rem;
  }

  .list_board .text_count,
  .list_board .text_date {
    margin-left: 1.2rem;
  }

  /* picture_common
  ---------- ---------- ---------- ---------- ---------- */
  .picture_common {
    float: left;
  }

  .picture_common + .link_subject {
    overflow: hidden;
    display: block;
    margin-left: 0;
    padding-left: 1.2rem;
  }
}
</style>
