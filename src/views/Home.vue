<template>
  <div :style="styleVariables" class="home-view">
    <h1 class="sr-only">Home</h1>
    <MainNav vertical/>
    <Sky :debug="debug" class="background" @day-elapsed-percent-changed="dayElapsedPercent = $event">
      <div class="painting grass"></div>
      <div class="painting tree"></div>
      <div class="painting picnic-table"></div>
    </Sky>
    <div
      :style="titleStyles"
      tabindex="0"
      class="our-names-obviously"
      @keyup.ctrl.d.prevent.stop="debug = !debug"
      @keyup.meta.d.prevent.stop="debug = !debug"
      @keyup.alt.d.prevent.stop="debug = !debug"
      @keyup.left.exact.prevent="fontIndex -= 1"
      @keyup.right.exact.prevent="fontIndex += 1"
    >
      <div class="surprise-its-a-name name-aishu">
        Aishu &amp;
        <br>
        Keegan
      </div>
      <div class="tagline">
        (a wedding)
      </div>
      <div class="info">
        August 14<sup>th</sup>, 2021<br>
        Lord Thompson Manor, Connecticut
      </div>
      <!-- <div class="info info-date">
        (happening on August 14<sup>th</sup>, 2021)
      </div>
      <div class="info info-location">
        (at Lord Thompson Manor in Connecticut)
      </div> -->
      <!-- <div class="info info-addendum">
        (for the lazy)
      </div> -->
    </div>
    <!-- <div v-if="debug" class="title-font">
      Font: {{ titleFont }}
    </div> -->
  </div>
</template>

<script lang="ts">
import _ from 'underscore';
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
import Sky from '@/components/Sky.vue';
import { calcDayElapsed } from '@/lib/sky/chrono';
import { calcSunlightColorValue } from '@/lib/sky/chroma';

const FONTS = [
  "Glass Antiqua", // first is default
  // "Arima Madurai",
  // "Lancelot",
  // "Emilys Candy",
  // "Neucha",
  // "Rancho",
  // "Comic Neue",
  // "Fredericka the Great",
  // "Grandstander",
  // "Averia Serif Libre",
  // "Life Savers",
  // "Atma",
  // "Salsa",
  // "Ribeye Marrow",
  // "Ribeye",
  // "Milonga",
  // "Henny Penny",
  // "Bellota",
  // "Macondo",
];

// let dayElapsedInterval = 0;

