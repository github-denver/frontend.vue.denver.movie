<template>
  <footer class="footer">
    <Heading :attributes="{ tagName: 'h2', invisible: true }">
      <template v-slot:subject>
        <span class="text_local">정보 및 약관</span>
      </template>
    </Heading>

    <Half :attributes="{ className: { outer: 'utility', inner: {} } }" :styles="{ inner: { first: {} } }">
      <template v-slot:first>
        <ul class="list_notice">
          <li>
            <router-link
              :to="{
                name: 'list',
                params: {
                  service: 'notice',
                  number: '1'
                }
              }"
              class="link_notice"
            >
              <span class="text_notice">공지사항</span>
            </router-link>

            <router-link
              :to="{
                name: 'read',
                params: {
                  service: 'notice',
                  number: '1'
                }
              }"
              class="link_notice"
            >
              <strong class="subject_notice">안녕하세요.</strong>
            </router-link>
          </li>
        </ul>
      </template>

      <template v-slot:second>
        <ul class="list_social">
          <template v-for="(list, index) in utility">
            <li v-if="!!list.state === !!isUserLoggedIn" :key="index">
              <router-link :to="{ name: list.route }" class="link_social" @click.native="$transport.event(!!list.event ? list.event : null)">{{ list.text }}</router-link>
            </li>
          </template>
        </ul>
      </template>
    </Half>

    <Half :attributes="{ className: { outer: 'information', inner: {} } }" :styles="{ inner: { first: {} } }">
      <template v-slot:first>
        <router-link :to="{ name: 'main' }" class="link_brand">덴버무비</router-link>

        <p class="text_copyright">이 사이트는 개인 포트폴리오 사이트입니다.</p>
      </template>

      <template v-slot:second></template>
    </Half>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Half from '@/components/unit/half/Index.vue';
import Heading from '@/components/unit/heading/Index.vue';

export default {
  name: 'Footer',
  components: { Half, Heading },
  computed: {
    ...mapState(['utility']),
    ...mapGetters(['isUserLoggedIn'])
  },
  methods: {
    ...mapActions(['signout', 'fetchUtility'])
  }
};
</script>

<style scoped>
/* footer
---------- ---------- ---------- ---------- ---------- */
.footer {
  padding-bottom: 4.8rem;
  background-color: #0f223c;
}

.footer .outer_half.utility,
.footer .outer_half.information {
  padding-right: 4.8rem;
  padding-left: 4.8rem;
}

/* utility */
.footer .outer_half.utility {
  background-color: #122947;
}

/* information */
.footer .outer_half.information .link_brand {
  display: inline-block;
  font-weight: 500;
  font-size: 2.4rem;
  vertical-align: top;
}

.footer .outer_half.information .link_brand + .text_copyright {
  margin-top: 1.2rem;
}

.footer .outer_half.information .text_copyright {
  font-size: 1.2rem;
}

/* list_notice
---------- ---------- ---------- ---------- ---------- */
.list_notice .link_notice {
  overflow: hidden;
  display: block;
  padding: 1.2rem;
}

.list_notice .link_notice:first-child {
  float: left;
  padding: 1.2rem 0;
}

.list_notice .text_notice {
  font-weight: 400;
  font-size: 1.2rem;
}

.list_notice .text_notice + .subject_notice {
  margin-left: 4.8rem;
}

.list_notice .subject_notice {
  overflow: hidden;
  display: block;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* list_social
---------- ---------- ---------- ---------- ---------- */
.list_social {
  margin-left: -2.4rem;
  font-size: 0;
}

.list_social li {
  display: inline-block;
  position: relative;
  margin-left: 1.2rem;
  vertical-align: middle;
}

.list_social .link_social {
  display: block;
  font-size: 1.2rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// :deep ////////// //////////
========== ========== ========== ========== ========== */
/* footer
---------- ---------- ---------- ---------- ---------- */
/* information */
.footer :deep(.outer_half.information) {
  padding-top: 2.4rem;
}

/* ========== ========== ========== ========== ==========
////////// ////////// Media Query ////////// //////////
========== ========== ========== ========== ========== */
@media only screen and (max-width: 1023px) {
  /* footer
  ---------- ---------- ---------- ---------- ---------- */
  .footer {
    padding-bottom: 0;
  }

  .footer .outer_half.utility,
  .footer .outer_half.information {
    padding-right: 2.4rem;
    padding-left: 2.4rem;
  }

  /* information */
  .footer .outer_half.information {
    padding-bottom: 2.4rem;
  }

  /* list_social
  ---------- ---------- ---------- ---------- ---------- */
  .list_social {
    margin-left: -1.2rem;
  }

  .list_social .link_social {
    padding: 1.2rem 0;
  }

  /* ========== ========== ========== ========== ==========
  ////////// ////////// :deep ////////// //////////
  ========== ========== ========== ========== ========== */
  /* footer
  ---------- ---------- ---------- ---------- ---------- */
  /* utility */
  .footer :deep(.outer_half.utility .inner_half) {
    width: 100%;
    border-top: 0.1rem solid #1b3c69;
    text-align: left;
  }

  .footer :deep(.outer_half.utility .inner_half:first-child) {
    border-top: 0 none;
  }

  /* information */
  .footer :deep(.outer_half.information .inner_half) {
    width: 100%;
  }
}
</style>
