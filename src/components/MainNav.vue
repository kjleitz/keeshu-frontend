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
    <b-nav-item :to="{ name: 'Info' }">
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
  </b-nav>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  // props: {
  //   linkStyles: {
  //     type: Object as PropType<Partial<CSSStyleDeclaration>>,
  //     default: (): Partial<CSSStyleDeclaration> => ({}),
  //   },

  //   linkActiveStyles: {
  //     type: Object as PropType<Partial<CSSStyleDeclaration>>,
  //     default: (): Partial<CSSStyleDeclaration> => ({}),
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
