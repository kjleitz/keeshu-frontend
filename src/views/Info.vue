<template>
  <div class="info-view">
    <MicrosoftWord class="ms-word">
      <!-- ... -->
    </MicrosoftWord>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MicrosoftWord from '@/components/MicrosoftWord.vue';

export default Vue.extend({
  components: {
    MicrosoftWord,
  },
});
</script>

<style lang="scss">
.info-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  .ms-word {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
