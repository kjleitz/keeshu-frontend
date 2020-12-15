<template>
  <div class="home-view">
    <div class="our-names-obviously">
      <div class="surprise-its-a-name name-aishu">Aishu</div>
      <div class="surprise-its-a-name name-and">&amp;</div>
      <div class="surprise-its-a-name name-keegan">Keegan</div>
      <div class="tagline">(a marriage)</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
});
</script>

<style lang="scss">
.home-view {
  .our-names-obviously {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    height: 100vh;
    // font-size: 15vh;
    font-size: min(15vh, 15vw);
    padding: 15vh 0;
    line-height: 15vh;
    padding-right: 5vw;
    font-family: 'Emilys Candy', sans-serif;
    .surprise-its-a-name {
      text-transform: uppercase;
    }
    .tagline {
      font-size: min(9vh, 9vw);
    }
  }
}
</style>
