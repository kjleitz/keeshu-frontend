<template>
  <b-nav
    v-bind="$attrs"
    :class="['main-nav', $route.name]"
    v-on="$listeners"
  >
    <transition name="fade" appear>
      <b-nav-item :to="{ name: 'Home' }">
        Home
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item v-if="debug" :to="{ name: 'Info' }">
        Info
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item :to="{ name: 'Hotels' }">
        Hotel<span class="hotels-last-letter">s</span>
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item :to="{ name: 'Us' }">
        Us
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item :to="{ name: 'Map' }">
        Map
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item v-if="$store.getters.authorizedFor('rsvp')" :to="{ name: 'Rsvp' }">
        RSVP
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <!-- <b-nav-item v-if="$store.getters.authorizedFor('stream')" :to="{ name: 'Stream' }">
        Stream
      </b-nav-item> -->
      <b-nav-item :to="{ name: 'Stream' }">
        Stream
      </b-nav-item>
    </transition>
    <!-- <transition name="fade" appear>
      <b-nav-item
        v-if="!$store.getters.authorized"
        @click="showAuthSplash"
      >
        More
        <span class="passcode-required">
          (passcode required)
        </span>
      </b-nav-item>
    </transition> -->
    <transition name="fade" appear>
      <b-nav-item v-if="debug && $route.name === 'Home'" @click="forgetMe">
        Forget me
      </b-nav-item>
    </transition>
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
  },

  computed: {
    authorized(): boolean {
      return store.getters.authorized;
    },
  },

  methods: {
    showAuthSplash(): void {
      store.commit("showAuth");
    },

    forgetMe(): void {
      localStorage.clear();
      window.location.reload();
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

.main-nav {
  font-family: 'Jacques Francois Shadow', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  // display: inline-block;
  padding: 30px;
  z-index: 1000;
  font-size: 1.5rem;
  align-items: center;

  &.nav {
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  // &:not(.vertical) {
  //   align-items: center;

  //   a {
  //     padding-top: 0;
  //     padding-bottom: 0;
  //     padding-left: 2rem;
  //     padding-right: 2rem;

  //     @include media-breakpoint-down(sm) {
  //       padding-left: 0.35rem;
  //       padding-right: 0.35rem;
  //       font-size: 0.8em;
  //     }
  //   }
  // }

  a {
    font-weight: bold;
    color: #2c3e50;
    white-space: nowrap;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;

    @include media-breakpoint-down(sm) {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      font-size: 0.75em;
    }

    &.router-link-exact-active {
      color: #42b983;
    }

    // &.active {
    //   color: #42b983;
    // }

    .passcode-required {
      display: none;

      @include media-breakpoint-up(sm) {
        display: inline;
      }
    }
  }

  // .top-nav-link {
  //   &::after {
  //     content: " | ";
  //     display: inline;
  //   }
  // }
}
</style>
