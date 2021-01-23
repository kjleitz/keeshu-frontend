<template>
  <div class="editor-dropdown">
    <span :style="{ paddingRight: whitespace }" class="value">{{ value }}</span>
    <span class="dropdown"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: "",
    },

    whitespace: {
      type: String,
      default: "1em",
    },
  },
});
</script>

<style lang="scss">
.editor-dropdown {
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  margin: 0 0.25em;
  // height: 1.5em;
  // margin: 0.25em;

  .value {
    border: 1px solid white;
    background-color: white;
    display: inline-block;
    padding: 0 0 0 1px; // padding-right is changed by the `whitespace` prop
    height: 1.5em;
    line-height: 1.25em;
    white-space: nowrap;
    // background-color: white;
  }

  .dropdown {
    border: 1px solid white;
    height: 1.5em;
    line-height: 1.5em;
    display: inline-block;
    width: 11px;
    text-align: center;
    // background-color: $ms-bg-window-primary;
    background-image: url("~@/assets/ms_word_icons/dropdown.png");
    background-position: center;
  }
  // height: 100%;
  // line-height: 100%;

  // &::after {
  //   content: "";
  //   display: inline-block;
  //   height: 100%;
  //   width: 7px;
  //   background-image: url("~@/assets/ms_word_icons/dropdown.png");
  //   background-position: center;
  //   // background-size: cover;
  //   background-repeat: no-repeat;
  // }
}
</style>
