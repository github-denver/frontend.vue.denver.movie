<template>
  <div class="area_member">
    <Cell>
      <template v-slot:children>
        <Hgroup :attributes="{ heading: { tagName: 'h2', subject: '로그인', size: 'large' } }">
          <template v-slot:description>
            <p class="description_common">로그인해 주세요!</p>
          </template>
        </Hgroup>

        <form method="post" enctype="multipart/form-data" @submit.prevent="handleSignin">
          <fieldset>
            <legend class="accessibility">로그인</legend>

            <Field :attributes="{ type: 'text', id: 'id', className: '', title: '아이디' }" @onInsert="handleInsert" />
            <Field :attributes="{ type: 'password', id: 'password', className: '', title: '패스워드' }" @onInsert="handleInsert" />

            <Gravity>
              <template v-slot:children>
                <Half :attributes="{ className: { inner: {} } }" :styles="{ inner: { first: {} } }">
                  <template v-slot:first>
                    <Button
                      :attributes="{
                        tagName: 'router-link',
                        name: 'main',
                        params: {},
                        query: {},
                        className: 'regular round pure thick max'
                      }"
                    >
                      <template v-slot:children>
                        <span class="text_local">홈으로</span>
                      </template>
                    </Button>
                  </template>

                  <template v-slot:second>
                    <Button :attributes="{ type: 'submit', className: 'regular round active max' }">
                      <template v-slot:children>
                        <span class="text_local">로그인</span>
                      </template>
                    </Button>
                  </template>
                </Half>
              </template>
            </Gravity>
          </fieldset>
        </form>
      </template>
    </Cell>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Cell from '@/components/unit/cell/Index.vue';
import Half from '@/components/unit/half/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Field from '@/components/unit/field/Index.vue';
import Hgroup from '@/components/common/hgroup/Index.vue';
import Gravity from '@/components/common/gravity/Index.vue';

export default {
  name: 'Login',
  components: { Cell, Half, Button, Field, Hgroup, Gravity },
  data() {
    return {
      member: {
        id: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions(['signin']),
    handleInsert(payload) {
      const { name, value } = payload;

      this.member[name] = value;
    },
    handleSignin() {
      const { id, password } = this.member;

      if (this.$validate.empty2({ value: id, message: '아이디를 입력해 주세요.' })) return;

      if (this.$validate.empty2({ value: password, message: '패스워드를 입력해 주세요.' })) return;

      this.signin({ id, password })
        .then(() => {
          // console.log('로그인에 성공했습니다.');

          alert('로그인에 성공했습니다.');

          this.$router.push({ name: 'main' });
        })
        .catch((error) => {
          // console.log('로그인에 실패했습니다.');

          alert('로그인에 실패했습니다.');

          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
/* area_member
---------- ---------- ---------- ---------- ---------- */
.area_member {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  max-width: 32rem;
  margin: 0 auto;
}

.area_member .outer_cell {
  height: 100%;
}

/* hgroup_common
---------- ---------- ---------- ---------- ---------- */
.hgroup_common {
  text-align: center;
}

.hgroup_common .text_local {
  font-size: 2.8rem;
  line-height: 1.5;
}

.hgroup_common .description_common {
  font-size: 1.4rem;
}

/* gravity_common
---------- ---------- ---------- ---------- ---------- */
.gravity_common {
  margin-top: 4.8rem;
}

.gravity_common :deep(.outer_half) {
  margin-left: -2.4rem;
}

.gravity_common :deep(.outer_half .inner_half) {
  padding-left: 2.4rem;
}
</style>