export default Vue.extend({
  name: 'Home',

  components: {
    MainNav,
    Sky,
  },

  data() {
    const { innerWidth, innerHeight } = window;
    return {
      innerWidth,
      innerHeight,
      dayElapsedPercent: calcDayElapsed(),
      fontIndex: 0,
      debug: false,
    };
  },

  computed: {
    titleFont(): string {
      if (!this.debug) return FONTS[0];

      const index = this.fontIndex < 0 ? Math.abs(this.fontIndex) - 1 : this.fontIndex;
      const list = this.fontIndex < 0 ? [...FONTS].reverse() : FONTS;
      return list[index % list.length];
    },

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

    navLinkFont(): string {
      return this.titleFont;
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

    navLinkActiveShadowOpacity(): number {
      return this.sunlightColorValue(0, 100) / 100;
    },

    titleStyles(): Partial<CSSStyleDeclaration> {
      return {
        fontFamily: `"${this.titleFont}", serif`,
        color: this.titleRgba,
      };
    },

    styleVariables(): Record<string, string> {
      return {
        '--nav-font-family': `"${this.navLinkFont}", serif`,
        '--nav-font-color': this.navLinkRgba,
        '--nav-font-color-active': this.navLinkActiveRgba,
        '--nav-link-active-shadow-opacity': `${this.navLinkActiveShadowOpacity}`,
      };
    },
  },

  created(): void {
    // this.addIntervals();
  },

  beforeDestroy(): void {
    // this.removeIntervals();
  },

  beforeRouteUpdate(_to, _from, next): void {
    // this.addIntervals();
    next();
  },

  beforeRouteLeave(_to, _from, next): void {
    // this.removeIntervals();
    next();
  },

  methods: {
    // removeIntervals(): void {
    //   window.clearInterval(dayElapsedInterval);
    // },

    // addIntervals(): void {
    //   this.dayElapsedPercent = calcDayElapsed();

    //   dayElapsedInterval = window.setInterval(() => {
    //     if (this.debug) return;
    //     this.dayElapsedPercent = calcDayElapsed();
    //   }, 5000);
    // },

    sunlightColorValue(atMidnight: number, atNoon: number): number {
      return calcSunlightColorValue(this.dayElapsedPercent, atMidnight, atNoon);
    },
  },
});
</script>

<style lang="scss">
.no-webp .home-view .background {
  .painting {
    &.grass { background-image: url("~@/assets/grass.png"); }
    &.picnic-table { background-image: url("~@/assets/picnic_table_with_us.png"); }
    &.tree { background-image: url("~@/assets/tree.png"); }
  }
}

.webp .home-view .background {
  .painting {
    &.grass { background-image: url("~@/assets/grass_q90_lossy.webp"); }
    &.picnic-table { background-image: url("~@/assets/picnic_table_with_us_q90_lossy.webp"); }
    &.tree { background-image: url("~@/assets/tree_q90_lossy.webp"); }
  }
}

.home-view {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  .title-font {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .main-nav {
    z-index: 1000;
    .nav-link {
      font-size: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      font-family: var(--nav-font-family);
      color: var(--nav-font-color);
      line-height: 1em;
      padding-left: 1rem;
      transition: padding 0.3s;

      &.router-link-exact-active {
        color: var(--nav-font-color-active);
        font-size: 2em;
        // text-shadow: 0px 0px 1px rgba(150, 240, 255, 1);
        // text-shadow: 0px 0px 1px rgba(150, 240, 255, var(--nav-link-active-shadow-opacity));
        // text-shadow: 0px 0px 1px black;
        text-shadow: 1px 1px 0px black;
      }

      &:hover {
        padding-left: 1.5rem;
      }
    }
  }

  .background {
    // height: 100%;
    // width: 100%;
    z-index: -1000;
    // overflow: hidden;

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

      &.grass {
        // NOTE: see the .webp and .no-webp variants at the top of the styles
        // background-image: url("~@/assets/grass.png");
        // background-image: url("~@/assets/grass_q90_lossy.webp");
        background-position: center left 60%;
      }

      &.picnic-table {
        // NOTE: see the .webp and .no-webp variants at the top of the styles
        // background-image: url("~@/assets/picnic_table_with_us.png");
        // background-image: url("~@/assets/picnic_table_with_us_q90_lossy.webp");
        background-position: center left 45%;
      }

      &.tree {
        // NOTE: see the .webp and .no-webp variants at the top of the styles
        // background-image: url("~@/assets/tree.png");
        // background-image: url("~@/assets/tree_q90_lossy.webp");
        background-position: center right 45%;
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
    font-family: 'Glass Antiqua', serif;
    outline: none;

    .surprise-its-a-name, .tagline, .info {
      display: inline-block;
      text-shadow: 4px 4px 5px rgba(0, 0, 0, 1);
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
      $info-font-size: max(1rem, min(2.5vh, 2.5vw));
      font-family: "Montserrat", sans-serif;
      font-size: $info-font-size;
      line-height: calc(1.5 * #{$info-font-size});
      text-align: center;
      margin: 2rem auto 1rem auto;

      // &.info-date {
      //   line-height: $info-date-line-height;
      //   font-size: $info-date-font-size;
      // }

      // &.info-location {
      //   line-height: $info-location-line-height;
      //   font-size: $info-location-font-size;
      // }

      // &.info-addendum {
      //   line-height: $info-addendum-line-height;
      //   font-size: $info-addendum-font-size;
      // }
    }
  }
}
</style>
