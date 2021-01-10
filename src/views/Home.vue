<template>
  <div class="home-view">
    <MainNav vertical/>
    <div class="background">
      <div :style="nightStyles" class="sky night"></div>
      <div :style="dayStyles" class="sky day"></div>
      <div class="sun-container">
        <div class="sun-corona">
          <div class="sun"></div>
        </div>
      </div>
      <div class="painting grass"></div>
      <div class="painting tree"></div>
      <div class="painting picnic-table"></div>
    </div>
    <div class="our-names-obviously">
      <div class="surprise-its-a-name name-aishu">Aishu</div>
      <div class="surprise-its-a-name name-and">&amp;</div>
      <div class="surprise-its-a-name name-keegan">Keegan</div>
      <div class="tagline">(a marriage)</div>
    </div>
    <!-- <div class="day-elapsed-percent">
      <b-form-input v-model="dayElapsedPercent" type="range" min="0" max="1" step="0.01"></b-form-input>
      {{ (dayElapsedPercent * 24).toFixed(1) }} - {{ dayStyles }}
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import MainNav from '@/components/MainNav.vue';
import _ from 'underscore';
import { bound } from '@/lib/utils';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

const calcDayElapsed = (): number => {
  const midnight = moment().startOf('day');
  const now = moment();
  const secondsSinceMidnight = now.diff(midnight, 'seconds');
  const secondsInDay = 60 * 60 * 24; // it's 86400, but just to be explicit
  return secondsSinceMidnight / secondsInDay;
};

let syncResize = _.noop;
let dayElapsedInterval = 0;

