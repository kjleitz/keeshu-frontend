<template>
  <div :style="styleVariables" class="home-view" tabindex="-1" @keyup.d="debug = !debug">
    <h1 class="sr-only">Home</h1>
    <MainNav
      :debug="debug"
      :class="{ 'fonts-loaded': fontsLoaded }"
      :main-items="['hotels', 'info']"
      vertical
    />
    <Sky :debug="debug" class="background" @day-elapsed-percent-changed="dayElapsedPercent = $event">
      <div :style="grassStyles" class="painting grass"></div>
      <div :style="treeStyles" class="painting tree"></div>
      <div :style="picnicTableStyles" class="painting picnic-table"></div>
    </Sky>
    <div
      :style="titleStyles"
      :class="['our-names-obviously', { 'fonts-loaded': fontsLoaded }]"
    >
      <div class="surprise-its-a-name name-aishu">
        Aishu &amp;
        <br>
        Keegan
      </div>
      <div class="tagline">
        (a wedding)
      </div>
      <transition name="fade" appear>
        <div class="info" v-if="$store.getters.authorized">
          August 14<sup>th</sup>, 2021<br>
          Lord Thompson Manor, Connecticut
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
import Sky from '@/components/Sky.vue';
import { calcDayElapsed } from '@/lib/sky/chrono';
import { calcSunlightColorValue } from '@/lib/sky/chroma';
import store from '@/store';
import { imageIsLoaded, loadImage } from '@/lib/images';

