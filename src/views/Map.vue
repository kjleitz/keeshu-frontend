<template>
  <div :style="rootStyles" class="map-view">
    <MainNav/>
    <Map class="map"/>
  </div>
</template>

<script lang="ts">
import _ from 'underscore';
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
import Map from '@/components/Map.vue';

let syncResize = _.noop;

export default Vue.extend({
  components: {
    MainNav,
    Map,
  },

  data() {
    return {
      // Setting width and height in JS because 100vw/100vh act weird with the
      // disappearing address bar on mobile, and they don't play nicely with
      // scrollbars... sucks, but them's the breaks.
      // TODO: put these on the store
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
    };
  },

  computed: {
    rootStyles(): Partial<CSSStyleDeclaration> {
      return {
        position: 'absolute',
        top: '0',
        left: '0',
        width: `${this.clientWidth}px`,
        height: `${this.clientHeight}px`,
      };
    },
  },

  created(): void {
    this.addListeners();
  },

  beforeDestroy(): void {
    this.removeListeners();
  },

  beforeRouteUpdate(_to, _from, next): void {
    this.addListeners();
    next();
  },

  beforeRouteLeave(_to, _from, next): void {
    this.removeListeners();
    next();
  },

  methods: {
    removeListeners(): void {
      window.removeEventListener('resize', syncResize);
    },

    addListeners(): void {
      this.removeListeners();

      syncResize = _.throttle(() => {
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
      }, 300);

      syncResize();
      window.addEventListener('resize', syncResize);
    },
  },
});
</script>

<style lang="scss">
.map-view {
  background-color: #F8F9FA;

  .main-nav {
    position: absolute;
    left: 0;
    top: 0;
    height: 2.5rem;
    font-size: 1rem;
    padding: 0;
    // padding: 1rem 2rem;
    width: calc(100% - 20px);
    background-color: white;
    box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 10px;
    justify-content: center;
  }

  .map {
    position: absolute;
    top: calc(2.5rem + 10px);
    width: 100%;
    // height: calc(100% - 20px);
    height: calc(100% - 2.5rem - 10px);
  }
}
</style>
