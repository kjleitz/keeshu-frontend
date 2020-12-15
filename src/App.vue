<template>
  <div id="app">
    <b-nav :vertical="navVertical" id="main-nav">
      <b-nav-item :to="{ name: 'Home' }">
        Home
      </b-nav-item>
      <b-nav-item :to="{ name: 'Us' }">
        Us
      </b-nav-item>
      <b-nav-item :to="{ name: 'Map' }">
        Map
      </b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    navVertical(): boolean {
      return this.$route.name === 'Home';
    },
  },

  created(): void {
    console.log(this.$route.name);
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Jacques Francois Shadow', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#main-nav {
  position: fixed;
  top: 0;
  left: 0;
  display: inline-block;
  padding: 30px;
  z-index: 1000;
  font-size: 1.5rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }

    // &.active {
    //   color: #42b983;
    // }
  }

  // .top-nav-link {
  //   &::after {
  //     content: " | ";
  //     display: inline;
  //   }
  // }
}
</style>
