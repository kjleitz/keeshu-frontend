<template>
  <div class="rsvp-view">
    <div class="nav-area">
      <MainNav class="main-nav"/>
    </div>
    <div class="rsvp-envelope">
      <div class="rsvp-card">
        <iframe class="rsvpify-form" src="/rsvpify.html" frameborder="0"></iframe>
      </div>
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

  // data() {
  //   return {
  //     sunlightColor: "",
  //   };
  // },

  mounted(): void {
    document.body.classList.add("rsvp-page");
  },

  beforeDestroy(): void {
    document.body.classList.remove("rsvp-page");
  },

  beforeRouteUpdate(_to, _from, next): void {
    document.body.classList.add("rsvp-page");
    next();
  },

  beforeRouteLeave(_to, _from, next): void {
    document.body.classList.remove("rsvp-page");
    next();
  },
});
</script>

<style lang="scss">
$navy-light: rgb(0, 0, 175);
$navy: rgb(0, 0, 128);
$usps: rgb(51, 49, 99);
$usps-dark: rgb(26, 24, 75);

body.rsvp-page {
  // background-color: #333163;
  // background: linear-gradient(135deg, white 0%, #333163 75%, #333163 100%);
  // background: linear-gradient(135deg, navy 0%, #333163 75%, #333163 100%);
  // background: linear-gradient(135deg, navy 0%, #333163 100%);
  // background: linear-gradient(135deg, navy 0%, rgb(51, 49, 99) 100%);
  // background: linear-gradient(135deg, navy 0%, rgb(25, 25, 75) 100%);
  // background: linear-gradient(135deg, rgb(0, 0, 128) 0%, rgb(25, 25, 75) 100%);
  background: linear-gradient(135deg, $navy-light 0%, $navy 25%, $usps 75%, $usps-dark 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
  // border-top-left-radius: 5rem;
}

.rsvp-view {
  // background-color: #184A9D;
  // background-color: #333163;
  min-height: fit-content;

  .nav-area {
    position: sticky;
    top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .main-nav {
      position: relative;
      text-align: center;
      padding-left: 0;
      padding-right: 0;

      a {
        color: white;
        font-style: italic;
        font-weight: bold;
        font-size: 2rem;
        text-transform: uppercase;

        &.router-link-exact-active {
          color: #E60030;
        }
      }
      // top: 0;
      // left: 50%;
      // transform: translateX(-50%);
    }
  }

  .rsvp-envelope {
    margin: 0 auto;
    // max-width: 640px; // TODO
    // max-height: 640px; // TODO
    width: min(95vw, 640px); // TODO
    height: 640px; // TODO
    background-color: #fffff0; // TODO
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 1rem;

    .rsvp-card {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.25);

      .rsvpify-form {
        width: 100%;
        // height: 2000px;
        height: 100%;
      }
    }
  }
}
</style>
