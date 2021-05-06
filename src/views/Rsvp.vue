<template>
  <div class="rsvp-view">
    <div class="nav-area">
      <MainNav class="main-nav"/>
    </div>
    <div class="rsvp-area">
      <!-- <iframe
        :class="['rsvpify-frame', { loaded }]"
        src="/rsvpify.html"
        frameborder="0"
        @load="onRsvpifyFrameLoaded"
      ></iframe> -->
      <iframe
        ref="rsvpifyFrame"
        :class="['rsvpify-frame', { loaded }]"
        src="https://keeshu.rsvpify.com/"
        frameborder="0"
        @load="onRsvpifyFrameLoaded"
      ></iframe>
      <transition name="fade" appear>
        <div v-if="loading" class="loading-indicator">
          <b-icon-envelope animation="spin" scale="10"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';

export default Vue.extend({
  components: {
    MainNav,
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
    onRsvpifyFrameLoaded(): void {
      this.loaded = true;
      this.$nextTick(() => {
        (this.$refs.rsvpifyFrame as HTMLIFrameElement).focus();
      });
    },
  },
});
</script>

<style lang="scss">
// These are an attempt to clone the top bar on RSVPify's preview mode, for
// style consistency
$navbar-height: 3.5rem;
$navbar-font-family: "Open Sans", sans-serif;
$navbar-font-size: 1rem;
$navbar-font-weight: 600;
$navbar-color: rgb(69, 40, 107);
$navbar-color-hover: rgb(106, 83, 137);
$navbar-color-active: rgb(235, 58, 74);
$navbar-background-color: #ffffff;
$navbar-border-bottom: 4px solid rgb(255, 184, 117);
$navbar-box-shadow:
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
  rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

.rsvp-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: stretch;

  .nav-area {
    position: relative;
    width: 100%;
    height: $navbar-height;
    border-bottom: $navbar-border-bottom;
    box-shadow: $navbar-box-shadow;
    background-color: $navbar-background-color;

    .main-nav {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      font-weight: $navbar-font-weight;
      font-family: $navbar-font-family;
      font-size: $navbar-font-size;
      color: $navbar-color;

      a {
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        transition: color 0.15s;

        &.router-link-exact-active {
          color: $navbar-color-active;
        }

        &:hover {
          color: $navbar-color-hover;
        }
      }
    }
  }

  .rsvp-area {
    position: relative;
    background-color: #ffffff; // TODO
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // flex-grow: 1;
    // min-height: calc(100vh - #{$navbar-height});
    // min-height: -webkit-fill-available;
    height: calc(100% - #{$navbar-height});
    // min-height: -webkit-fill-available;

    .rsvpify-frame {
      width: 100%;
      height: 100%;
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
}
</style>
