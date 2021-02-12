<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
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
