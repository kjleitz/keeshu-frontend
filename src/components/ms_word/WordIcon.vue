<template>
  <img :src="src" :alt="alt" class="ms-word-icon">
</template>

<script lang="ts">
import { MsWordIcon, MsWordIconName, MS_WORD_ICONS } from '@/lib/ms_word/icons';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    icon: {
      type: String as PropType<MsWordIconName>,
      required: true,
    },
  },

  computed: {
    msWordIcon(): MsWordIcon {
      return MS_WORD_ICONS[this.icon];
    },

    src(): string {
      return this.msWordIcon.src;
    },

    alt(): string {
      return this.msWordIcon.alt;
    },
  },
});
</script>

<style lang="scss">
.word-icon {
  display: inline-block;
}
</style>
