<template>
  <div
    :class="['editor-button', { appended, pressed: localPressed, disabled }]"
    :style="{ width }"
    tabindex="0"
    @click="onClick"
  >
  <!-- <div
    :class="['editor-button', { appended, pressed: localPressed, disabled }]"
    :style="{ width }"
    tabindex="0"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @mouseup="onMouseUp"
    @touchend="onMouseUp"
  > -->
    <WordIcon :icon="icon" class="editor-button-icon" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import WordIcon from '@/components/ms_word/WordIcon.vue';
import { MsWordIconName } from '@/lib/ms_word/icons';

export default Vue.extend({
  components: {
    WordIcon,
  },

  props: {
    icon: {
      type: String as PropType<MsWordIconName>,
      required: true,
    },

    appended: {
      type: Boolean,
      default: false,
    },

    width: {
      type: String,
      default: "auto",
    },

    toggle: {
      type: Boolean,
      default: false,
    },

    pressed: {
      type: Boolean,
      default: false,
    },

    disabled: {
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
    // onMouseDown(): void {
    //   // if (this.disabled) return;
    //   // if (this.toggle) return;
    //   // this.localPressed = true;
    //   if (this.disabled) return;
    //   if (this.toggle) {
    //     this.localPressed = !this.localPressed;
    //   } else {
    //     this.localPressed = true;
    //   }
    // },

    // onMouseUp(): void {
    //   if (this.disabled) return;
    //   if (this.toggle) return;
    //   this.localPressed = false;
    // },

    onClick(): void {
      if (this.disabled) return;
      if (this.toggle) this.localPressed = !this.localPressed;
      this.$emit("click");
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/colors";

.editor-button {
  display: inline-block;
  // margin: 0 0.2em;
  // padding: 0 calc(0.2em - 2px);
  padding: 0 0.2em;
  text-align: center;
  position: relative;
  outline: none;
  user-select: none;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  cursor: pointer;

  &.disabled {
    cursor: default;
  }

  &.appended {
    width: 10px;
    // margin-left: 0.1em;
    padding-left: 0.1em;
    text-align: center;
  }

  &.pressed, &:active:not(.disabled) {
    background-color: #dfdfdf;
    border-top: 1px solid $ms-bg-window-shadow;
    border-left: 1px solid $ms-bg-window-shadow;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;

    .editor-button-icon {
      position: relative;
      top: 1px;
    }
  }
}
</style>
