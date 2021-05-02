<template>
  <div class="splash">
    <div class="splash-modal-backdrop" @click="$emit('close')"></div>
    <div class="splash-modal pt-4 pb-2 px-2">
      <header v-if="$slots.header" class="splash-header mb-2">
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss">
// what, I like the color
$discord: rgb(54, 56, 63);
$discord-light: rgb(64, 67, 75);
$discord-dark: rgb(47, 48, 54);

.splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;

  .splash-modal-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .splash-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 96%;
    width: 640px;
    background-color: $discord;
    border: 2px solid $discord-light;
    border-radius: 1rem;
    color: rgb(220, 220, 220);
    padding: 2rem;
    text-align: center;
    font-size: 1.25rem;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);

    .splash-header {
      font-size: 2rem;
    }
  }
}
</style>
