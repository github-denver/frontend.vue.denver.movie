<template>
  <div class="layer_common">
    <div class="dimmed"></div>

    <div class="inner_layer">
      <Cell>
        <template v-slot:children>
          <div class="area_layer">
            <header class="header_layer"></header>
            <section class="container_layer" v-if="contents.length > 0">
              <div class="visual_common">
                <Thumbnail :attributes="{ image: { url: contents[0].detail }, gradation: true }" />

                <div class="inner_visual">
                  <Cell>
                    <template v-slot:children>
                      <Half :attributes="{ className: { outer: '', inner: {} } }" :styles="{ inner: { first: {} } }">
                        <template v-slot:first>
                          <Information :attributes="{ subject: contents[0].subject, description: contents[0].content }">
                            <template v-slot:children>
                              <strong class="accessibility">장르</strong>
                              <!-- <ul class="list_categories" v-if="contents[0].genre"> -->
                              <!-- <li v-for="(list, index) in contents[0].genre.split(',')" :key="index">
                                  <span class="text_categories">{{ list }}</span>
                                </li> -->
                              <!-- <li v-for="(list, index) in contents[0].genre" :key="index">
                                  <span class="text_categories">{{ list }}</span>
                                </li> -->
                              <!-- </ul> -->
                            </template>
                          </Information>
                        </template>

                        <template v-slot:second>
                          <div class="poster_common">
                            <img :src="`${getBaseURL}/${getUploadFolderName}/${contents[0].poster}`" alt="" class="image_poster" />
                          </div>
                        </template>
                      </Half>
                    </template>
                  </Cell>
                </div>
              </div>

              <div class="inner_container_layer">
                <div class="box_youtube">
                  <iframe class="iframe_youtube" :src="contents[0].video" :title="contents[0].subject" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <form method="post" enctype="multipart/form-data" @submit.prevent="submit" novalidate>
                  <textarea class="textarea_comments" placeholder="이 작품에 대한 내 평가를 남겨보세요!" v-model="comment" v-if="user.name"></textarea>
                  <textarea class="textarea_comments" placeholder="로그인 후 이 작품에 대한 내 평가를 남길 수 있어요!" @click="handleConfirm" readonly v-else></textarea>

                  <Gravity v-if="user.name">
                    <template v-slot:children>
                      <Button
                        :attributes="{
                          type: 'submit',
                          className: 'regular max round active'
                        }"
                      >
                        <template v-slot:children>
                          <span class="text_local">등록</span>
                        </template>
                      </Button>
                    </template>
                  </Gravity>
                </form>

                <ul class="list_comments" v-if="comments.length > 0">
                  <li class="item_comments" v-for="comment in comments" :key="comment.seq">
                    <Half :attributes="{ className: { outer: '', inner: {} } }" :styles="{ inner: { first: {} } }">
                      <template v-slot:first>
                        <Picture :attributes="{ images: `${getBaseURL}/${getUploadFolderName}/${comment.picture}` }" />

                        <span class="text_profile">{{ comment.name }}</span>
                      </template>

                      <template v-slot:second>
                        <Gravity v-if="user.id === comment.id && false">
                          <template v-slot:children>
                            <Button :attributes="{ type: 'submit', className: 'small round active' }">
                              <template v-slot:children>
                                <span class="text_local">수정</span>
                              </template>
                            </Button>

                            <Button :attributes="{ type: 'submit', className: 'small round active' }">
                              <template v-slot:children>
                                <span class="text_local">삭제</span>
                              </template>
                            </Button>
                          </template>
                        </Gravity>
                      </template>
                    </Half>

                    <p class="text_comments">{{ comment.comment }}</p>

                    <ul class="list_information">
                      <li>
                        <span class="accessibility">작성일</span>
                        <span class="text_information">{{ comment.regdate }}</span>
                      </li>
                      <li>
                        <span class="accessibility">조회 수</span>
                        <span class="text_information">{{ comment.count }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>

            <footer class="footer_layer">
              <Button :attributes="{ className: '', event: handleClose }">
                <template v-slot:children>
                  <Icon :attributes="{ className: 'icon_cross', text: '닫기' }" />
                </template>
              </Button>
            </footer>
          </div>
        </template>
      </Cell>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

import Icon from '@/components/unit/icon/Index.vue';
import Cell from '@/components/unit/cell/Index.vue';
import Half from '@/components/unit/half/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Thumbnail from '@/components/common/thumbnail/Index.vue';
import Information from '@/components/common/information/Index.vue';
import Gravity from '@/components/common/gravity/Index.vue';
import Picture from '@/components/common/picture/Index.vue';

export default {
  name: 'Layer',
  components: { Icon, Cell, Half, Button, Thumbnail, Information, Gravity, Picture },
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
      comment: null
    };
  },
  mounted() {
    const { category, number } = this.$route.query;

    this.findContents({ category, number });

    this.fetchComments({ number });
  },
  destroyed() {},
  computed: {
    ...mapState(['user', 'contents', 'comments']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  },
  methods: {
    ...mapActions(['findContents', 'fetchComments', 'addComments']),
    ...mapMutations({
      REMOVE_DATA: 'REMOVE_DATA'
    }),
    handleConfirm() {
      if (window.confirm('로그인 후 이 작품에 대한 내 평가를 남길 수 있어요!\n로그인하실래요?')) {
        this.$router.push({ name: 'login' });
      }
    },
    handleClose() {
      this.$router.push({ path: this.$route.path });
    },
    submit() {
      const { number } = this.$route.query;

      const { comment } = this;

      if (!comment) {
        alert('내용을 입력해 주세요.');

        return false;
      }

      const formData = new FormData();
      formData.append('key', number);
      formData.append('comment', comment);

      this.addComments(formData)
        .then(() => {
          this.comment = null;

          this.fetchComments({ number });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
/* layer_common
---------- ---------- ---------- ---------- ---------- */
.layer_common {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.layer_common .inner_layer {
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

/* area_layer
---------- ---------- ---------- ---------- ---------- */
.area_layer {
  overflow: hidden;
  position: relative;
  z-index: 10;
  max-width: 108rem;
  margin: 6.398rem auto;
  border-radius: 0.6rem;
  background-color: #000;
}

/* header_layer
---------- ---------- ---------- ---------- ---------- */
.header_layer {
  position: relative;
}

/* container_layer
---------- ---------- ---------- ---------- ---------- */
.container_layer .inner_container_layer {
  padding: 4.8rem;
}

.container_layer .inner_container_layer .list_comments {
  padding-top: 4.8rem;
}

/* footer_layer
---------- ---------- ---------- ---------- ---------- */
.footer_layer .button_common {
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 1;
}

/* dimmed
---------- ---------- ---------- ---------- ---------- */
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

/* visual_common
---------- ---------- ---------- ---------- ---------- */
.visual_common {
  position: relative;
}

.visual_common .inner_visual {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 0 4.8rem;
}

.visual_common :deep(.outer_half .inner_half) {
  vertical-align: top;
}

.visual_common .information_common {
  position: relative;
  z-index: 1;
}

/* .visual_common .information_common {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
} */

.visual_common .information_common :deep(.title_common) {
  font-size: 4rem;
}

.visual_common .information_common :deep(.title_common + .description_common) {
  margin-top: 0.6rem;
  white-space: normal;
}

.visual_common .information_common :deep(.description_common) {
  font-size: 1.4rem;
}

.visual_common .information_common .list_categories {
  padding-top: 2.4rem;
}

/* wrapper_poster
---------- ---------- ---------- ---------- ---------- */
.poster_common {
  overflow: hidden;
  display: inline-block;
  position: relative;
  width: 20rem;
  padding-top: 59.0163%;
  border-radius: 0.6rem;
  vertical-align: middle;
}

.poster_common .image_poster {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  pointer-events: none;
}

/* list_categories
---------- ---------- ---------- ---------- ---------- */
.list_categories {
  margin: -0.6rem 0 0 -1.2rem;
}

.list_categories li {
  display: inline-block;
  position: relative;
  margin: 0.6rem 0 0 0.6rem;
  padding: 0 0 0 0.6rem;
  font-size: 1.4rem;
  vertical-align: middle;
}

.list_categories li:before {
  position: absolute;
  top: 0.4rem;
  bottom: 0.4rem;
  left: 0;
  z-index: 1;
  width: 0.1rem;
  background-color: #fff;
  vertical-align: middle;
  content: '';
}

.list_categories li:first-child:before {
  background-color: transparent;
}

/* textarea_comments
---------- ---------- ---------- ---------- ---------- */
.textarea_comments {
  width: 100%;
  height: 18rem;
  padding: 1.2rem;
  border: 0.2rem solid #1b3c69;
  border-radius: 0.6rem;
  box-sizing: border-box;
  font-size: 1.4rem;
  background-color: #0f223c;
  vertical-align: top;
  resize: none;
  outline: none;
}

.textarea_comments:first-child {
  margin-top: 2.4rem;
}

.textarea_comments + .gravity_common {
  margin-top: 2.4rem;
}

/* list_comments
---------- ---------- ---------- ---------- ---------- */
.list_comments {
  margin-top: -1.2rem;
}

.list_comments .item_comments {
  margin-top: 1.2rem;
  padding: 1.2rem 0;
  border-top: 0.1rem solid #1b3c69;
}

.list_comments .item_comments:first-child {
  padding-top: 0;
  border-top: 0 none;
}

.list_comments .picture_common {
  display: inline-block;
  width: 6rem;
  height: 6rem;
  margin: 0;
  vertical-align: middle;
}

.list_comments .picture_common + .text_profile {
  margin-left: 1.2rem;
}

.list_comments .text_profile {
  display: inline-block;
  font-size: 1.6rem;
  vertical-align: middle;
}

.list_comments .gravity_common {
  margin-left: -1.2rem;
}

.list_comments .gravity_common :deep(.button_common.small.active) {
  margin-left: 1.2rem;
}

.list_comments .text_comments:first-child {
  margin-top: 0;
}

.list_comments .text_comments {
  margin-top: 1.2rem;
  font-size: 1.4rem;
}

.list_comments .list_information {
  margin-top: 0;
}

.list_comments .list_information:first-child {
  margin-top: -1.2rem;
}

/* list_information
  ---------- ---------- ---------- ---------- ---------- */
.list_information {
  margin: -1.2rem 0 0 -1.2rem;
}

.list_information li {
  display: inline-block;
  margin: 1.2rem 0 0 1.2rem;
  font-size: 1.2rem;
  vertical-align: middle;
}

/* box_youtube
---------- ---------- ---------- ---------- ---------- */
.box_youtube {
  position: relative;
  height: 54.9rem;
}

.box_youtube .iframe_youtube {
  width: 100%;
  height: 100%;
}

.box_youtube + .textarea_comments {
  margin-top: 2.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* layer_common
  ---------- ---------- ---------- ---------- ---------- */
  .layer_common .inner_layer .outer_cell {
    height: 100%;
  }

  /* area_layer
  ---------- ---------- ---------- ---------- ---------- */
  .area_layer {
    height: 100%;
    margin: 0 auto;
  }

  /* container_layer
  ---------- ---------- ---------- ---------- ---------- */
  .container_layer .inner_container_layer {
    padding: 2.4rem;
  }

  .visual_common .inner_visual {
    position: static;
    padding: 0 2.4rem;
  }

  .visual_common .information_common .list_categories {
    padding-top: 1.2rem;
  }

  .visual_common .inner_visual :deep(.outer_half .inner_half) {
    display: none;
    width: 100%;
    margin-top: 2.4rem;
  }

  .visual_common .inner_visual :deep(.outer_half .inner_half:first-child) {
    display: block;
    margin-top: 0;
  }

  /* textarea_comments
  ---------- ---------- ---------- ---------- ---------- */
  .textarea_comments {
    height: 12rem;
  }

  /* poster_common
  ---------- ---------- ---------- ---------- ---------- */
  .poster_common {
    width: 100%;
  }

  /* box_youtube
  ---------- ---------- ---------- ---------- ---------- */
  .box_youtube {
    height: auto;
    padding-top: 59.0163%;
  }

  .box_youtube .iframe_youtube {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
