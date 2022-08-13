<template>
  <div class="area_member">
    <div class="inner_member">
      <Cell>
        <template v-slot:children>
          <Hgroup :attributes="{ heading: { tagName: 'h2', subject: '얼마 안 남았어요!', size: 'large' } }">
            <template v-slot:description>
              <p class="description_common">나머지 정보를 입력해주세요!</p>
            </template>
          </Hgroup>

          <form method="post" enctype="multipart/form-data" @submit.prevent="handleProfile">
            <fieldset>
              <legend class="accessibility">회원가입</legend>

              <Picture :attributes="{ authorized: isUserLoggedIn, images: member.picture.result }">
                <template v-slot:upload>
                  <Upload :attributes="{ id: 'upload', icon: 'icon_camera', text: '프로필 사진' }" @onUpload="handlePicture" />
                </template>
              </Picture>

              <Field :attributes="{ type: 'text', id: 'id', title: '아이디', value: member.id }" @onInsert="handleInsert" @onEraser="handleEraser">
                <template v-slot:confirm>
                  <Button
                    :attributes="{
                      className: 'regular round active',
                      event: () => {
                        handleIdValidate({ id: member.id });
                      }
                    }"
                  >
                    <template v-slot:children>
                      <span class="text_local">중복 확인</span>
                    </template>
                  </Button>
                </template>
              </Field>

              <Field :attributes="{ type: 'password', id: 'password', title: '패스워드', value: member.password }" @onInsert="handleInsert" />
              <Field :attributes="{ type: 'password', id: 'confirm', title: '패스워드 확인', value: member.confirm }" @onInsert="handleInsert" />

              <Field :attributes="{ type: 'text', id: 'name', title: '닉네임', value: member.name }" @onInsert="handleInsert" @onEraser="handleEraser">
                <template v-slot:confirm>
                  <Button
                    :attributes="{
                      className: 'regular round active',
                      event: () => {
                        handleNameValidate({ name: member.name });
                      }
                    }"
                  >
                    <template v-slot:children>
                      <span class="text_local">중복 확인</span>
                    </template>
                  </Button>
                </template>
              </Field>

              <Field :attributes="{ type: 'text', id: 'email', title: '이메일', value: member.email }" @onInsert="handleInsert" @onEraser="handleEraser">
                <template v-slot:confirm>
                  <Button
                    :attributes="{
                      className: 'regular round active',
                      event: () => {
                        handleEmailValidate({ email: member.email });
                      }
                    }"
                  >
                    <template v-slot:children>
                      <span class="text_local">중복 확인</span>
                    </template>
                  </Button>
                </template>
              </Field>

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
                          <span class="text_local">가입</span>
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Cell from '@/components/unit/cell/Index.vue';
import Half from '@/components/unit/half/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Field from '@/components/unit/field/Index.vue';
import Hgroup from '@/components/common/hgroup/Index.vue';
import Gravity from '@/components/common/gravity/Index.vue';
import Picture from '@/components/common/picture/Index.vue';
import Upload from '@/components/common/upload/Index.vue';

