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

    <b-container fluid="lg" class="story pt-4 px-0 pb-4">
      <section class="story-row">
        <article class="story-col">
          <p>
            It started in 2014, in April, on Beacon Street.
          </p>
          <p>
            Aishu remembers meeting me for the first time on the porch. We were waiting for some mutual friends: our future roommates.
          </p>
          <p>
            She was already standing there, leaning against the railing, when I arrived at the foot of the steps.
          </p>
        </article>
        <article class="story-col">
          <div class="story-img clearfix apple_pick_wall_sit"></div>
        </article>
      </section>
      <section class="story-row reversed">
        <article class="story-col">
          <div class="story-img clearfix redbones_corner img-wide"></div>
        </article>
        <article class="story-col">
          <p>
            I told her my name and she told me hers. She told me, months later, that the shirt I was wearing that day was too small for me, and it made me look ridiculous.
          </p>
          <p>
            Aishu, on the other hand, wore a long, loose cardigan, with black and tan checkers splattered across the fabric in an irregular pattern. She looked like a walking QR code, but she still pulled it off.
          </p>
          <p>
            (she can pull anything off)
          </p>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col">
          <p>
            She remembers our first exchange being on that porch.
          </p>
          <p>
            Now, I usually defer to Aishu when memory is involved, because mine's a mess.
          </p>
          <p>
            Truth is, though, we actually met a few minutes <em>earlier.</em>
          </p>
        </article>
        <article class="story-col">
          <div class="story-img clearfix apple_pick_hand_hold img-wide"></div>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col story-col-single">
          <p>
            Out of everyone, I got to the apartment first.
          </p>
        </article>
      </section>
      <section class="story-row reversed">
        <article class="story-col">
          <div class="story-img clearfix redbones"></div>
        </article>
        <article class="story-col">
          <p>
            It was a triumph for me, the man who's always late. Fate wouldn't allow me the victory, though&mdash;I had no quarters for the meter. The nearest convenience store was about five minutes up the street, so I started on my way.
          </p>
          <p>
            A minute or so later, a girl appeared ahead of me, walking in my direction. She was pretty.
          </p>
          <p>
            She had these big, dark eyes, wrapped in long lashes. She had a mark on her cheek, flowing black hair, and she walked with purpose.
          </p>
          <p>
            I smiled and did one of those little head nods, the polite nod of acknowledging a stranger, an acceptable alternative to interrupting her thoughts with what would, inevitably, be an awkward and unnecessary <em>"Hello."</em>
          </p>
          <p>
            She smiled back, and we passed.
          </p>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col story-col-single">
          <p>
            <em>That's</em> when we met.
          </p>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col">
          <p>
            The apartment entered into a staircase. Our other friends went up first, then me, then Aishu at the back.
          </p>
          <p>
            I remember walking up those stairs practically blind, my head turned back toward Aishu, making stupid jokes and trying to make sure she felt comfortable with the potential roommates she didn't yet know.
          </p>
          <p>
            I don't know if she really needed that comfort (she definitely didn't need those jokes) but I couldn't help myself. I already liked her.
          </p>
          <p>
            I haven't stopped talking to her since that moment. It just makes me too happy.
          </p>
          <p>
            <em>She</em> makes me too happy.
          </p>
        </article>
        <article class="story-col">
          <div class="story-img clearfix apple_pick_hand_hold_run"></div>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col story-col-single">
          <p>
            I proposed to her in the summer, six years after that first smile.
          </p>
          <p>
             It didn't take six years for me to know, though...
          </p>
          <p>
             ...it took 'til I got to the top of the stairs.
          </p>
        </article>
      </section>
      <section class="story-row">
        <article class="story-col story-col-single signature">
          <p>
            - Keegan
          </p>
        </article>
      </section>
    </b-container>
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

