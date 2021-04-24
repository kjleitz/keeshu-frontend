<template>
  <div class="info-view">
    <MicrosoftWord class="ms-word" @close-window="onCloseWordWindow">
      <h1>General information</h1>
      <p class="text-center">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        -
        <router-link :to="{ name: 'Hotels' }">Hotels</router-link>
        -
        <router-link :to="{ name: 'Us' }">Us</router-link>
        -
        <router-link :to="{ name: 'Map' }">Map</router-link>
        <template v-if="$store.getters.authorizedFor('rsvp')">
          -
          <router-link :to="{ name: 'Rsvp' }">RSVP</router-link>
        </template>
      </p>
      <p>
        <strong>Dates</strong>
        <ul>
          <!-- <li>
            <em>Rehearsal dinner:</em> 8/13/2021
          </li> -->
          <li>
            <em>Ceremony &amp; reception:</em> 8/14/2021
          </li>
          <!-- <li>
            <em>Farewell brunch:</em> 8/15/2021
          </li> -->
        </ul>
      </p>
      <p>
        <strong>Location</strong>
        <ul>
          <!-- <li>
            <em>Rehearsal dinner: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li> -->
          <li>
            <em>Ceremony &amp; reception: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li>
          <!-- <li>
            <em>Farewell brunch: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li> -->
        </ul>
      </p>
    </MicrosoftWord>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MicrosoftWord from '@/components/MicrosoftWord.vue';

export default Vue.extend({
  components: {
    MicrosoftWord,
  },

  methods: {
    onCloseWordWindow(): void {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss">
.info-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  .ms-word {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: center;
    }
  }
}
</style>