export default {
  name: 'Register',
  components: { Cell, Half, Button, Field, Hgroup, Gravity, Picture, Upload },
  data() {
    return {
      modifyArray: [],
      duplicate: {
        id: null,
        name: null,
        email: null
      },
      member: {
        id: null,
        password: null,
        confirm: null,
        name: null,
        email: null,
        picture: {
          files: null,
          result: null
        }
      }
    };
  },
  created() {
    Object.entries(this.user).forEach(([key, value]) => {
      if (key in this.member && key !== 'picture') {
        this.member[key] = value;
      }
    });
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isUserLoggedIn'])
  },
  methods: {
    ...mapActions(['checkId', 'checkName', 'checkEmail', 'signup']),
    handlePicture(payload) {
      this.member.picture.files = payload.get('files');
      // console.log('this.member.picture.files: ', this.member.picture.files);

      this.member.picture.result = payload.get('result');
      // console.log('this.member.picture.result: ', this.member.picture.result);
    },
    handleInsert(payload) {
      const { name, value } = payload;

      this.member[name] = value;
    },
    handleEraser(payload) {
      // console.log('중복 확인이 필요한 <input type="text" />에 변동이 발생했습니다.');

      const { eraser } = payload;

      this.duplicate[eraser] = null;

      this.modifyArray.push(eraser);

      this.modifyArray = this.$_.uniq(this.modifyArray);
    },
    handleIdValidate(payload) {
      const { id } = payload;

      if (this.$validate.id({ id, refs: this.$refs })) return;

      this.checkId({ id })
        .then((response) => {
          if (response.length > 0) {
            // console.log('이미 사용 중인 아이디입니다.');

            alert('이미 사용 중인 아이디입니다.');
          } else {
            // console.log('사용 가능한 아이디입니다.');

            alert('사용 가능한 아이디입니다.');

            this.duplicate.id = id;

            const index = this.modifyArray.findIndex((element) => element === 'id');

            if (index > -1) this.modifyArray.splice(index, 1);
          }
        })
        .catch((error) => {
          // console.log('아이디 확인에 실패했습니다.');

          alert('아이디 확인에 실패했습니다.');

          console.error(error);
        });
    },
    handleNameValidate(payload) {
      const { name } = payload;

      if (this.$validate.name({ name, refs: this.$refs })) return;

      this.checkName({ name })
        .then((response) => {
          if (response.length > 0) {
            // console.log('이미 사용 중인 닉네임입니다.');

            alert('이미 사용 중인 닉네임입니다.');
          } else {
            // console.log('사용 가능한 닉네임입니다.');

            alert('사용 가능한 닉네임입니다.');

            this.duplicate.name = name;

            const index = this.modifyArray.findIndex((element) => element === 'name');

            if (index > -1) this.modifyArray.splice(index, 1);
          }
        })
        .catch((error) => {
          // console.log('닉네임 확인에 실패했습니다.');

          alert('닉네임 확인에 실패했습니다.');

          console.error(error);
        });
    },
    handleEmailValidate(payload) {
      const { email } = payload;

      if (this.$validate.email({ email, refs: this.$refs })) return;

      this.checkEmail({ email })
        .then((response) => {
          if (response.length > 0) {
            // console.log('이미 사용 중인 이메일입니다.');

            alert('이미 사용 중인 이메일입니다.');
          } else {
            // console.log('사용 가능한 이메일입니다.');

            alert('사용 가능한 이메일입니다.');

            this.duplicate.email = email;

            const index = this.modifyArray.findIndex((element) => element === 'email');

            if (index > -1) this.modifyArray.splice(index, 1);
          }
        })
        .catch((error) => {
          // console.log('이메일 확인에 실패했습니다.');

          alert('이메일 확인에 실패했습니다.');

          console.error(error);
        });
    },
    handleProfile() {
      const { id, password, confirm, name, email } = this.member;

      const picture = this.member.picture.files;

      let result = false;

      if (this.$validate.require(this.member)) return;

      Object.keys(this.duplicate).map((currentValue) => {
        if (this.duplicate[currentValue] === null) {
          if (this.modifyArray.length > 0) {
            // console.log(`this.duplicate.${currentValue} 값이 null이고 중복 확인이 필요한 <input type="text" />에 변동이 발생했기 때문에 this.$validate.empty()를 실행합니다.`);

            const index = this.modifyArray.findIndex((element) => element === currentValue);

            if (index > -1) {
              const test = this.$validate.empty({ key: currentValue, value: this.duplicate[currentValue] });

              if (test) {
                // console.log('더 이상 진입할 수 없습니다.');
                result = true;
              }
            }
          } else {
            // console.log(`this.duplicate.${currentValue} 값이 null이지만 중복 확인이 필요한 <input type="text" />들에 변동이 발생하지 않았기 때문에 this.$validate.empty()를 실행하지 않습니다.`);
          }

          return false;
        }
      });

      if (result) return;

      if (this.$validate.id({ id, refs: this.$refs })) return;

      if (this.$validate.password({ password, refs: this.$refs })) return;

      if (this.$validate.confirm({ password, confirm, refs: this.$refs })) return;

      if (this.$validate.name({ name, refs: this.$refs })) return;

      if (this.$validate.email({ email, refs: this.$refs })) return;

      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('picture', picture);

      this.signup(formData)
        .then(() => {
          // console.log('회원 가입에 성공했습니다.');

          alert('회원 가입에 성공했습니다.');

          this.$router.push({ name: 'login' });
        })
        .catch((error) => {
          // console.log('회원 가입에 실패했습니다.');

          alert('회원 가입에 실패했습니다.');

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
  overflow: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.area_member .inner_member {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  max-width: 32rem;
  margin: 0 auto;
}

.area_member .inner_member .outer_cell {
  height: 100%;
}

.area_member .inner_member > :deep(.outer_cell > .inner_cell) {
  padding: 4.8rem 0;
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

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
}
</style>