export default Vue.extend({
  name: 'Home',

  components: {
    MainNav,
  },

  data() {
    return {
      clientWidth: window.innerWidth,
      clientHeight: window.innerHeight,
      dayElapsedPercent: calcDayElapsed(),
    };
  },

  computed: {
    skyCircleDiameter(): number {
      // The star map image rotates, so the element's smallest dimension (width
      // or height) must equal (or exceed) the diameter of the imaginary circle
      // that circumscribes the viewport.
      return Math.sqrt((this.clientWidth ** 2) + (this.clientHeight ** 2));
    },

    skyDegrees(): number {
      return this.dayElapsedPercent * 360;
    },

    starMapDegrees(): number {
      return (this.dayElapsedPercent * 360) - 45;
    },

    sunlightPercent(): number {
      const { dayElapsedPercent } = this;

      // sun is completely down for the first 10% and last 10% of the day
      const sunMinPercent = 0.1;

      // sun is at its highest 50% through the day
      const sunMaxPercent = 0.5;

      // 0.0 at noon, 0.5 at midnight
      const tilNoon = Math.abs(sunMaxPercent - dayElapsedPercent);

      // 0.5 at noon, 0.0 at midnight
      const tilMidnight = sunMaxPercent - tilNoon;

      // 1.0 at noon, 0.0 anywhere between 10% til midnight and 10% after midnight
      const rawSunlightPercent = (tilMidnight - sunMinPercent) / (sunMaxPercent - sunMinPercent);

      // rises quickly and slows down close to noon, falls slowly after noon and
      // accelerates toward midnight (picture the >0 portion of a sin wave crest)
      return Math.sin(rawSunlightPercent * (Math.PI / 2));
    },

    sunlightRedValue(): number {
      const redMin = -300; // wanna start without any red at all
      const redMax = 150;
      return this.sunlightColorValue(redMin, redMax);
    },

    sunlightGreenValue(): number {
      const greenMin = -200; // wanna start without any green at all (but have it come sooner than red)
      const greenMax = 240;
      return this.sunlightColorValue(greenMin, greenMax);
    },

    sunlightBlueValue(): number {
      const blueMin = 100;
      const blueMax = 255;
      return this.sunlightColorValue(blueMin, blueMax);
    },

    sunlightOpacity(): number {
      return this.sunlightPercent;
    },

    sunlightRgba(): string {
      const red = this.sunlightRedValue.toFixed(2);
      const green = this.sunlightGreenValue.toFixed(2);
      const blue = this.sunlightBlueValue.toFixed(2);
      const opacity = this.sunlightOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    skyStyles(): Partial<CSSStyleDeclaration> {
      const { skyCircleDiameter, skyDegrees } = this;
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${skyCircleDiameter}px`,
        height: `${skyCircleDiameter}px`,
        transform: `translate(-50%, -50%) rotate(${skyDegrees.toFixed(2)}deg`,
      };
    },

    nightStyles(): Partial<CSSStyleDeclaration> {
      return {
        ...this.skyStyles,
        zIndex: '-100',
        // So that the Milky Way isn't at a regular angle...
        transform: `translate(-50%, -50%) rotate(${this.starMapDegrees.toFixed(2)}deg`,
      };
    },

    dayStyles(): Partial<CSSStyleDeclaration> {
      return {
        ...this.skyStyles,
        backgroundColor: this.sunlightRgba,
        zIndex: '-99',
      };
    },
  },

  created(): void {
    this.addListeners();
    this.addIntervals();
  },

  beforeDestroy(): void {
    this.removeListeners();
    this.removeIntervals();
  },

  beforeRouteUpdate(_to, _from, next): void {
    this.addListeners();
    this.addIntervals();
    next();
  },

  beforeRouteLeave(_to, _from, next): void {
    this.removeListeners();
    this.removeIntervals();
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

    removeIntervals(): void {
      window.clearTimeout(dayElapsedInterval);
    },

    addIntervals(): void {
      this.dayElapsedPercent = calcDayElapsed();
      dayElapsedInterval = window.setInterval(() => {
        this.dayElapsedPercent = calcDayElapsed();
      }, 2000);
    },

    sunlightColorValue(atMidnight: number, atNoon: number): number {
      const { sunlightPercent } = this;
      const value = atMidnight + (sunlightPercent * (atNoon - atMidnight));
      return bound(value, [0, 255]);
    },
  },
});
</script>

<style lang="scss">
.home-view {
  overflow: hidden;
  width: 100%;
  height: 100%;
  // background-color: #D8F5FA;
  // background-color: #c8f7ff;

  .day-elapsed-percent {
    background-color: white;
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .main-nav {
    font-family: "Source Serif Pro", serif;
    .nav-link {
      font-size: 2rem;
    }
  }

  .background {
    height: 100%;
    width: 100%;
    z-index: -1000;

    // .day {
    //   background-color: #c8f7ff;
    // }

    .night {
      // background-image: url("~@/assets/starmap_2020_4k_gal_retina.jpg");
      background-image: url("~@/assets/starmap_square.jpg");
      background-position: center;
      background-size: cover;
      background-repeat: repeat;
    }

    .sun-container {
      position
      .sun-corona {
        .sun {

        }
      }
    }

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
        background-image: url("~@/assets/grass.png");
        background-position: center left 60%;
      }

      &.picnic-table {
        background-image: url("~@/assets/picnic_table_with_us.png");
        background-position: center left 45%;
      }

      &.tree {
        background-image: url("~@/assets/tree.png");
        background-position: center right 45%;
      }
    }
  }

  .our-names-obviously {
    color: rgb(0, 30, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: min(15vh, 15vw);
    line-height: 1em;
    font-family: 'Emilys Candy', sans-serif;

    .surprise-its-a-name, .tagline {
      background-color: rgba(216, 245, 250, 0.5);
      border-radius: 50% 1em;
      box-shadow: 0px 0px 10px 10px rgba(216, 245, 250, 0.5);
      padding: 0em 0.25em;
      margin: 0em 0.25em 0.3em 0em;
    }

    .surprise-its-a-name {
      text-transform: uppercase;
    }

    .tagline {
      font-size: min(9vh, 9vw);
    }
  }
}
</style>
