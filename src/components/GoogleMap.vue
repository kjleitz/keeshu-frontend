<template>
  <iframe
    :src="mapSrc"
    frameborder="0"
    allowfullscreen
    class="google-map"
  ></iframe>
</template>

<script lang="ts">
import Vue from 'vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNoHa5lg90bE40snVPqrSlXoSyqjORzWs';

export default Vue.extend({
  computed: {
    mapSrc(): string {
      const key = GOOGLE_MAPS_API_KEY;
      return `https://www.google.com/maps/embed/v1/place?key=${key}&q=Lord+Thompson+Manor,Thompson+CT`;
    },
  },
});
</script>
