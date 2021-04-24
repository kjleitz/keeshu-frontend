<template>
  <!-- <b-nav
    v-bind="$attrs"
    :vertical="vertical"
    :class="['main-nav', $route.name, { vertical }]"
    v-on="$listeners"
  > -->
  <b-nav
    v-bind="$attrs"
    :class="['main-nav', $route.name]"
    v-on="$listeners"
  >
    <b-nav-item :to="{ name: 'Home' }">
      Home
    </b-nav-item>
    <b-nav-item v-if="debug" :to="{ name: 'Info' }">
      Info
    </b-nav-item>
    <b-nav-item :to="{ name: 'Hotels' }">
      Hotel<span class="hotels-last-letter">s</span>
    </b-nav-item>
    <b-nav-item :to="{ name: 'Us' }">
      Us
    </b-nav-item>
    <b-nav-item :to="{ name: 'Map' }">
      Map
    </b-nav-item>
    <!-- <b-nav-form v-if="!authorized" @submit.stop.prevent="logIn">
      <b-form-input v-model="passcode"></b-form-input>
      <b-button type="submit">yeet</b-button>
    </b-nav-form> -->
    <b-nav-item v-if="debug || $store.state.userType === 'irl'" :to="{ name: 'Rsvp' }">
      RSVP
    </b-nav-item>
  </b-nav>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';

export default Vue.extend({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },

    // linkStyles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: (): Partial<CSSStyleDeclaration> => ({}),
    // },

    // linkActiveStyles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: (): Partial<CSSStyleDeclaration> => ({}),
    // },
  },

  // data() {
  //   return {
  //     passcode: "",
  //   };
  // },

  computed: {
    authorized(): boolean {
      return store.getters.authorized;
    },
  },

  // methods: {
  //   logIn(): void {
  //     store.commit("authorize", this.passcode);
  //     this.passcode = "";
  //   },
  // },
});
</script>

<style lang="scss">
.main-nav {
  font-family: 'Jacques Francois Shadow', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  // display: inline-block;
  padding: 30px;
  z-index: 1000;
  font-size: 1.5rem;

  // &:not(.vertical) {
  //   position: sticky;
  // }

  a {
    font-weight: bold;
    color: #2c3e50;
    white-space: nowrap;

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
