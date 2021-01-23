<template>
  <div class="window-button">
    <div class="window-button-inner">
    <WordIcon :icon="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { MsWordIconName } from '@/lib/ms_word/icons';
import WordIcon from '@/components/ms_word/WordIcon.vue';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  components: {
    WordIcon,
  },

  props: {
    icon: {
      type: String as PropType<MsWordIconName>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/colors";

.window-button {
  background-color: $ms-bg-window-primary;
  border-top: 1px solid $ms-bg-window-light;
  border-left: 1px solid $ms-bg-window-light;
  border-right: 1px solid $ms-bg-window-dark;
  border-bottom: 1px solid $ms-bg-window-dark;
  width: 16px;
  height: 14px;
  margin: 1px;
  position: relative;

  .window-button-inner {
    border-top: 1px solid $ms-bg-window-primary;
    border-left: 1px solid $ms-bg-window-primary;
    border-right: 1px solid $ms-bg-window-shadow;
    border-bottom: 1px solid $ms-bg-window-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
