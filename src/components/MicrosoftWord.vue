<template>
  <div
    class="microsoft-word"
    tabindex="-1"
    @keydown="onKeydown"
  >
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
          <!-- <span class="menu-item">File</span>
          <span class="menu-item">Edit</span>
          <span class="menu-item">View</span>
          <span class="menu-item">Insert</span>
          <span class="menu-item">Format</span>
          <span class="menu-item">Tools</span>
          <span class="menu-item">Table</span>
          <span class="menu-item">Window</span>
          <span class="menu-item">Help</span> -->
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="fileMenuOpen" @mouseenter.native="someMenuOpen && (fileMenuOpen = true)">File</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="editMenuOpen" @mouseenter.native="someMenuOpen && (editMenuOpen = true)">Edit</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="viewMenuOpen" @mouseenter.native="someMenuOpen && (viewMenuOpen = true)">View</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="insertMenuOpen" @mouseenter.native="someMenuOpen && (insertMenuOpen = true)">Insert</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="formatMenuOpen" @mouseenter.native="someMenuOpen && (formatMenuOpen = true)">Format</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="toolsMenuOpen" @mouseenter.native="someMenuOpen && (toolsMenuOpen = true)">Tools</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="tableMenuOpen" @mouseenter.native="someMenuOpen && (tableMenuOpen = true)">Table</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="windowMenuOpen" @mouseenter.native="someMenuOpen && (windowMenuOpen = true)">Window</WindowMenu>
          <WindowMenu :items="windowMenuItems" :dividers-after="[0]" :menu-open.sync="helpMenuOpen" @mouseenter.native="someMenuOpen && (helpMenuOpen = true)">Help</WindowMenu>
          <div class="close-container">
            <WindowButton icon="closeWindow" />
          </div>
        </div>
        <div class="actions-bar box-chamfer tool-bar">
          <div class="drag-indicator"></div>
          <EditorButton icon="new" />
          <EditorButton icon="open" />
          <EditorButton icon="save" />
          <div class="item-divider"></div>
          <EditorButton icon="print" />
          <EditorButton icon="find" />
          <EditorButton icon="spellCheck" />
          <div class="item-divider"></div>
          <EditorButton icon="cutDisabled" disabled />
          <EditorButton icon="copyDisabled" disabled />
          <EditorButton icon="paste" />
          <EditorButton icon="paint" />
          <div class="item-divider"></div>
          <EditorButton icon="undoDisabled" disabled />
          <EditorButton icon="dropdownDisabled" disabled appended />
          <EditorButton icon="redoDisabled" disabled />
          <EditorButton icon="dropdownDisabled" disabled appended />
          <div class="item-divider"></div>
          <EditorButton icon="link" />
          <EditorButton icon="borders" />
          <EditorButton icon="table" />
          <EditorButton icon="excelTable" />
          <EditorButton icon="columns" />
          <EditorButton icon="wordArt" />
          <div class="item-divider"></div>
          <EditorButton icon="paragraph" />
          <EditorDropdown value="100%"/>
          <EditorButton icon="help" />
        </div>
        <div class="formatting-bar box-chamfer tool-bar">
          <div class="drag-indicator"></div>
          <EditorDropdown value="Normal" whitespace="3.5em" />
          <EditorDropdown value="Times New Roman" whitespace="0.5em" />
          <EditorDropdown value="12" whitespace="0.75em" />
          <div class="item-divider"></div>
          <!-- <EditorButton icon="bold" width="20px" toggle />
          <EditorButton icon="italic" width="20px" toggle />
          <EditorButton icon="underline" width="20px" toggle /> -->
          <EditorButton icon="bold" width="22px" toggle />
          <EditorButton icon="italic" width="22px" toggle />
          <EditorButton icon="underline" width="22px" toggle />
          <div class="item-divider"></div>
          <EditorButton :pressed.sync="alignLeftPressed" icon="alignLeft" toggle />
          <EditorButton :pressed.sync="alignCenterPressed" icon="alignCenter" toggle />
          <EditorButton :pressed.sync="alignRightPressed" icon="alignRight" toggle />
          <EditorButton :pressed.sync="justifyPressed" icon="justify" toggle />
          <div class="item-divider"></div>
          <EditorButton icon="orderedList"/>
          <EditorButton icon="unorderedList"/>
          <EditorButton icon="outdent"/>
          <EditorButton icon="indent"/>
          <div class="item-divider"></div>
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
                <!-- TODO: extract `.horizontal-ruler` to its own component -->
                <div class="horizontal-ruler">
                  <div class="measure measure-left">
                    <div
                      v-for="n in range(-0.625, 0, 0.125)"
                      :key="n"
                      :class="[
                        'measure-marker',
                        {
                          'inch-eighth': n % 0.125 === 0 && n % 0.5 !== 0,
                          'inch-half': n % 0.5 === 0 && n % 1 !== 0,
                          'inch-number': n % 1 === 0,
                        },
                      ]"
                    >
                      {{ n % 1 === 0 ? n.toFixed(0) : '' }}
                    </div>
                    <div class="ruler-tab ruler-tab-start"></div>
                  </div>
                  <div class="measure measure-center">
                    <div
                      v-for="n in range(0.125, 7, 0.125)"
                      :key="n"
                      :class="[
                        'measure-marker',
                        {
                          'inch-eighth': n % 0.125 === 0 && n % 0.5 !== 0,
                          'inch-half': n % 0.5 === 0 && n % 1 !== 0,
                          'inch-number': n % 1 === 0,
                        },
                      ]"
                    >
                      {{ n % 1 === 0 ? n.toFixed(0) : '' }}
                    </div>
                    <div class="ruler-tab ruler-tab-stop"></div>
                  </div>
                  <div class="measure measure-right">
                    <div
                      v-for="n in range(7.125, 7.75, 0.125)"
                      :key="n"
                      :class="[
                        'measure-marker',
                        {
                          'inch-eighth': n % 0.125 === 0 && n % 0.5 !== 0,
                          'inch-half': n % 0.5 === 0 && n % 1 !== 0,
                          'inch-number': n % 1 === 0,
                        },
                      ]"
                    >
                      {{ n % 1 === 0 ? n.toFixed(0) : '' }}
                    </div>
                  </div>
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
import WindowMenu, { WindowMenuItem } from '@/components/ms_word/WindowMenu.vue';
import { range } from 'underscore';
import store from '@/store';

