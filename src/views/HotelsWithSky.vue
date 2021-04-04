<template>
  <div class="hotels-view">
    <Sky v-if="innerWidth >= 992" class="background"/>
    <div class="hotel-walls">
      <div class="hotel-wall">
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
      <div class="hotel-side-wall"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { noop, sortBy, throttle } from 'underscore';
import Vue from 'vue';
import HotelDeets, { HOTELS } from '@/types/HotelDeets';
import HotelItem from '@/components/HotelItem.vue';
import MainNav from '@/components/MainNav.vue';
import Sky from '@/components/Sky.vue';

let syncScrolled = noop;
let syncResize = noop;
let flickerTimeout = 0;
let toggleTimeout = 0;

export default Vue.extend({
  components: {
    HotelItem,
    MainNav,
    Sky,
  },

  data() {
    const { innerWidth, innerHeight } = window;
    return {
      sortField: 'minutesAway' as keyof HotelDeets,
      scrolled: false,
      noIsLit: false,
      innerWidth,
      innerHeight,
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
      window.removeEventListener('scroll', syncScrolled);
    },

    addListeners(): void {
      this.removeListeners();

      syncScrolled = throttle(() => {
        this.scrolled = window.scrollY > 100;
      }, 300);

      syncResize = throttle(() => {
        const { innerWidth, innerHeight } = window;
        if (this.innerWidth !== innerWidth || this.innerHeight !== innerHeight) {
          this.innerWidth = innerWidth;
          this.innerHeight = innerHeight;
        }
      }, 300);

      syncScrolled();
      syncResize();

      window.addEventListener('scroll', syncScrolled);
      window.addEventListener('resize', syncResize);
    },

    removeIntervals(): void {
      window.clearTimeout(flickerTimeout);
      window.clearTimeout(toggleTimeout);
    },

    addIntervals(): void {
      const toggle = (count = 0): void => {
        this.noIsLit = !this.noIsLit;
        if (count < 6) {
          window.clearTimeout(flickerTimeout);
          flickerTimeout = window.setTimeout(() => {
            toggle(count + 1);
          }, 200 / (count + 1));
        } else {
          window.clearTimeout(toggleTimeout);
          toggleTimeout = window.setTimeout(() => {
            toggle(0);
          }, 3000);
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
  // box-shadow: inset 0 0 1vh rgba(30, 15, 0, 0.8);

  a {
    color: rgb(0, 75, 170);
  }

  .background {
    z-index: -1000;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .hotel-walls {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: fit-content;

    .hotel-side-wall {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 2rem;
      // background: repeating-linear-gradient(180deg, rgba(30, 15, 0, 0.8), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      // background: repeating-linear-gradient(180deg, rgba(30, 15, 0, 1), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      // background: repeating-linear-gradient(180deg, rgba(80, 55, 40, 1), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      $square-root-of-2: 1.4142135623730951;
      background: repeating-linear-gradient(
        135deg, rgba(80, 55, 40, 1),
        #ffeda7 1vh / $square-root-of-2,
        #fcf1c5 3vh / $square-root-of-2,
        #ffffd9 5vh / $square-root-of-2,
      );
      z-index: -1;
    }

    .hotel-wall {
      flex-grow: 1;
      // background: repeating-linear-gradient(180deg, rgba(30, 15, 0, 0.8), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      // background: repeating-linear-gradient(180deg, rgba(30, 15, 0, 1), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      // background: repeating-linear-gradient(180deg, rgba(80, 55, 40, 1), #FFFEC6 1vh, #FFFEC6 3vh, #FFFFD9 5vh);
      background: repeating-linear-gradient(180deg, rgba(80, 55, 40, 1), #ffeda7 1vh, #fcf1c5 3vh, #ffffd9 5vh);
      // box-shadow: inset 0 0 1vh rgba(30, 15, 0, 0.8);
      margin-left: 2rem;
      margin-right: 2rem;
      // border-left: 0.25rem ridge rgba(200, 100, 0, 0.8);
      // border-right: 0.25rem ridge rgba(200, 100, 0, 0.8);
      // border-left: 0.25rem ridge rgba(30, 15, 0, 0.8);
      // border-right: 0.25rem ridge rgba(30, 15, 0, 0.8);
      border-top: 0.25rem transparent;
      border-bottom: 0.25rem transparent;
      border-left: 0.25rem ridge rgba(150, 75, 0, 0.8);
      border-right: 0.25rem ridge rgba(150, 75, 0, 0.8);
      // box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
      box-shadow: 1rem 0 1rem 0.5rem rgba(0, 0, 0, 0.5);

      @include media-breakpoint-down(md) {
        margin-left: 0;
        margin-right: 0;
      }

      .nav-area {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: $nav-area-padding;
        z-index: 1000;

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
  }
}
</style>
