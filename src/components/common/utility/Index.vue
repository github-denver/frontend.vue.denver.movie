<template>
  <div class="utility_common">
    <Half :attributes="{ className: { inner: { first: '' } } }" :styles="{ inner: { first: {}, second: {} } }">
      <template v-slot:first>
        <Button
          :attributes="{
            className: '',
            event: (event) => {
              handleVisible({ name: 'suggest', value: !visible.suggest });
            }
          }"
        >
          <template v-slot:children>
            <span class="icon_common icon_cross" v-if="visible.suggest">전체 검색 열기</span>
            <span class="icon_common icon_search" v-else>전체 검색 닫기</span>
          </template>
        </Button>

        <div class="suggest_common" v-if="visible.suggest">
          <div class="dimmed"></div>

          <div class="inner_suggest">
            <Heading :attributes="{ tagName: 'strong' }">
              <template v-slot:subject>
                <span class="text_local">전체 검색</span>
              </template>
            </Heading>

            <Button
              :attributes="{
                className: 'button_close',
                event: (event) => {
                  handleVisible({ name: 'suggest', value: !visible.suggest });
                }
              }"
            >
              <template v-slot:children>
                <span class="icon_common icon_cross">{{ visible.suggest ? '전체 검색 닫기2' : '전체 검색 열기2' }}</span>
              </template>
            </Button>

            <fieldset>
              <legend class="screen_out">전체 검색</legend>

              <Field :attributes="{ type: 'text', id: 'keyword', className: 'textfield_suggest', title: '검색어', value: keyword }" @onInsert="handleInsert" @onEraser="handleEraser" v-if="visible.suggest" />

              <Button :attributes="{ className: 'button_suggest', event: handleKeyword }" v-if="visible.suggest">
                <template v-slot:children>
                  <span class="icon_common icon_search">검색</span>
                </template>
              </Button>
            </fieldset>
          </div>
        </div>
      </template>

      <template v-slot:second>
        <Heading :attributes="{ tagName: 'h2', invisible: true }">
          <template v-slot:subject>
            <span class="text_local">개인 메뉴</span>
          </template>
        </Heading>

        <ul class="list_utility">
          <template v-for="(list, index) in utility">
            <li v-if="!!list.state === !!isUserLoggedIn" :key="index">
              <router-link :to="{ name: list.route }" class="link_utility" @click.native="$transport.event({ event: !!list.event ? list.event : null, action: signout })">
                <span :class="['icon_common', `icon_${list.icon}`]">{{ list.text }}</span>
              </router-link>
            </li>
          </template>
        </ul>
      </template>
    </Half>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Half from '@/components/unit/half/Index.vue';
import Field from '@/components/unit/field/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';

export default {
  name: 'Utility',
  components: { Half, Field, Button, Heading },
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
  data() {
    return {
      duplicate: {
        keyword: null
      },
      select: 'subject',
      keyword: null,
      visible: {
        suggest: false
      }
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;

    this.fetchUtility();
  },
  computed: {
    ...mapState(['utility', 'user']),
    ...mapGetters(['isUserLoggedIn'])
  },
  methods: {
    ...mapActions(['signout', 'fetchUtility']),
    handleEraser(payload) {
      const { eraser } = payload;

      this.duplicate[eraser] = null;
    },
    handleInsert(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
    handleKeyword() {
      if (this.$validate.empty2({ value: this.keyword, message: '검색어를 입력해 주세요.' })) return;

      this.visible.suggest = false;

      this.$router.push({
        name: 'search',
        query: {
          select: this.select,
          keyword: this.keyword
        }
      });
    },
    handleVisible(payload) {
      this.visible[payload.name] = payload.value;
    }
  }
};
</script>

<style scoped>
/* utility_common
---------- ---------- ---------- ---------- ---------- */
.utility_common .list_utility {
  display: inline-block;
  vertical-align: middle;
}

/* suggest_common
---------- ---------- ---------- ---------- ---------- */
.suggest_common {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.suggest_common .button_common {
  display: inline-block;
  vertical-align: middle;
}

.suggest_common .button_close {
  display: none;
}

/* .suggest_common .button_visible, */
/* .suggest_common .button_suggest {
} */

.suggest_common .field_common {
  display: inline-block;
  margin: 0 1.2rem;
  vertical-align: middle;
}

/* list_utility
---------- ---------- ---------- ---------- ---------- */
.list_utility {
  margin-left: -1.2rem;
  font-size: 0;
}

.list_utility li {
  display: inline-block;
  position: relative;
  margin-left: 1.2rem;
  vertical-align: middle;
}

.list_utility .link_utility {
  display: block;
  font-size: 1.2rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* utility_common
---------- ---------- ---------- ---------- ---------- */
.utility_common :deep(.outer_half) {
  margin-left: -4.8rem;
}

.utility_common :deep(.outer_half .inner_half) {
  width: auto;
  padding-left: 4.8rem;
  text-align: right;
}

/* suggest_common
---------- ---------- ---------- ---------- ---------- */
.suggest_common .field_common :deep(.label_field) {
  display: none;
}

.suggest_common .field_common :deep(.label_field + .box_field) {
  margin-top: 0;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  .dimmed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: #000;
    opacity: 0.75;
  }

  /* suggest_common
  ---------- ---------- ---------- ---------- ---------- */
  .suggest_common {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .suggest_common .heading_common + .button_close {
    display: inline-block;
    margin-left: 1.2rem;
  }

  .suggest_common .inner_suggest {
    position: relative;
    z-index: 1;
    margin: 2.4rem;
    text-align: left;
  }

  .suggest_common .outer_cell {
    position: relative;
    height: 100%;
    z-index: 10;
  }

  .suggest_common .field_common {
    display: block;
    margin: 1.2rem 4.2rem 0 0;
    text-align: center;
  }

  .suggest_common .button_common {
    position: absolute;
    top: auto;
    bottom: 0;
    z-index: 1;
    /* width: auto;
    height: auto; */
  }

  .utility_common .button_visible {
    position: relative;
    bottom: auto;
    width: 3rem;
    height: 3rem;
    border: 0.1rem solid #1b3c69;
    box-sizing: border-box;
    background-color: #0f223c;
  }

  .suggest_common .button_close {
    position: static;
  }

  .suggest_common .button_suggest {
    top: 3.6rem;
    right: 0;
  }

  /* suggest_common
  ---------- ---------- ---------- ---------- ---------- */

  /* utility_common
  ---------- ---------- ---------- ---------- ---------- */
  .utility_common .list_utility {
    margin-left: 0;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* suggest_common
  ---------- ---------- ---------- ---------- ---------- */

  .suggest_common .heading_common :deep(.title_common) {
    font-size: 1.6rem;
  }

  /* .suggest_common .field_common :deep(.box_field .textfield_local) {
    text-align: center;
  } */

  /* utility_common
  ---------- ---------- ---------- ---------- ---------- */
  .utility_common :deep(.outer_half) {
    margin-left: 0;
  }

  .utility_common :deep(.outer_half .inner_half) {
    width: auto;
    padding-left: 0;
  }

  .utility_common :deep(.outer_half .inner_half:first-child) {
    width: auto;
  }

  /* .utility_common :deep(.outer_half) {
    margin-left: 0;
  }

  .utility_common :deep(.outer_half .inner_half) {
    position: static;
    padding: 1.2rem;
    border-top: 0.1rem solid #122947;
    text-align: center;
  }

  .utility_common :deep(.outer_half .inner_half:first-child) {
    border-top: 0 none;
  } */
}
</style>
