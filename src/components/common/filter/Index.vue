<template>
  <div :class="['filter_common', visible.filter ? 'active' : null]">
    <Button
      :attributes="{
        className: 'small round thick',
        event: () => {
          handleVisible({ name: 'filter', value: !visible.filter });
        }
      }"
    >
      <template v-slot:children>
        <span class="text_local">{{ visible.filter ? '검색 조건 닫기' : '검색 조건 열기' }} </span>
      </template>
    </Button>

    <div class="inner_filter">
      <Heading :attributes="{ tagName: 'strong', size: 'medium' }">
        <template v-slot:subject>
          <span class="text_local">장르</span>
        </template>
      </Heading>

      <ul class="list_finder">
        <li v-for="(item, index) in list.genre" :key="index">
          <span class="choice_common">
            <input type="checkbox" :id="item.htmlFor" :name="item.name" class="input_common" @change="handleFinder({ name: item.name, value: item.value }, $event)" :checked="item.checked" />

            <label :for="item.htmlFor" class="label_common">
              <span class="text_local">장르: {{ item.text }}</span>
            </label>
          </span>
        </li>
      </ul>

      <hr />

      <Heading :attributes="{ tagName: 'strong', size: 'medium' }">
        <template v-slot:subject>
          <span class="text_local">평점</span>
        </template>
      </Heading>

      <ul class="list_finder">
        <li v-for="(item, index) in list.score" :key="index">
          <span class="choice_common">
            <input type="checkbox" :id="item.htmlFor" :name="item.name" class="input_common" @change="handleFinder({ name: item.name, value: item.value }, $event)" :checked="item.checked" />

            <label :for="item.htmlFor" class="label_common">
              <span class="text_local">평점: {{ item.text }}점</span>
            </label>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Button from '@/components/unit/button/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';

export default {
  name: 'Filter2',
  components: { Button, Heading },
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
      visible: {
        filter: false
      },
      list: {
        genre: [
          {
            htmlFor: 'sciencefiction',
            text: 'SF 영화',
            name: 'genre',
            value: 0,
            checked: false
          },
          {
            htmlFor: 'comedy',
            text: '코미디',
            name: 'genre',
            value: 1,
            checked: false
          },
          {
            htmlFor: 'actionadventure',
            text: '액션 & 어드벤처',
            name: 'genre',
            value: 2,
            checked: false
          }
        ],
        score: [
          {
            htmlFor: 'one',
            text: '1',
            name: 'score',
            value: 1,
            checked: false
          },
          {
            htmlFor: 'five',
            text: '5',
            name: 'score',
            value: 5,
            checked: false
          },
          {
            htmlFor: 'ten',
            text: '10',
            name: 'score',
            value: 10,
            checked: false
          }
        ]
      }
    };
  },
  created() {
    const genre = this.handleQuery({ name: 'genre' });
    const score = this.handleQuery({ name: 'score' });

    this.$router.replace({
      query: {
        genre: genre.join(),
        score: score.join()
      }
    });
  },
  computed: {
    ...mapState({
      popular: (state) => state.popular,
      filter: (state) => state.filter,
      finder: (state) => state.finder
    })
  },
  methods: {
    ...mapMutations(['SET_FILTER']),
    handleVisible(payload) {
      this.visible[payload.name] = payload.value;
    },
    handleQuery(payload) {
      const { name } = payload;

      let result = this.filter[name];

      if (this.$route.query[name]) {
        result = this.$route.query[name].split(',');
      }

      this.list[name].findIndex((element) => {
        result.findIndex((elmnt) => {
          if (element.value === parseInt(elmnt)) {
            element.checked = true;

            this.$store.commit('SET_FILTER', {
              checked: true,
              name: name,
              value: element.value
            });
          }
        });
      });

      return result;
    },
    handleFinder(payload, event) {
      this.$store.commit('SET_FILTER', {
        checked: event.target.checked,
        name: payload.name,
        value: payload.value
      });

      this.$router.push({
        query: {
          genre: this.filter.genre.join(),
          score: this.filter.score.join()
        }
      });
    }
  }
};
</script>

<style scoped>
/* filter_common
---------- ---------- ---------- ---------- ---------- */
.filter_common {
  padding: 2.4rem;
  box-sizing: border-box;
}

.filter_common .button_common:first-child {
  display: none;
}

.filter_common .inner_filter {
  box-sizing: border-box;
}

.filter_common .list_finder {
  margin-top: 1.6rem;
}

.filter_common .list_finder:first-child {
  margin-top: 0;
}

.filter_common hr {
  margin: 1.2rem 0;
  border: 0 none;
  border-top: 0.1rem solid #122947;
}

/* list_finder
---------- ---------- ---------- ---------- ---------- */
.list_finder {
  font-size: 0;
}

.list_finder li {
  margin-top: 0.6rem;
}

.list_finder li:first-child {
  margin-top: -0.6rem;
}

/* choice_common
---------- ---------- ---------- ---------- ---------- */
.choice_common {
  display: inline-block;
  vertical-align: top;
}

.choice_common .input_common {
  display: inline-block;
  vertical-align: middle;
}

.choice_common .input_common + .label_common {
  margin-left: 1.2rem;
}

.choice_common .label_common {
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: middle;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* filter_common
  ---------- ---------- ---------- ---------- ---------- */
  .filter_common {
    padding: 0;
    background-color: #0f223c;
  }

  .filter_common .button_common:first-child {
    display: inline-block;
    margin: 1.2rem;
  }

  .filter_common .inner_filter {
    display: none;
    overflow: auto;
    height: 13rem;
    padding: 1.2rem 2.4rem;
    background-color: #122947;
    text-align: left;
  }

  /* active */
  .filter_common.active {
    background-color: #122947;
  }

  .filter_common.active .inner_filter {
    display: block;
    background-color: #0f223c;
  }
}
</style>
