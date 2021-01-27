<template>
  <div
    :class="['window-button', { pressed: localPressed }]"
    tabindex="0"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @mouseup="onMouseUp"
    @touchend="onMouseUp"
  >
    <div class="window-button-inner">
      <WordIcon :icon="icon" class="window-button-icon"/>
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

    pressed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localPressed: this.pressed,
    };
  },

  watch: {
    localPressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal !== this.pressed) this.$emit("update:pressed", newVal);
    },

    pressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal !== this.localPressed) this.localPressed = newVal;
    },
  },

  methods: {
    onMouseDown(): void {
      this.localPressed = true;
    },

    onMouseUp(): void {
      this.localPressed = false;
      this.$emit('click');
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
  user-select: none;
  outline: none;
  cursor: pointer;

  &.pressed {
    border-top: 1px solid $ms-bg-window-dark;
    border-left: 1px solid $ms-bg-window-dark;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;

    .window-button-inner {
      border-top: 1px solid $ms-bg-window-shadow;
      border-left: 1px solid $ms-bg-window-shadow;
      border-right: 1px solid $ms-bg-window-primary;
      border-bottom: 1px solid $ms-bg-window-primary;

      .window-button-icon {
        position: relative;
        top: 1px;
        left: 1px;
      }
    }
  }

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