.no-webp .us-view {
  .hero { background-image: url('~@/assets/us/apple_pick_ladder_sit_original.jpg'); }
  .story .story-row .story-col .story-img {
    &.apple_pick_wall_sit { background-image: url('~@/assets/us/apple_pick_wall_sit_original.jpg'); }
    &.redbones { background-image: url('~@/assets/us/redbones_original.jpg'); }
    &.redbones_corner { background-image: url('~@/assets/us/redbones_corner_original.jpg'); }
    &.apple_pick_wall_sit_center { background-image: url('~@/assets/us/apple_pick_wall_sit_center_original.jpg'); }
    &.apple_pick_hand_hold_run { background-image: url('~@/assets/us/apple_pick_hand_hold_run_original.jpg'); }
    &.apple_pick_hand_hold { background-image: url('~@/assets/us/apple_pick_hand_hold_original.jpg'); }
  }
}

.webp .us-view {
  .hero { background-image: url('~@/assets/us/apple_pick_ladder_sit_q90_lossy.webp'); }
  .story .story-row .story-col .story-img {
    &.apple_pick_wall_sit { background-image: url('~@/assets/us/apple_pick_wall_sit_q90_lossy.webp'); }
    &.redbones { background-image: url('~@/assets/us/redbones_q90_lossy.webp'); }
    &.redbones_corner { background-image: url('~@/assets/us/redbones_corner_q90_lossy.webp'); }
    &.apple_pick_wall_sit_center { background-image: url('~@/assets/us/apple_pick_wall_sit_center_q90_lossy.webp'); }
    &.apple_pick_hand_hold_run { background-image: url('~@/assets/us/apple_pick_hand_hold_run_q90_lossy.webp'); }
    &.apple_pick_hand_hold { background-image: url('~@/assets/us/apple_pick_hand_hold_q90_lossy.webp'); }
  }
}

.us-view {
  position: relative;
  width: 100%;

  .title-and-nav {
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
    z-index: 100;

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

  .hero {
    width: 100%;
    height: 100vh;
    margin-top: -1 * $title-and-nav-height;
    // NOTE: see the .webp and .no-webp variants at the top of the styles
    // background-image: url('~@/assets/us/apple_pick_ladder_sit_original.jpg');
    background-position: center;
    background-size: cover;

    @include media-breakpoint-down(sm) {
      margin-top: -1 * $title-and-nav-height-sm;
    }
  }

  .story {
    position: relative;
    width: 100%;

    .text-lg {
      font-size: 1.5em;
    }

    .story-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
      width: 100%;
      margin-top: 2rem;
      margin-bottom: 2rem;

      @include media-breakpoint-down(sm) {
        flex-direction: column;
        margin: 0;
      }

      &.reversed {
        @include media-breakpoint-down(sm) {
          flex-direction: column-reverse;
        }
      }

      .story-col {
        position: relative;
        width: 49%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-evenly;

        @include media-breakpoint-down(sm) {
          width: 100%;
        }

        &.story-col-single {
          width: 100%;
          font-size: 1.25em;

          &.signature {
            font-size: 1em;
          }
        }

        p {
          text-align: center;
          padding: 0 2rem;

          &:first-of-type {
            margin-top: 2rem;
          }

          &:last-of-type {
            margin-bottom: 2rem;
          }
        }

        .story-img {
          width: 100%;
          height: 100%;
          min-height: 75vh;
          background-position-x: 50%;
          background-position-y: 75%;
          background-size: cover;
          background-repeat: no-repeat;

          &.img-wide {
            min-height: 50vh;
          }

          &.apple_pick_wall_sit {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/apple_pick_wall_sit_original.jpg');
          }

          &.redbones {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/redbones_original.jpg');
          }

          &.redbones_corner {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/redbones_corner_original.jpg');
            background-position-x: 40%;
          }

          &.apple_pick_wall_sit_center {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/apple_pick_wall_sit_center_original.jpg');
            background-position-x: 45%;
          }

          &.apple_pick_hand_hold_run {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/apple_pick_hand_hold_run_original.jpg');
            background-position-x: 80%;
          }

          &.apple_pick_hand_hold {
            // NOTE: see the .webp and .no-webp variants at the top of the styles
            // background-image: url('~@/assets/us/apple_pick_hand_hold_original.jpg');
            background-position-x: 80%;
          }
        }
      }
    }
  }
}
</style>
