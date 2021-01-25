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
            <WindowButton icon="minimizeWindow" />
            <WindowButton icon="unmaximizeWindow" />
            <WindowButton icon="closeWindow" @click="$emit('close-window')" />
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
          <div class="close-container">
            <WindowButton icon="closeWindow" />
          </div>
        </div>
        <div class="actions-bar box-chamfer tool-bar">
          <span class="drag-indicator"></span>
          <EditorButton icon="new" />
          <EditorButton icon="open" />
          <EditorButton icon="save" />
          <span class="item-divider"></span>
          <EditorButton icon="print" />
          <EditorButton icon="find" />
          <EditorButton icon="spellCheck" />
          <span class="item-divider"></span>
          <EditorButton icon="cutDisabled" disabled />
          <EditorButton icon="copyDisabled" disabled />
          <EditorButton icon="paste" />
          <EditorButton icon="paint" />
          <span class="item-divider"></span>
          <EditorButton icon="undoDisabled" disabled />
          <EditorButton icon="dropdownDisabled" disabled appended />
          <EditorButton icon="redoDisabled" disabled />
          <EditorButton icon="dropdownDisabled" disabled appended />
          <span class="item-divider"></span>
          <EditorButton icon="link" />
          <EditorButton icon="borders" />
          <EditorButton icon="table" />
          <EditorButton icon="excelTable" />
          <EditorButton icon="columns" />
          <EditorButton icon="wordArt" />
          <span class="item-divider"></span>
          <EditorButton icon="paragraph" />
          <EditorDropdown value="100%"/>
          <EditorButton icon="help" />
        </div>
        <div class="formatting-bar box-chamfer tool-bar">
          <span class="drag-indicator"></span>
          <EditorDropdown value="Normal" whitespace="3.5em" />
          <EditorDropdown value="Times New Roman" whitespace="0.5em" />
          <EditorDropdown value="12" whitespace="0.75em" />
          <span class="item-divider"></span>
          <!-- <EditorButton icon="bold" width="20px" toggle />
          <EditorButton icon="italic" width="20px" toggle />
          <EditorButton icon="underline" width="20px" toggle /> -->
          <EditorButton icon="bold" width="22px" toggle />
          <EditorButton icon="italic" width="22px" toggle />
          <EditorButton icon="underline" width="22px" toggle />
          <span class="item-divider"></span>
          <EditorButton :pressed.sync="alignLeftPressed" icon="alignLeft" toggle />
          <EditorButton :pressed.sync="alignCenterPressed" icon="alignCenter" toggle />
          <EditorButton :pressed.sync="alignRightPressed" icon="alignRight" toggle />
          <EditorButton :pressed.sync="justifyPressed" icon="justify" toggle />
          <span class="item-divider"></span>
          <EditorButton icon="orderedList"/>
          <EditorButton icon="unorderedList"/>
          <EditorButton icon="outdent"/>
          <EditorButton icon="indent"/>
          <span class="item-divider"></span>
          <EditorButton icon="borderControl"/>
          <EditorButton icon="dropdown" appended disabled />
          <EditorButton icon="lineColor"/>
          <EditorButton icon="dropdown" appended disabled />
          <EditorButton icon="textColor"/>
          <EditorButton icon="dropdown" appended disabled />
        </div>
        <div class="editor-area">
          <div class="editor-area-inner">
            <div class="editor-area-inner-inner">
              <div class="ruled-area">
                <div class="tab-control">
                  <div class="tab-control-inner">
                    <div class="tab-control-inner-inner">
                      <WordIcon icon="tabControl"/>
                    </div>
                  </div>
                </div>
                <div class="horizontal-ruler">
                  <div class="measure measure-left"></div>
                  <div class="measure measure-center"></div>
                  <div class="measure measure-right"></div>
                </div>
                <div class="page-background">
                  <div class="page">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WindowButton from '@/components/ms_word/WindowButton.vue';
import EditorDropdown from '@/components/ms_word/EditorDropdown.vue';
import EditorButton from '@/components/ms_word/EditorButton.vue';
import WordIcon from '@/components/ms_word/WordIcon.vue';

