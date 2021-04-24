<template>
  <div class="map-view">
    <MainNav/>
    <GoogleMap :class="['map', { loaded }]" @load="onMapFrameLoaded"/>
    <transition name="fade" appear>
      <div v-if="loading" class="loading-indicator">
        <b-icon-map animation="spin" scale="10"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
import GoogleMap from '@/components/GoogleMap.vue';

export default Vue.extend({
  components: {
    MainNav,
    GoogleMap,
  },

  data() {
    return {
      loaded: false,
    };
  },

  computed: {
    loading(): boolean {
      return !this.loaded;
    },
  },

  methods: {
    onMapFrameLoaded(): void {
      this.loaded = true;
    },
  },
});
</script>

<style lang="scss">
.map-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    opacity: 0;
    transition: opacity 0.5s;

    &.loaded {
      opacity: 1;
    }
  }

  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1000;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
