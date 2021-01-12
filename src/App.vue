<template>
  <div id="app">
    <!-- <MainNav :vertical="navVertical"/> -->
    <router-view/>
    <!-- <keep-alive>
      <router-view/>
    </keep-alive> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import MainNav from '@/components/MainNav.vue';

export default Vue.extend({
  // components: {
  //   MainNav,
  // },

  // computed: {
  //   navVertical(): boolean {
  //     return this.$route.name === 'Home';
  //   },
  // },
});
</script>

<style lang="scss">
// html, body {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   min-height: 100%;
//   margin: 0;
//   padding: 0;
//   overflow-y: scroll;
// }
html, body {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // color: #2c3e50;
}
</style>
