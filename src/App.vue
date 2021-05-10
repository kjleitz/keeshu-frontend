<template>
  <div id="app">
    <!-- <transition name="fade">
      <AuthSplash
        v-if="!$store.getters.authorized && !$store.state.authDeferred"
        @submit="authorize($event)"
        @cancel="deferAuth"
      />
    </transition> -->
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
// import AuthSplash from '@/components/AuthSplash.vue';

export default Vue.extend({
  // components: {
  //   AuthSplash,
  // },

  methods: {
    authorize(passcode: string): void {
      store.commit("authorize", passcode);
      const { intendedDestination } = store.state;
      if (
        intendedDestination
        && intendedDestination !== this.$route.name
        && store.getters.authorizedFor(intendedDestination)
      ) {
        this.$router.push({ name: intendedDestination });
      }
    },

    deferAuth(): void {
      store.commit("deferAuth");
    },
  },
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-fast-enter-active, .fade-fast-leave-active {
    transition: opacity .25s;
  }

  .fade-fast-enter, .fade-fast-leave-to {
    opacity: 0;
  }
}
</style>
