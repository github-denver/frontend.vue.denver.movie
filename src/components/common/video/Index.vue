<template>
  <article class="video_common" v-if="timeline.length > 0">
    <Hgroup :attributes="{ heading: attributes.heading, half: true }" />

    <div class="inner_video">
      <div class="thumbnail_video">
        <iframe class="iframe_youtube" :src="timeline[0].video" :title="timeline[0].subject" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        <!-- <Button
          :attributes="{
            tagName: 'button',
            className: 'button_mute',
            event: () => {}
          }"
        >
          <template v-slot:children>
            <Icon :attributes="{ className: 'icon_mute', text: '음소거' }" />
          </template>
        </Button> -->
      </div>

      <div class="information_video">
        <div class="inner_information">
          <div class="hgroup_information" v-if="timeline.length > 0">
            <img :src="`${getBaseURL}/${getUploadFolderName}/${timeline[0].signature}`" alt="" class="image_signature" />

            <div class="box_information">
              <strong class="title_information">{{ timeline[0].subject }}</strong>

              <span class="text_information">15</span>
            </div>

            <p class="description_information">{{ timeline[0].content }}</p>
          </div>

          <Gravity v-if="timeline.length > 0">
            <template v-slot:children>
              <Half :attributes="{ className: { inner: {} } }" :styles="{ inner: {} }">
                <template v-slot:first>
                  <Button
                    :attributes="{
                      className: 'regular round pure thick',
                      event: () => {
                        handleRouter(timeline[0].number);
                      }
                    }"
                  >
                    <template v-slot:children>
                      <span class="text_local">자세히 보기</span>
                    </template>
                  </Button>
                </template>

                <template v-slot:second></template>
              </Half>
            </template>
          </Gravity>
        </div>

        <Timeline />
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Half from '@/components/unit/half/Index.vue';
import Button from '@/components/unit/button/Index.vue';
import Hgroup from '@/components/common/hgroup/Index.vue';
import Timeline from '@/components/common/timeline/Index.vue';
import Gravity from '@/components/common/gravity/Index.vue';

export default {
  name: 'Video',
  components: { Button, Half, Hgroup, Timeline, Gravity },
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
  computed: {
    ...mapState(['timeline']),
    ...mapGetters(['getBaseURL', 'getUploadFolderName'])
  },
  created() {
    this.fetchTimeline({ number: 1 });
  },
  methods: {
    ...mapActions(['fetchTimeline']),
    handleRouter(number) {
      this.$router.push({
        query: {
          category: 'promotion',
          layer: 'episode',
          number
        }
      });
    }
  }
};
</script>

<style scoped>
/* video_common
---------- ---------- ---------- ---------- ---------- */
.video_common .inner_video {
  margin: 2.4rem 4.8rem 0;
  padding-bottom: 4.8rem;
  border-radius: 0.6rem 0 0 0.6rem;
}

/* thumbnail_video
---------- ---------- ---------- ---------- ---------- */
.thumbnail_video {
  overflow: hidden;
  display: inline-block;
  position: relative;
  width: 44.5%;
  padding-top: 23.3744%;
  box-sizing: border-box;
  vertical-align: top;
}

.thumbnail_video .iframe_youtube {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

/* information_video
---------- ---------- ---------- ---------- ---------- */
.information_video {
  overflow: hidden;
  display: inline-block;
  position: relative;
  width: 55.5%;
  padding-top: 23.3744%;
  box-sizing: border-box;
  vertical-align: top;
}

.information_video .inner_information {
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 2.4rem;
  padding: 5.7553%;
  /* padding: 5rem 5rem 6.8rem 5rem; */
}

.information_video .title_information {
  display: inline-block;
  font-weight: 500;
  font-size: 1.8rem;
  vertical-align: middle;
}

.information_video .title_information + .text_information {
  margin-left: 1.2rem;
}

.information_video .text_information {
  display: inline-block;
  padding: 0.4rem;
  font-size: 1rem;
  background-color: #e94e58;
  vertical-align: middle;
}

.information_video .description_information {
  margin-top: 1rem;
  font-size: 1.6rem;
}

.information_video .timeline_common {
  overflow: hidden;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  margin-bottom: 0;
  padding: 0 4.8rem;
}

/* hgroup_information
---------- ---------- ---------- ---------- ---------- */
.hgroup_information .image_signature {
  display: block;
  height: 9.6rem;
}

.hgroup_information .image_signature + .box_information {
  margin-top: 2.4rem;
}

.hgroup_information .box_information + .description_information {
  margin-top: 1.2rem;
}

.hgroup_information + .gravity_common {
  margin-top: 4.8rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* information_video
---------- ---------- ---------- ---------- ---------- */
.information_video :deep(.gravity_common .inner_half) {
  width: auto;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* video_common
  ---------- ---------- ---------- ---------- ---------- */
  .video_common .inner_video {
    margin: 1.2rem 0 0;
    padding-bottom: 0;
    border-radius: 0.6rem 0 0 0.6rem;
  }

  /* thumbnail_video
  ---------- ---------- ---------- ---------- ---------- */
  .thumbnail_video {
    width: 100%;
    padding-top: 56.25%;
  }

  .thumbnail_video iframe {
    width: 100%;
    vertical-align: top;
  }

  .thumbnail_video + .information_video {
    margin-top: 2.4rem;
  }

  /* information_video
  ---------- ---------- ---------- ---------- ---------- */
  .information_video {
    width: 100%;
    padding: 0 2.4rem;
  }

  .information_video .inner_information {
    position: static;
    padding: 0;
  }

  .information_video .title_information {
    font-size: 1.6rem;
  }

  .information_video .description_information {
    font-size: 1.4rem;
  }

  /* hgroup_information
  ---------- ---------- ---------- ---------- ---------- */
  .hgroup_information .image_signature {
    max-width: 100%;
    height: auto;
  }

  .hgroup_information + .gravity_common {
    margin-top: 2.4rem;
  }
}
</style>
