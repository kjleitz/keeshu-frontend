<template>
  <div class="microsoft-word">
    <div class="window-container">
      <div class="window-inner box-chamfer">
        <div class="title-bar">
          <div class="title-stuff">
            <img src="~@/assets/ms_word_icons/application.png" alt="Microsoft Word" class="application-icon">
            <!-- <span class="application-icon"></span> -->
            <span class="document-title">WEDDING_INFO.DOC</span>
            -
            <span class="application-title">Microsoft Word</span>
          </div>

          <div class="window-buttons">
            <WindowButton>
              <img src="~@/assets/ms_word_icons/minimize_window.png" alt="Minimize">
            </WindowButton>
            <WindowButton>
              <img src="~@/assets/ms_word_icons/unmaximize_window.png" alt="Restore">
            </WindowButton>
            <WindowButton>
              <img src="~@/assets/ms_word_icons/close_window.png" alt="Close">
            </WindowButton>
          </div>
        </div>
        <div class="menu-bar box-chamfer tool-bar">
          <span class="drag-indicator"></span>
          <span class="menu-item">File</span>
          <span class="menu-item">Edit</span>
          <span class="menu-item">View</span>
          <span class="menu-item">Insert</span>
          <span class="menu-item">Format</span>
          <span class="menu-item">Tools</span>
          <span class="menu-item">Table</span>
          <span class="menu-item">Window</span>
          <span class="menu-item">Help</span>
        </div>
        <div class="actions-bar box-chamfer tool-bar">
          <span class="drag-indicator"></span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/new.png" alt="New">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/open.png" alt="Open">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/save.png" alt="Save">
          </span>
          <span class="item-divider"></span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/print.png" alt="Print">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/find.png" alt="Find">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/spell_check.png" alt="Spell check">
          </span>
          <span class="item-divider"></span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/cut_disabled.png" alt="Cut">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/copy_disabled.png" alt="Copy">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/paste.png" alt="Paste">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/paint.png" alt="Paint">
          </span>
          <span class="item-divider"></span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/undo_disabled.png" alt="Undo">
          </span>
          <span class="action-item item-appended">
            <img src="~@/assets/ms_word_icons/dropdown_disabled.png" alt="More">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/redo_disabled.png" alt="Redo">
          </span>
          <span class="action-item item-appended">
            <img src="~@/assets/ms_word_icons/dropdown_disabled.png" alt="More">
          </span>
          <span class="item-divider"></span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/link.png" alt="Link">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/borders.png" alt="Borders">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/table.png" alt="Table">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/excel_table.png" alt="Excel table">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/columns.png" alt="Columns">
          </span>
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/word_art.png" alt="Word art">
          </span>
          <span class="item-divider"></span>
          <!-- <span class="action-item">
            <img src="~@/assets/ms_word_icons/find.png" alt="Find">
          </span> -->
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/paragraph.png" alt="Paragraph">
          </span>
          <span class="action-select">
            <span class="value">100%</span>
            <span class="dropdown">
              <!-- <img src="~@/assets/ms_word_icons/dropdown.png" alt="More"> -->
            </span>
          </span>
          <!-- <img src="~@/assets/ms_word_icons/zoom.png" alt="Zoom" class="action-item"> -->
          <span class="action-item">
            <img src="~@/assets/ms_word_icons/help.png" alt="Help">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WindowButton from '@/components/ms_word/WindowButton.vue';

export default Vue.extend({
  components: {
    WindowButton,
  },
});
</script>

<style lang="scss">
@import "@/styles/colors";

.microsoft-word {
  font-family: Arial, Helvetica, sans-serif;
  // font-size: 14px;
  position: relative;
  background-color: $ms-bg-window-primary;
  image-rendering: pixelated;

  .box-chamfer {
    border-top: 1px solid $ms-bg-window-light;
    border-left: 1px solid $ms-bg-window-light;
    border-right: 1px solid $ms-bg-window-shadow;
    border-bottom: 1px solid $ms-bg-window-shadow;
  }

  .tool-bar {
    font-size: 12px;
    position: relative;
    // padding: 0.2em 0.1em;
    padding: 0.2em;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    // width: 100%;
    // height: 2em;
    // line-height: 2em;
    // height: 100%;
  }

  .drag-indicator {
    display: inline-block;
    // width: 0.2em;
    width: 3px;
    // margin-right: 0.5em;
    // height: 100%;
    // line-height: 100%;
    background-color: $ms-bg-window-primary;
    border-top: 1px solid $ms-bg-window-light;
    border-left: 1px solid $ms-bg-window-light;
    border-right: 1px solid $ms-bg-window-shadow;
    border-bottom: 1px solid $ms-bg-window-shadow;
  }

  .item-divider {
    display: inline-block;
    width: 2px;
    margin: 0 0.5em;
    background-color: $ms-bg-window-primary;
    border-top: 1px solid $ms-bg-window-shadow;
    border-left: 1px solid $ms-bg-window-shadow;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;
  }

  .menu-item {
    display: inline-block;
    padding: 0 0.5em;
    // padding-right: 1em;

    &::first-letter {
      text-decoration: underline;
    }
  }

  .action-item {
    display: inline-block;
    // width: 22px;
    margin: 0 0.25em;
    text-align: center;
    // image-rendering: pixelated;

    &.item-appended {
      width: 10px;
      text-align: center;
    }
  }

  .action-select {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.8em;
    margin: 0 0.25em;
    // height: 1.5em;
    // margin: 0.25em;

    .value {
      border: 1px solid white;
      background-color: white;
      display: inline-block;
      padding: 0 1em 0 0;
      height: 1.5em;
      line-height: 1.5em;
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

  .window-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: 1px solid $ms-bg-window-primary;
    border-left: 1px solid $ms-bg-window-primary;
    border-right: 1px solid $ms-bg-window-shadow;
    border-bottom: 1px solid $ms-bg-window-shadow;

    .window-inner {
      // position: absolute;
      // top: 0;
      // left: 0;
      width: 100%;
      height: 100%;
      // border-top: 1px solid $ms-bg-window-light;
      // border-left: 1px solid $ms-bg-window-light;
      // border-right: 1px solid $ms-bg-window-primary;
      // border-bottom: 1px solid $ms-bg-window-primary;
      padding: 2px;

      .title-bar {
        // position: absolute;
        // top: 0;
        // left: 0;
        padding-left: 0.25em;
        font-size: 12px;
        font-weight: bold;
        width: 100%;
        height: 20px;
        line-height: 20px;
        background-color: $ms-bg-title;
        margin-bottom: 1px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-stuff {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .application-icon {
            margin-right: 0.25em;
          }

          .document-title {
            margin-right: 0.5em;
          }

          .application-title {
            margin-left: 0.5em;
          }
        }

        .window-buttons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 0.2em;
        }
      }
    }
  }
}
</style>
