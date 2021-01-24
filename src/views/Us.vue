<template>
  <div class="us-view">
    <header class="title-and-nav">
      <h1 class="sr-only">Us</h1>
      <div class="title-area">
        <span class="title">
          Aishu & Keegan
        </span>
      </div>
      <div class="nav-area">
        <MainNav class="main-nav"/>
      </div>
    </header>
    <div class="hero"></div>
    <!-- <div class="text-photo-section">
      <div class="text-section">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="photo-section">
        <b-img
          :src="require('@/assets/us/apple_pick_wall_sit_original.jpg')"
          alt="Just us, sitting on a wall, surrounded by trees. You know... that cute ish. Lap it up. Go 'aww.' That's what it's there for."
          fluid
        ></b-img>
      </div>
    </div> -->





    <!-- <b-container fluid>
      <b-row>
        <b-col>
          <p>
            It started in 2014, in April, on Beacon. That's where we met.
          </p>
          <p>
            Aishu remembers meeting on the porch. We (and some mutual friends) were meeting to look at an apartment together.
          </p>
          <p>
            We
          </p>
        </b-col>
      </b-row>
    </b-container> -->




    <div class="text-photo-section">
      <div class="text-section">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div class="photo-section">
        <b-img
          :src="require('@/assets/us/apple_pick_wall_sit_original.jpg')"
          alt="Just us, sitting on a wall, surrounded by trees. You know... that cute ish. Lap it up. Go 'aww.' That's what it's there for."
          fluid
        ></b-img>
      </div>
    </div>
    <!-- <b-container fluid>
      <MainNav class="main-nav"/>
      <b-row no-gutter>
        <b-col cols="12">
          <div class="hero"></div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </b-col>
        <b-col>
          <b-img
            :src="require('@/assets/us/apple_pick_wall_sit_original.jpg')"
            alt="Just us, sitting on a wall, surrounded by trees. You know... that cute ish. Lap it up. Go 'aww.' That's what it's there for."
            fluid
          ></b-img>
        </b-col>
      </b-row>
    </b-container> -->

    <p>
      Hey look, it's the "Us" page!
    </p>
    <p>
      Work in progress/patience required.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';

export default Vue.extend({
  components: {
    MainNav,
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

$title-area-padding-top: 3rem;
$title-area-padding-bottom: 1rem;
$title-area-font-size: 4rem;
$title-area-line-height: $title-area-font-size;
$title-area-height: $title-area-padding-top + $title-area-padding-bottom + $title-area-line-height;

$title-area-padding-top-sm: 2rem;
$title-area-padding-bottom-sm: 1rem;
$title-area-font-size-sm: 2rem;
$title-area-line-height-sm: $title-area-font-size-sm;
$title-area-height-sm: $title-area-padding-top-sm + $title-area-padding-bottom-sm + $title-area-line-height-sm;

$nav-padding-top: 0.5rem;
$nav-padding-bottom: 0.5rem;
$nav-font-size: 1rem;
$nav-line-height: $nav-font-size;
$nav-height: $nav-padding-top + $nav-padding-bottom + $nav-line-height;

$nav-padding-top-sm: 0.5rem;
$nav-padding-bottom-sm: 0.5rem;
$nav-font-size-sm: 1rem;
$nav-line-height-sm: $nav-font-size-sm;
$nav-height-sm: $nav-padding-top-sm + $nav-padding-bottom-sm + $nav-line-height-sm;

$title-and-nav-height: $title-area-height + $nav-height;
$title-and-nav-height-sm: $title-area-height-sm + $nav-height-sm;

.us-view {
  position: relative;
  width: 100%;

  .title-and-nav {
    // position: relative;
    // position: absolute;
    // top: 0;
    position: sticky;
    top: -1 * $title-area-height;
    left: 0;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(3px);

    @include media-breakpoint-down(sm) {
      top: -1 * $title-area-height-sm;
    }

    .title-area {
      position: relative;
      text-align: center;
      font-size: $title-area-font-size;
      font-family: "Arima Madurai";
      padding: $title-area-padding-top 0 $title-area-padding-bottom 0;
      white-space: nowrap;
      line-height: $title-area-line-height;

      @include media-breakpoint-down(sm) {
        padding: $title-area-padding-top-sm 0 $title-area-padding-bottom-sm 0;
        font-size: $title-area-font-size-sm;
        line-height: $title-area-line-height-sm;
      }

      .title {
        text-transform: uppercase;
      }
    }

    .nav-area {
      position: relative;

      .main-nav {
        font-family: "Montserrat", sans-serif;
        position: relative;
        top: 0;
        left: 0;
        // padding: 0rem 2rem;
        padding: $nav-padding-top 2rem $nav-padding-bottom 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        align-items: center;
        text-transform: uppercase;
        font-size: $nav-font-size;
        line-height: $nav-line-height;

        @include media-breakpoint-down(sm) {
          padding: $nav-padding-top-sm 2rem $nav-padding-bottom-sm 2rem;
          font-size: $nav-font-size-sm;
          line-height: $nav-line-height-sm;
        }

        a {
          font-weight: 400;
          color: #2c3e50;
          padding: 0 1rem;

          &.router-link-exact-active {
            font-weight: 700;
            color: #2c3e50;
          }
        }
      }
    }
  }

  // .main-nav {
  //   font-family: "Montserrat", sans-serif;
  //   position: absolute;
  //   top: 4rem;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   // background-color: white;
  //   // background-color: rgba(255, 255, 255, 0.5);
  //   background-color: rgba(255, 255, 255, 1);
  //   padding: 0rem 2rem;
  //   // border-radius: 1rem;
  //   width: 100%;
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  //   justify-content: space-evenly;
  //   align-items: center;
  //   // box-shadow: 0 0 5px 5px #fff;
  //   text-transform: uppercase;

  //   @include media-breakpoint-down(sm) {
  //     font-size: 1rem;
  //   }

  //   a {
  //     font-weight: 400;
  //     color: #2c3e50;
  //     padding: 0.25rem 1rem;

  //     &.router-link-exact-active {
  //       font-weight: 700;
  //       color: #2c3e50;
  //     }
  //   }
  // }

  .hero {
    // width: 100vw;
    width: 100%;
    height: 100vh;
    margin-top: -1 * $title-and-nav-height;
    background-image: url('~@/assets/us/apple_pick_ladder_sit_original.jpg');
    background-position: center;
    background-size: cover;

    @include media-breakpoint-down(sm) {
      margin-top: -1 * $title-and-nav-height-sm;
    }
  }

  .text-photo-section {
    display: flex;
    align-items: center;
    // flex-wrap: wrap;

    .text-section {
      flex-grow: 1;
      // min-width: breakpoint-min(sm) / 2;
    }

    .photo-section {
      flex-grow: 1;
      // min-width: breakpoint-min(sm) / 2;
    }
  }
}
</style>
