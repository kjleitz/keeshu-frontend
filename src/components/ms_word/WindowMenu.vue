<template>
  <div
    :class="['window-menu', { 'window-menu-open': localMenuOpen }]"
    tabindex="0"
    @click="onClick"
    @blur="onBlur"
  >
    <slot></slot>
    <div v-if="localMenuOpen" class="window-menu-items-container">
      <div class="window-menu-items">
        <div
          v-for="(item, index) in items"
          :key="index"
          tabindex="0"
          class="window-menu-item"
          @click="onClickItem(item)"
        >
          <div class="window-menu-item-content">
            <span class="window-menu-item-label">
              {{ item.label }}
            </span>
            <span class="window-menu-item-shortcut">
              {{ item.shortcut }}
            </span>
          </div>
          <div v-if="dividerIndices.includes(index)" class="window-menu-item-divider">
            <div class="window-menu-item-divider-inner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export interface WindowMenuItem {
  label: string;
  shortcut: string;
  action: () => void;
}

export default Vue.extend({
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },

    items: {
      type: Array as PropType<WindowMenuItem[]>,
      default: (): WindowMenuItem[] => [],
    },

    dividersAfter: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: (): string | number | (string | number)[] => [],
    },
  },

  data() {
    return {
      localMenuOpen: this.menuOpen,
    };
  },

  computed: {
    dividerIndices(): number[] {
      const indexList = Array.isArray(this.dividersAfter) ? this.dividersAfter : [this.dividersAfter];
      return indexList.map(divIndex => typeof divIndex === 'string' ? parseInt(divIndex, 10) : divIndex);
    },
  },

  watch: {
    localMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal !== this.menuOpen) this.$emit("update:menuOpen", newVal);
    },

    menuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal !== this.localMenuOpen) this.localMenuOpen = newVal;
    },
  },

  methods: {
    onClick(): void {
      this.localMenuOpen = !this.localMenuOpen;
    },

    onBlur(): void {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.localMenuOpen) this.localMenuOpen = false;
        }, 100);
      });
    },

    onClickItem(item: WindowMenuItem): void {
      item.action();
      this.$nextTick(() => {
        this.localMenuOpen = false;
      });
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/colors";
@import "@/styles/breakpoints";

.window-menu {
  position: relative;
  padding: 0 0.5em;
  font-size: 12px;
  border: 1px solid transparent;
  outline: none;
  user-select: none;
  cursor: pointer;

  @include media-breakpoint-down(sm) {
    font-size: 11px;
  }

  &::first-letter {
    text-decoration: underline;
  }

  &:hover {
    border-top: 1px solid $ms-bg-window-light;
    border-left: 1px solid $ms-bg-window-light;
    border-right: 1px solid $ms-bg-window-shadow;
    border-bottom: 1px solid $ms-bg-window-shadow;
  }

  &:active, &.window-menu-open {
    border-top: 1px solid $ms-bg-window-shadow;
    border-left: 1px solid $ms-bg-window-shadow;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;
  }

  .window-menu-items-container {
    position: absolute;
    top: calc(100% + 2px);
    left: -1px;
    // min-width: 20rem;
    z-index: 10000;
    // min-width: 10rem;
    background-color: $ms-bg-window-primary;
    border-top: 1px solid $ms-bg-window-primary;
    border-left: 1px solid $ms-bg-window-primary;
    border-right: 1px solid $ms-bg-window-dark;
    border-bottom: 1px solid $ms-bg-window-dark;

    .window-menu-items {
      width: 100%;
      height: 100%;
      border-top: 1px solid $ms-bg-window-light;
      border-left: 1px solid $ms-bg-window-light;
      border-right: 1px solid $ms-bg-window-shadow;
      border-bottom: 1px solid $ms-bg-window-shadow;

      .window-menu-item {
        position: relative;
        width: 100%;
        outline: none;
        // margin: 0.25rem 0;

        .window-menu-item-content {
          width: calc(100% - 2px);
          padding: 0.15em 1.25em;
          margin: 1px;
          // margin: 0.25rem 1.25rem;
          // padding: 0.25rem 1.25rem;
          // padding: 0 1.25rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          // flex-wrap: nowrap;
          // width: 50%;
          // padding: 0 0.5rem;

          &:hover {
            background-color: $ms-bg-title;
            .window-menu-item-label, .window-menu-item-shortcut {
              color: rgba(255, 255, 255, 0.9);
            }
          }

          .window-menu-item-label {
            flex-grow: 1;
            display: inline-block;
            // width: 5em;
            padding-right: 2em;
          }

          .window-menu-item-shortcut {
            display: inline-block;
            width: 2.75em;
          }
        }

        .window-menu-item-divider {
          position: relative;
          // width: calc(100% - 1em);
          width: 100%;
          height: calc(0.2em + 2px);
          padding: 0.1em 0.25em;
          // margin: 0 0.5em;

          .window-menu-item-divider-inner {
            width: 100%;
            height: 2px;
            border-top: 1px solid $ms-bg-window-shadow;
            border-bottom: 1px solid $ms-bg-window-light;
          }
        }
      }
    }
  }
}
</style>