export default Vue.extend({
  components: {
    WindowButton,
    EditorDropdown,
    EditorButton,
    WordIcon,
    WindowMenu,
  },

  data() {
    return {
      alignLeftPressed: true,
      alignCenterPressed: false,
      alignRightPressed: false,
      justifyPressed: false,
      fileMenuOpen: false,
      editMenuOpen: false,
      viewMenuOpen: false,
      insertMenuOpen: false,
      formatMenuOpen: false,
      toolsMenuOpen: false,
      tableMenuOpen: false,
      windowMenuOpen: false,
      helpMenuOpen: false,
    };
  },

  computed: {
    // TODO: extract; this component shouldn't know about the site as a whole
    windowMenuItems(): WindowMenuItem[] {
      const rsvpItem = { label: "RSVP", shortcut: "Alt+R", action: () => this.$router.push({ name: "Rsvp" }) };

      return [
        { label: "Home", shortcut: "Alt+H", action: () => this.$router.push({ name: "Home" }) },
        // { label: "Info", shortcut: "Alt+I", action: () => this.$router.push({ name: "Info" }) },
        { label: "Hotels", shortcut: "Alt+O", action: () => this.$router.push({ name: "Hotels" }) },
        { label: "Us", shortcut: "Alt+U", action: () => this.$router.push({ name: "Us" }) },
        { label: "Map", shortcut: "Alt+M", action: () => this.$router.push({ name: "Map" }) },
        ...(store.getters.authorizedFor('rsvp') ? [rsvpItem] : []),
      ];
    },

    someMenuOpen(): boolean {
      return this.fileMenuOpen
        || this.editMenuOpen
        || this.viewMenuOpen
        || this.insertMenuOpen
        || this.formatMenuOpen
        || this.toolsMenuOpen
        || this.tableMenuOpen
        || this.windowMenuOpen
        || this.helpMenuOpen;
    },
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

    fileMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'file' });
    },

    editMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'edit' });
    },

    viewMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'view' });
    },

    insertMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'insert' });
    },

    formatMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'format' });
    },

    toolsMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'tools' });
    },

    tableMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'table' });
    },

    windowMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'window' });
    },

    helpMenuOpen(newVal: boolean, _oldVal: boolean): void {
      if (newVal) this.closeAllMenus({ except: 'help' });
    },
  },

  mounted(): void {
    (this.$el as HTMLElement).focus();
  },

  beforeRouteUpdate(_to, _from, next): void {
    (this.$el as HTMLElement).focus();
    next();
  },

  methods: {
    // TODO: extract; this component shouldn't know about the site as a whole
    onKeydown(event: KeyboardEvent): void {
      if (event.altKey) {
        const shortcuts = {
          KeyH: "Home",
          KeyI: "Info",
          KeyO: "Hotels",
          KeyU: "Us",
          KeyM: "Map",
          KeyR: "Rsvp",
        };
        const routeName = shortcuts[event.code as keyof typeof shortcuts];
        if (routeName) {
          event.preventDefault();
          this.$router.push({ name: routeName });
        }
      }
    },

    closeAllMenus({ except }: { except?: 'file' | 'edit' | 'view' | 'insert' | 'format' | 'tools' | 'table' | 'window' | 'help' } = {}): void {
      if (except !== 'file') this.fileMenuOpen = false;
      if (except !== 'edit') this.editMenuOpen = false;
      if (except !== 'view') this.viewMenuOpen = false;
      if (except !== 'insert') this.insertMenuOpen = false;
      if (except !== 'format') this.formatMenuOpen = false;
      if (except !== 'tools') this.toolsMenuOpen = false;
      if (except !== 'table') this.tableMenuOpen = false;
      if (except !== 'window') this.windowMenuOpen = false;
      if (except !== 'help') this.helpMenuOpen = false;
    },

    range(...args: Parameters<typeof range>): number[] {
      return range(...args);
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/colors";
@import "@/styles/breakpoints";

$page-max-width: 1024px;

.microsoft-word {
  font-family: Arial, Helvetica, sans-serif;
  // font-size: 14px;
  position: relative;
  background-color: $ms-bg-window-primary;
  image-rendering: pixelated;
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  // outline: none;

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
    // padding: 0.2em calc(0.2em - 1px) 0.2em 0.2em;
    display: flex;
    justify-content: flex-start;
    // align-items: stretch;
    align-items: center;
    background-color: $ms-bg-window-primary;
    // width: 100%;
    // height: 2em;
    // line-height: 2em;
    // height: 100%;
    // height: calc(2em + 0.4em - 2px);
    height: calc(2em + 0.4em - 2px);

    // > * {
    //   margin-top: 0.2em;
    //   margin-bottom: 0.2em;
    // }
    overflow: hidden;
    flex-wrap: wrap;

    &.menu-bar {
      // @include media-breakpoint-down(sm) {
      //   font-size: 11px;
      // }
      overflow: visible;
      flex-wrap: nowrap;

      .close-container {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1px;
      }
    }

    // &.actions-bar, &.formatting-bar {
    //   overflow: hidden;
    //   flex-wrap: wrap;
    //   // margin-bottom: 1rem;

    //   // > * {
    //   //   margin-bottom: 1em;
    //   // }
    // }
  }

  .drag-indicator {
    // display: inline-block;
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
    flex-shrink: 0;
    flex-grow: 0;
    height: calc(100% - 4px);
    margin: 2px;
  }

  .item-divider {
    // display: inline-block;
    width: 2px;
    margin: 0 0.25em;
    background-color: $ms-bg-window-primary;
    border-top: 1px solid $ms-bg-window-shadow;
    border-left: 1px solid $ms-bg-window-shadow;
    border-right: 1px solid $ms-bg-window-light;
    border-bottom: 1px solid $ms-bg-window-light;
    flex-shrink: 0;
    flex-grow: 0;
    height: calc(100% - 4px);
  }

  // .menu-item {
  //   display: inline-block;
  //   padding: 0 0.5em;
  //   font-size: 12px;
  //   // padding-right: 1em;

  //   &::first-letter {
  //     text-decoration: underline;
  //   }
  // }

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
          white-space: nowrap;

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
          position: absolute;
          top: 0;
          left: 0;
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

                @include media-breakpoint-down(sm) {
                  display: none;
                }

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
                // left: 48px;
                left: calc(48px + 50%);
                height: 13px;
                line-height: 13px;
                width: calc(100% - 72px);
                max-width: $page-max-width;
                // width: 100%;
                transform: translateX(calc(-50% - 48px));
                margin-left: 12px;
                // margin: 0 auto;

                @include media-breakpoint-down(sm) {
                  // left: calc(12px + 50%);
                  left: 50%;
                  // width: calc(100% - 24px);
                  width: 100%;
                  // transform: translateX(calc(-50% - 12px));
                  transform: translateX(-50%);
                  margin-left: 0;
                }

                .measure {
                  // display: inline-block;
                  position: absolute;
                  height: 100%;
                  // font-family: Courier, monospace;
                  font-size: 8px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-evenly;
                  align-items: center;
                  flex-wrap: nowrap;

                  &.measure-left {
                    left: 0;
                    width: calc(100% * (0.75 / 8.5));
                    // width: calc((100% * (0.75 / 8.5)) - 24px);
                    background-color: $ms-bg-window-shadow;
                  }

                  &.measure-center {
                    left: calc(100% * (0.75 / 8.5));
                    width: calc(100% * (7 / 8.5));
                    background-color: $ms-bg-window-light;
                    border-left: 3px solid $ms-bg-window-primary;
                    border-right: 3px solid $ms-bg-window-primary;
                  }

                  &.measure-right {
                    left: calc(100% * (7.75 / 8.5));
                    width: calc(100% * (0.75 / 8.5));
                    background-color: $ms-bg-window-shadow;
                  }

                  // @include media-breakpoint-down(sm) {
                  //   &.measure-left {
                  //     width: calc((100% * (0.75 / 8.5)) - 24px);
                  //   }
                  //   &.measure-center {
                  //     left: calc((100% * (0.75 / 8.5)) - 24px);
                  //   }
                  //   &.measure-right {
                  //     left: calc((100% * (7.75 / 8.5)) - 24px);
                  //   }
                  // }

                  .measure-marker {
                    text-align: center;

                    &.inch-eighth {
                      height: 2px;
                      width: 1px;
                      border-right: 1px solid $ms-bg-window-dark;
                    }

                    &.inch-half {
                      height: 4px;
                      width: 1px;
                      border-right: 1px solid $ms-bg-window-dark;
                    }
                  }

                  .ruler-tab {
                    position: absolute;
                    right: -7px;
                    width: 11px;
                    z-index: 100;

                    &.ruler-tab-start {
                      height: 24px;
                      top: -4px;
                      background-image: url('~@/assets/ms_word_icons/ruler_tab_start.png');
                    }

                    &.ruler-tab-stop {
                      height: 10px;
                      bottom: -1px;
                      background-image: url('~@/assets/ms_word_icons/ruler_tab_stop.png');
                    }
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
                padding: 16px 24px 0px 24px;

                @include media-breakpoint-down(sm) {
                  padding: 16px 0px 0px 0px;
                  left: 0px;
                  width: 100%;
                }

                .page {
                  position: relative;
                  max-width: $page-max-width;
                  font-family: serif;
                  min-height: 100%;
                  // margin: 16px 24px 0 24px;
                  // margin: 16px 24px -24px 24px;
                  margin: 0 auto -24px auto;
                  background-color: #fff;
                  border: 1px solid $ms-bg-window-dark;
                  border-bottom: 0;
                  box-shadow: 2px 2px 0px 0px $ms-bg-window-dark;
                  padding-left: min(calc(#{$page-max-width * (0.75 / 8.5)}), calc(100% * (0.75 / 8.5)));
                  padding-right: min(calc(#{$page-max-width * (0.75 / 8.5)}), calc(100% * (0.75 / 8.5)));
                  padding-top: min(calc(#{$page-max-width * (1 / 8.5)}), calc((100vw - 72px) * (1 / 8.5)));
                  padding-bottom: min(calc(#{$page-max-width * (1 / 8.5)}), calc((100vw - 72px) * (1 / 8.5)));
                  image-rendering: auto;
                  font-smooth: auto;
                  -webkit-font-smoothing: auto;
                  -moz-osx-font-smoothing: auto;

                  @include media-breakpoint-down(sm) {
                    border-left: 0;
                    border-right: 0;
                  }

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