export default Vue.extend({
  components: {
    WindowButton,
    EditorDropdown,
    EditorButton,
    WordIcon,
  },

  data() {
    return {
      alignLeftPressed: true,
      alignCenterPressed: false,
      alignRightPressed: false,
      justifyPressed: false,
    };
  },

  watch: {
    alignLeftPressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal) {
        this.alignCenterPressed = false;
        this.alignRightPressed = false;
        this.justifyPressed = false;
      }
    },

    alignCenterPressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal) {
        this.alignLeftPressed = false;
        this.alignRightPressed = false;
        this.justifyPressed = false;
      } else if (!this.alignRightPressed && !this.justifyPressed) {
        this.alignLeftPressed = true;
      }
    },

    alignRightPressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal) {
        this.alignLeftPressed = false;
        this.alignCenterPressed = false;
        this.justifyPressed = false;
      } else if (!this.alignCenterPressed && !this.justifyPressed) {
        this.alignLeftPressed = true;
      }
    },

    justifyPressed(newVal: boolean, _oldVal: boolean): void {
      if (newVal) {
        this.alignLeftPressed = false;
        this.alignCenterPressed = false;
        this.alignRightPressed = false;
      } else if (!this.alignCenterPressed && !this.alignRightPressed) {
        this.alignLeftPressed = true;
      }
    },

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
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;

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
    padding: 0.2em calc(0.2em - 1px) 0.2em 0.2em;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    // width: 100%;
    // height: 2em;
    // line-height: 2em;
    // height: 100%;

    &.menu-bar {
      .close-container {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
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
    margin: 0 0.25em;
    background-color: $ms-bg-window-primary;
    border-top: 1px solid $ms-bg-window-shadow;
    border-left: 1px solid $ms-bg-window-shadow;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;
  }

  .menu-item {
    display: inline-block;
    padding: 0 0.5em;
    font-size: 12px;
    // padding-right: 1em;

    &::first-letter {
      text-decoration: underline;
    }
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
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;

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

      .editor-area {
        position: relative;
        flex-grow: 1;
        border-right: 1px solid $ms-bg-window-light;

        .editor-area-inner {
          position: relative;
          height: 100%;
          width: 100%;
          border-top: 1px solid $ms-bg-window-shadow;
          border-left: 1px solid $ms-bg-window-shadow;
          border-right: 1px solid $ms-bg-window-primary;
          border-bottom: 1px solid $ms-bg-window-primary;

          .editor-area-inner-inner {
            position: relative;
            height: 100%;
            width: 100%;
            border-top: 1px solid $ms-bg-window-dark;
            border-left: 1px solid $ms-bg-window-dark;
            background-color: 1px solid $ms-bg-window-primary;

            .ruled-area {
              position: relative;
              width: 100%;
              height: 100%;

              .tab-control {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 17px;
                height: 17px;
                // border-top: 1px solid $ms-bg-window-shadow;
                // border-left: 1px solid $ms-bg-window-shadow;
                // border-right: 1px solid $ms-bg-window-shadow;
                border-bottom: 1px solid $ms-bg-window-light;

                .tab-control-inner {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  border: 1px solid $ms-bg-window-shadow;

                  .tab-control-inner-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top: 1px solid $ms-bg-window-light;
                    border-left: 1px solid $ms-bg-window-light;
                    border-right: 1px solid $ms-bg-window-primary;
                    border-bottom: 1px solid $ms-bg-window-primary;
                  }
                }
              }

              .horizontal-ruler {
                position: absolute;
                top: 5px;
                // left: 24px;
                left: 48px;
                height: 13px;
                line-height: 13px;
                width: calc(100% - 72px);
                // background-color: #fff;

                .measure {
                  display: inline-block;
                  height: 100%;

                  &.measure-left {
                    width: calc(100% * (0.75 / 8.5));
                    background-color: $ms-bg-window-shadow;
                  }

                  &.measure-center {
                    width: calc(100% * (7 / 8.5));
                    background-color: $ms-bg-window-light;
                  }

                  &.measure-right {
                    width: calc(100% * (0.75 / 8.5));
                    background-color: $ms-bg-window-shadow;
                  }
                }

              }

              .page-background {
                position: absolute;
                top: 24px;
                left: 24px;
                width: calc(100% - 24px);
                height: calc(100% - 24px);
                background-color: $ms-bg-window-shadow;
                overflow: scroll;

                .page {
                  font-family: serif;
                  min-height: 100%;
                  margin: 16px 24px 0 24px;
                  background-color: #fff;
                  border: 1px solid $ms-bg-window-dark;
                  border-bottom: 0;
                  box-shadow: 2px 2px 0px 0px $ms-bg-window-dark;
                  padding-left: calc(100% * (0.75 / 8.5));
                  padding-right: calc(100% * (0.75 / 8.5));
                  padding-top: calc((100vw - 72px) * (1 / 8.5));
                  image-rendering: auto;
                  font-smooth: auto;
                  -webkit-font-smoothing: auto;
                  -moz-osx-font-smoothing: auto;

                  a {
                    color: blue;
                    text-decoration: underline;

                    &:visited {
                      color: purple;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
