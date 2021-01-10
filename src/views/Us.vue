<template>
  <div class="us-view">
    <MainNav/>

    <p>
      Hey look, it's the "Us" page!
    </p>
    <p>
      Work in progress/patience required.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';

export default Vue.extend({
  components: {
    MainNav,
  },
});
</script>

<style lang="scss">
.us-view {
  .main-nav {
    position: sticky;
    top: 0;
  }
}
</style>