export default Vue.extend({
  name: 'Home',

  components: {
    MainNav,
    Sky,
  },

  data() {
    const { innerWidth, innerHeight } = window;

    const treeImageSrc = store.state.webpSupported
      ? require('@/assets/tree_q90_lossy.webp')
      : require('@/assets/tree.png');

    const picnicTableImageSrc = store.state.webpSupported
      ? require('@/assets/picnic_table_with_us_q90_lossy.webp')
      : require('@/assets/picnic_table_with_us.png');

    const grassImageSrc = store.state.webpSupported
      ? require('@/assets/grass_q90_lossy.webp')
      : require('@/assets/grass.png');

    const treeImageLoaded = imageIsLoaded(treeImageSrc);
    const picnicTableImageLoaded = imageIsLoaded(picnicTableImageSrc);
    const grassImageLoaded = imageIsLoaded(grassImageSrc);

    // Should be:
    // - false in prerender
    // - true if document.fonts is not supported
    // - true if Glass Antiqua is loaded already, false if it isn't
    const fontsLoaded = !store.state.inPrerender
      && (document.fonts?.check ? document.fonts.check('12px "Glass Antiqua"') : true);

    return {
      innerWidth,
      innerHeight,
      dayElapsedPercent: calcDayElapsed(),
      debug: false,
      treeImageSrc,
      picnicTableImageSrc,
      grassImageSrc,
      treeImageLoaded,
      picnicTableImageLoaded,
      grassImageLoaded,
      fontsLoaded,
    };
  },

  computed: {
    titleRedValue(): number {
      return this.sunlightColorValue(180, 255);
    },

    titleGreenValue(): number {
      return this.sunlightColorValue(230, 255);
    },

    titleBlueValue(): number {
      return this.sunlightColorValue(235, 255);
    },

    titleOpacity(): number {
      return 1;
    },

    titleRgba(): string {
      const red = this.titleRedValue.toFixed(2);
      const green = this.titleGreenValue.toFixed(2);
      const blue = this.titleBlueValue.toFixed(2);
      const opacity = this.titleOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    navLinkRgba(): string {
      return this.titleRgba;
    },

    navLinkActiveRedValue(): number {
      return this.sunlightColorValue(0, 60);
    },

    navLinkActiveGreenValue(): number {
      return this.sunlightColorValue(180, 140);
    },

    navLinkActiveBlueValue(): number {
      return this.sunlightColorValue(0, 60);
    },

    navLinkActiveOpacity(): number {
      return 1;
    },

    navLinkActiveRgba(): string {
      const red = this.navLinkActiveRedValue.toFixed(2);
      const green = this.navLinkActiveGreenValue.toFixed(2);
      const blue = this.navLinkActiveBlueValue.toFixed(2);
      const opacity = this.navLinkActiveOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    titleStyles(): Partial<CSSStyleDeclaration> {
      return {
        color: this.titleRgba,
      };
    },

    treeStyles(): Partial<CSSStyleDeclaration> {
      if (!this.treeImageLoaded || store.state.inPrerender) return {};

      return {
        backgroundImage: `url('${this.treeImageSrc}')`,
        filter: 'blur(0px)',
      };
    },

    picnicTableStyles(): Partial<CSSStyleDeclaration> {
      if (!this.picnicTableImageLoaded || store.state.inPrerender) return {};

      return {
        backgroundImage: `url('${this.picnicTableImageSrc}')`,
        filter: 'blur(0px)',
      };
    },

    grassStyles(): Partial<CSSStyleDeclaration> {
      if (!this.grassImageLoaded || store.state.inPrerender) return {};

      return {
        backgroundImage: `url('${this.grassImageSrc}')`,
        filter: 'blur(0px)',
      };
    },

    styleVariables(): Record<string, string> {
      return {
        '--nav-font-color': this.navLinkRgba,
        '--nav-font-color-active': this.navLinkActiveRgba,
      };
    },
  },

  created(): void {
    this.loadFonts();
    this.loadTreeImage();
    this.loadGrassImage();
    this.loadPicnicTableImage();
  },

  mounted(): void {
    (this.$el as HTMLElement).focus();
  },

  beforeRouteUpdate(_to, _from, next): void {
    (this.$el as HTMLElement).focus();
    next();
  },

  methods: {
    sunlightColorValue(atMidnight: number, atNoon: number): number {
      return calcSunlightColorValue(this.dayElapsedPercent, atMidnight, atNoon);
    },

    loadTreeImage(): void {
      if (store.state.inPrerender || this.treeImageLoaded) return;

      loadImage(this.treeImageSrc).then(() => {
        this.treeImageLoaded = true;
      });
    },

    loadPicnicTableImage(): void {
      if (store.state.inPrerender || this.picnicTableImageLoaded) return;

      loadImage(this.picnicTableImageSrc).then(() => {
        this.picnicTableImageLoaded = true;
      });
    },

    loadGrassImage(): void {
      if (store.state.inPrerender || this.grassImageLoaded) return;

      loadImage(this.grassImageSrc).then(() => {
        this.grassImageLoaded = true;
      });
    },

    loadFonts(): void {
      if (document.fonts && !store.state.inPrerender && !this.fontsLoaded) {
        document.fonts.addEventListener('loadingdone', () => {
          this.fontsLoaded = document.fonts.check('12px "Glass Antiqua"');
        });
        document.fonts.ready.then(() => {
          this.fontsLoaded = document.fonts.check('12px "Glass Antiqua"');
        });
      }
    },
  },
});
</script>

<style lang="scss">
.home-view {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  // NOTE: this needs to be here in order to initiate "early" loading of the
  //       fonts, so that my hacky font replacement stuff can work.
  // TODO: Consider a less bullshit strategy in the future.
  font-family: "Glass Antiqua", Times, serif, "Montserrat";

  .title-font {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .main-nav {
    z-index: 2000;
    align-items: flex-start;

    // BEGIN: HACKY FONT-REPLACEMENT NICETIES

    font-family: "Glass Antiqua", Times, serif;
    transform-origin: left;

    &:not(.fonts-loaded) {
      font-family: Times, serif;
      transform: scaleX(0.85);
    }

    &.fonts-loaded {
      font-family: "Glass Antiqua", Times, serif;
      transform: scaleX(1);
    }

    // END: HACKY FONT-REPLACEMENT NICETIES

    .nav-link {
      font-size: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), 0px 0px 1px black, 0px 0px 10px rgba(0, 0, 0, 0.35);
      color: var(--nav-font-color);
      line-height: 1em;
      padding: 0.5rem 1rem;
      // padding-left: 1rem;
      transition: padding 0.3s;

      &.router-link-exact-active {
        color: var(--nav-font-color-active);
        font-size: 2em;
        text-shadow: 1px 1px 0px black, 0px 0px 1px black
      }

      &:hover {
        padding-left: 1.5rem;
      }
    }
  }

  .background {
    .painting {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      width: 100%;
      background-origin: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(10px);

      &.grass {
        background-position: center left 60%;
        background-image: url("~@/assets/grass_q00_thumb_50.png");
      }

      &.picnic-table {
        background-position: center left 45%;
        background-image: url("~@/assets/picnic_table_with_us_q00_thumb_50.png");
      }

      &.tree {
        background-position: center right 45%;
        background-image: url("~@/assets/tree_q00_thumb_50.png");
      }
    }
  }

  $name-font-size: min(20vh, 20vw);
  $name-line-height: $name-font-size;
  $name-and-stuff-padding-x: calc(0.1 * #{$name-font-size});

  $tagline-font-size: min(10vh, 10vw);
  $tagline-line-height: $tagline-font-size;

  // $info-date-font-size: max(1rem, calc(0.5 * #{$tagline-font-size}));
  $info-date-font-size: max(1rem, min(5vh, 5vw)); // apparently the minifier can't handle nesting like above
  $info-date-line-height: calc(1.5 * #{$info-date-font-size});

  // $info-location-font-size: max(1rem, calc(0.65 * #{$info-date-font-size}));
  $info-location-font-size: max(1rem, min(3.25vh, 3.25vw)); // apparently the minifier can't handle nesting like above
  $info-location-line-height: calc(1.5 * #{$info-location-font-size});

  // $info-addendum-font-size: max(1rem, calc(0.75 * #{$info-location-font-size}));
  $info-addendum-font-size: max(1rem, min(2.5vh, 2.5vw)); // apparently the minifier can't handle nesting like above
  $info-addendum-line-height: calc(1.5 * #{$info-addendum-font-size});

  .our-names-obviously {
    color: rgb(0, 30, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: $name-font-size;
    line-height: $name-line-height;
    outline: none;
    z-index: 1000;

    // BEGIN: HACKY FONT-REPLACEMENT NICETIES

    font-family: 'Glass Antiqua', Times, serif;

    &:not(.fonts-loaded) {
      .surprise-its-a-name {
        font-family: Times, serif;
        transform: scaleX(0.775);
        transform-origin: right;
      }

      .tagline {
        font-family: Times, serif;
        transform: scaleX(0.95);
        transform-origin: right;
      }

      .info {
        font-family: Arial, sans-serif;
        transform: scaleX(1.1);
        transform-origin: center;
      }
    }

    &.fonts-loaded {
      .surprise-its-a-name {
        font-family: "Glass Antiqua", Times, serif;
        transform: scaleX(1);
      }

      .tagline {
        font-family: "Glass Antiqua", Times, serif;
        transform: scaleX(1);
      }

      .info {
        font-family: "Montserrat", Arial, sans-serif;
        transform: scaleX(1);
      }
    }

    // END: HACKY FONT-REPLACEMENT NICETIES

    .surprise-its-a-name, .tagline, .info {
      display: inline-block;
      text-shadow: 4px 4px 5px black, 0px 0px 1px black, 0px 0px 15px rgba(0, 0, 0, 0.5);
      padding: 0em $name-and-stuff-padding-x;
      margin: 0em $name-and-stuff-padding-x 0em 0em;
      white-space: nowrap;
    }

    .surprise-its-a-name {
      text-transform: uppercase;
    }

    .tagline {
      font-size: $tagline-font-size;
      line-height: $tagline-line-height;
    }

    .info {
      $info-font-size: max(1rem, min(3.5vh, 3.5vw));
      font-size: $info-font-size;
      line-height: calc(1.25 * #{$info-font-size});
      text-align: center;
      margin: 2rem auto 1rem auto;
      text-shadow: 2px 1px 3px black, 0px 0px 1px black, 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
