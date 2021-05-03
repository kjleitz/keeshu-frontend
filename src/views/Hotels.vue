<template>
  <div class="hotels-view">
    <div class="nav-area">
      <div class="no-vacancy-sign">
        <div :class="['no-vacancy-neon', { 'no-is-lit': noIsLit }]"></div>
      </div>
      <div class="nav-sign">
        <MainNav :class="{ scrolled }"/>
      </div>
    </div>
    <b-container>
      <b-row>
        <b-col
          v-for="hotel in sortedHotels"
          :key="hotel.title"
          md="6"
          class="hotel-item-container"
        >
          <HotelItem :hotel="hotel" class="hotel-item"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { noop, sortBy, throttle } from 'underscore';
import Vue from 'vue';
import HotelDeets, { HOTELS } from '@/types/HotelDeets';
import HotelItem from '@/components/HotelItem.vue';
import MainNav from '@/components/MainNav.vue';

let syncScrolled = noop;
let flickerTimeout = 0;
let toggleTimeout = 0;

export default Vue.extend({
  components: {
    MainNav,
    HotelItem,
  },

  data() {
    return {
      sortField: 'minutesAway' as keyof HotelDeets,
      scrolled: false,
      noIsLit: false,
    };
  },

  computed: {
    sortedHotels(): HotelDeets[] {
      return sortBy(HOTELS, this.sortField);
    },
  },

  mounted(): void {
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
      // document.body.removeEventListener('scroll', syncScrolled);
      window.removeEventListener('scroll', syncScrolled);
    },

    addListeners(): void {
      this.removeListeners();

      syncScrolled = throttle(() => {
        // this.scrolled = document.body.scrollTop > 100;
        this.scrolled = window.scrollY > 100;
      }, 300);

      syncScrolled();
      // document.body.addEventListener('scroll', syncScrolled);
      window.addEventListener('scroll', syncScrolled);
    },

    removeIntervals(): void {
      window.clearTimeout(flickerTimeout);
      window.clearTimeout(toggleTimeout);
    },

    addIntervals(): void {
      // With a base flicker time of 200ms, the flickers last no more than 400ms
      // due to FUCKING BASIC MATH THAT I FORGOT ABOUT. Say hi to Mr. Gleason
      // for me and please don't tell him that I forgot how to do simple limits.
      // Anyway, that means the next toggle should happen no less than 400ms
      // minimum after the last flicker.
      const toggle = (count = 0, flippityDoo = false): void => {
        this.noIsLit = !this.noIsLit;
        if (count < 6) {
          window.clearTimeout(flickerTimeout);
          flickerTimeout = window.setTimeout(() => {
            toggle(count + 1, flippityDoo);
          }, 200 / (count + 1));
        } else {
          window.clearTimeout(toggleTimeout);
          toggleTimeout = window.setTimeout(() => {
            toggle(0, !flippityDoo);
          }, flippityDoo ? 6000 : 100);
        }
      };

      toggle();
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

$nav-area-padding: 1rem;
$sign-height: 4rem;
$sign-margin: 0.5rem;

.no-webp .hotels-view .nav-area .no-vacancy-sign {
  .no-vacancy-neon {
    background-image: url("~@/assets/vacancy.png");
    &.no-is-lit { background-image: url("~@/assets/no_vacancy.png"); }
  }
}

.webp .hotels-view .nav-area .no-vacancy-sign {
  .no-vacancy-neon {
    background-image: url("~@/assets/vacancy_q90_lossy.webp");
    &.no-is-lit { background-image: url("~@/assets/no_vacancy_q90_lossy.webp"); }
  }
}

.hotels-view {
  width: 100%;
  // background: repeating-linear-gradient(180deg, rgba(30, 15, 0, 0.8), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
  // background: repeating-linear-gradient(180deg, rgba(80, 55, 40, 1), #ffeda7 1vh, #fcf1c5 3vh, #ffffd9 5vh);
  background: repeating-linear-gradient(180deg, rgba(80, 55, 40, 1), #fcecac 1vh, #fcf1c5 3vh, #ffffd9 5vh);
  box-shadow: inset 0 0 1vh rgba(30, 15, 0, 0.8);
  // overflow-x: hidden;

  a {
    color: rgb(0, 75, 170);
  }

  .nav-area {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: $nav-area-padding;
    z-index: 1000;
    // overflow-x: hidden;

    @include media-breakpoint-up(md) {
      justify-content: space-evenly;
    }

    @include media-breakpoint-up(sm) {
      position: sticky;
      top: 0;
    }

    @include media-breakpoint-down(sm) {
      position: sticky;
      top: -1 * ($sign-height + (2 * $sign-margin) + $nav-area-padding);
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .no-vacancy-sign {
      position: relative;
      width: 17rem;
      height: $sign-height;
      background: radial-gradient(#700, #000);
      border: 0.25rem ridge rgba(200, 100, 0, 0.8);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      margin: $sign-margin;
      box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
      transform: rotate(-1deg);

      .no-vacancy-neon {
        // NOTE: see the .webp and .no-webp variants at the top of the styles
        // background-image: url("~@/assets/vacancy.png");
        // background-image: url("~@/assets/vacancy_q90_lossy.webp");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;

        &.no-is-lit {
          // NOTE: see the .webp and .no-webp variants at the top of the styles
          // background-image: url("~@/assets/no_vacancy.png");
          // background-image: url("~@/assets/no_vacancy_q90_lossy.webp");
        }
      }
    }

    .nav-sign {
      position: relative;
      height: $sign-height;
      background: repeating-linear-gradient(180deg, #ddc 0.1rem, #ffe 0.2rem, #fefefe 0.4rem);
      border: 0.25rem ridge rgba(200, 100, 0, 0.8);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      margin: $sign-margin;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);

      @include media-breakpoint-down(sm) {
        position: sticky;
        top: 0;
        padding: 0 0;
      }

      .main-nav {
        position: relative;
        flex-wrap: nowrap;
        padding: 1rem;
        font-family: "Chonburi", serif;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        @include media-breakpoint-down(sm) {
          font-size: 1em;

          a.nav-link {
            padding: 0.25rem 0.5rem;
          }
        }

        a.nav-link {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

          &.router-link-exact-active {
            color: #182D3E;
            font-size: 1.25em;

            @include media-breakpoint-down(sm) {
              font-size: 1.1em;
            }
          }
        }

        .hotels-last-letter {
          display: inline-block;
          height: 1em;
          line-height: 1em;
          transform-origin: top right;
          transform: rotate(0deg) translate(0em, 0em);
          transition: transform 0.2s;
          transition-timing-function: ease-in;
        }

        &.scrolled {
          .hotels-last-letter {
            transform: rotate(-25deg) translate(-0.1em, -0.1em);
            transition: transform 0.5s;
            transition-timing-function: cubic-bezier(0.5, 3, 0.5, 1);
          }
        }
      }
    }
  }

  .hotel-item-container {
    display: flex;
    justify-content: stretch;
    align-items: center;

    .hotel-item {
      margin-bottom: 1rem;
      width: 100%;
    }
  }
}
</style>
