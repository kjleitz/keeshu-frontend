<template>
  <div class="home-view">
    <MainNav vertical/>
    <div class="background">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',

  components: {
    MainNav,
  },

  // components: {
  //   HelloWorld,
  // },
});
</script>

<style lang="scss">
.home-view {
  .main-nav {
    font-family: "Source Serif Pro", serif;
    .nav-link {
      font-size: 2rem;
    }
  }

  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #D8F5FA;
  // .main-nav {
  // }
  .background {
    height: 100%;
    width: 100%;
    z-index: -1000;
    .painting {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100vh;
      width: 100vw;
      background-origin: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .grass {
      background-image: url("~@/assets/grass.png");
      background-position: center;
    }
    .picnic-table {
      background-image: url("~@/assets/picnic_table_with_us.png");
      background-position: center left 40%;
    }
    .tree {
      background-image: url("~@/assets/tree.png");
      background-position: center right 40%;
    }
  }
  .our-names-obviously {
    color: rgb(0, 30, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
