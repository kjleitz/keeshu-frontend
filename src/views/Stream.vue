<template>
  <div class="stream-view">
    <transition name="fade">
      <Splash v-if="splashOpen" @close="onCloseSplash">
        <template #header>
          All right, so...
        </template>
        <template #body>
          <p>
            This is where the wedding will be streamed! There's no stream yet,
            obviously, but feel free to watch this video over and over until the
            stream starts ({{ humanDuration }}).
          </p>
        </template>
        <template #footer>
          <p>
            <b-button
              size="lg"
              variant="primary"
              @click="onCloseSplash"
            >
              Cool, thanks
            </b-button>
          </p>
        </template>
      </Splash>
    </transition>
    <div class="nav-area">
      <div class="color-ribbon"></div>
      <MainNav class="main-nav"/>
    </div>
    <div class="stream-area">
      <iframe
        :class="['stream-frame', { loaded }]"
        src="https://player.vimeo.com/video/82650753"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        @load="onStreamFrameLoaded"
      ></iframe>
      <transition name="fade" appear>
        <div v-if="loading" class="loading-indicator">
          <b-icon-camera-reels animation="spin" scale="10"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
import Splash from '@/components/Splash.vue';
import moment from 'moment';

export default Vue.extend({
  components: {
    MainNav,
    Splash,
  },

  data() {
    return {
      loaded: false,
      splashOpen: false,
    };
  },

  computed: {
    loading(): boolean {
      return !this.loaded;
    },

    humanDuration(): string {
      const nowMoment = moment();
      const ceremonyMoment = moment("2021-08-14T22:00:00.000Z");
      return nowMoment.to(ceremonyMoment);
    },
  },

  methods: {
    onStreamFrameLoaded(): void {
      this.loaded = true;
      this.splashOpen = true;
    },

    onCloseSplash(): void {
      this.splashOpen = false;
    },
  },
});
</script>

<style lang="scss">
// These are an attempt to clone the top bar on Vimeo, for style consistency
$navbar-height: 60px;
$navbar-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
$navbar-font-size: 1rem;
$navbar-font-weight: 700;
$navbar-color: rgb(26, 46, 59);
$navbar-color-hover: rgb(63, 89, 89);
$navbar-color-active: rgb(0, 173, 239);
$navbar-background-color: #ffffff;
$navbar-border-bottom: 1px solid #d0d8db;
$navbar-box-shadow:
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
  rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

$navbar-background-image: linear-gradient(
  to right,
  #73D2F6
  #08C 22%
  #7FC400 36%
  #FFD583 48%
  #FFB21E 63%
  #FF4D4D 76%
  #503873
);

.stream-view {
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

    .color-ribbon {
      width: 100%;
      height: 0.1875rem;
      background-image: $navbar-background-image;
    }

    .main-nav {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: $navbar-font-weight;
      font-family: $navbar-font-family;
      font-size: $navbar-font-size;
      color: $navbar-color;

      a {
        display: inline-block;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        transition: color 0.15s;

        &:not(.more-nav-items-list-item-link) {
          height: 40px;
          line-height: 40px;
        }
        // padding: 0 10px;
        // margin: 0 10px;

        &.router-link-exact-active {
          display: inline-block;
          background-color: $navbar-color-active;
          border-radius: 0.1875rem;
          height: 40px;
          line-height: 40px;
          color: white;
        }

        &:hover {
          color: $navbar-color-hover;
        }
      }
    }
  }

  .stream-area {
    flex-grow: 1;
    background-color: black;
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // // This bullshit is because of iOS
    // flex-grow: 1;
    // min-height: calc(100vh - #{$navbar-height});
    // min-height: -webkit-fill-available;
    height: calc(100% - #{$navbar-height});
    // min-height: -webkit-fill-available;

    .stream-frame {
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
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
