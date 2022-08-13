<template>
  <div id="app">
    <router-view :key="$route.path" />

    <Layer v-if="visible.single.layer.flag === 'episode'" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Layer from '@/components/common/layer/Index.vue';

export default {
  name: 'App',
  components: { Layer },
  watch: {
    $route(to) {
      this.$store.commit('SET_LAYER', { layer: to.query.layer });
    }
  },
  computed: {
    ...mapState(['visible'])
  },
  methods: {
    ...mapMutations({
      SET_LAYER: 'SET_LAYER'
    })
  }
};
</script>

<style>
@import '@/assets/css/reset.css';
@import '@/assets/css/accessibility.css';
@import '@/assets/css/fonts.css';
@import '@/assets/css/icon.css';
@import '@/assets/css/media.css';
@import '@/assets/css/custom.css';
</style>
