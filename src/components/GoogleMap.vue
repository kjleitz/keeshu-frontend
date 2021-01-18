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

export default Vue.extend({
  computed: {
    mapSrc(): string {
      const key = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
      return `https://www.google.com/maps/embed/v1/place?key=${key}&q=Lord+Thompson+Manor,Thompson+CT`;
    },
  },
});
</script>
