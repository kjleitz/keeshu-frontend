<template>
  <b-nav
    v-bind="$attrs"
    :class="['main-nav', $route.name]"
    v-on="$listeners"
  >
    <b-nav-item
      v-for="navItem in mainNavItems"
      :key="navItem.labelHtml"
      :to="{ name: navItem.routeName }"
    >
      <span v-html="navItem.labelHtml"></span>
    </b-nav-item>

    <b-nav-item v-if="!authorized" @click="showAuthSplash">
      More <span class="passcode-required">(passcode required)</span>
    </b-nav-item>
    <!-- <b-nav-item-dropdown v-else-if="!!moreNavItems.length" text="More">
      <b-dropdown-item
        v-for="navItem in moreNavItems"
        :key="navItem.labelHtml"
        :to="{ name: navItem.routeName }"
      >
        <span v-html="navItem.labelHtml"></span>
      </b-dropdown-item>
    </b-nav-item-dropdown> -->
    <!-- <b-nav-item
      v-else-if="hasMoreNavItems"
      @click="showMoreNavItemsList = !showMoreNavItemsList"
      @blur="onBlurMoreItemsList"
    > -->
    <b-nav-item
      v-else-if="hasMoreNavItems"
      class="more-nav-items-dropdown"
      @click="showMoreNavItemsList = !showMoreNavItemsList"
      @blur="onBlurMoreItemsList"
    >
      More
      <!-- <ul v-if="showMoreNavItemsList" :class="['more-nav-items-list', { show: showMoreNavItemsList }]"> -->
      <transition name="fade-fast">
        <div v-if="showMoreNavItemsList" class="more-nav-items-list-wrapper">
          <ul class="more-nav-items-list">
            <li
              v-for="navItem in moreNavItems"
              :key="navItem.labelHtml"
              class="more-nav-items-list-item"
            >
              <router-link
                :to="{ name: navItem.routeName }"
                class="more-nav-items-list-item-link"
                @click="leaving = true"
              >
                <span v-html="navItem.labelHtml"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </b-nav-item>
    <b-nav-item v-if="debug && atHome" @click="forgetMe">
      Forget me
    </b-nav-item>






    <!-- <transition name="fade" appear>
      <b-nav-item v-if="authorizedFor('Home')" :to="{ name: 'Home' }">
        Home
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item v-if="authorizedFor('Us')" :to="{ name: 'Us' }">
        Us
      </b-nav-item>
    </transition>
    <transition name="fade" appear>
      <b-nav-item v-if="authorizedFor('Faq')" :to="{ name: 'Faq' }">
        FAQ
      </b-nav-item>
    </transition>
    <template v-if="atHome">
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Rsvp')" :to="{ name: 'Rsvp' }">
          RSVP
        </b-nav-item>
      </transition>
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Stream')" :to="{ name: 'Stream' }">
          Stream
        </b-nav-item>
      </transition>
    </template>
    <template v-if="atHotels">
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Rsvp')" :to="{ name: 'Rsvp' }">
          RSVP
        </b-nav-item>
      </transition>
    </template>
    <template v-if="!atHome || mobileView">
      <transition name="fade" appear>
        <b-nav-item v-if="!authorized" @click="showAuthSplash">
          More <span class="passcode-required">(passcode required)</span>
        </b-nav-item>
        <b-nav-item-dropdown v-else text="More">
          <template v-if="!atHome">
            <b-dropdown-item v-if="authorizedFor('Rsvp')" :to="{ name: 'Rsvp' }">
              RSVP
            </b-dropdown-item>
            <b-dropdown-item v-if="authorizedFor('Stream')" :to="{ name: 'Stream' }">
              Stream
            </b-dropdown-item>
          </template>
          <b-dropdown-item v-if="authorizedFor('Faq')" :to="{ name: 'Faq' }">
            FAQ
          </b-dropdown-item>
          <b-dropdown-item v-if="authorizedFor('Hotels')" :to="{ name: 'Hotels' }">
            Hotels
          </b-dropdown-item>
          <b-dropdown-item v-if="authorizedFor('Map')" :to="{ name: 'Map' }">
            Map
          </b-dropdown-item>
          <b-nav-item v-if="debug && atHome" @click="forgetMe">
            Forget me
          </b-nav-item>
        </b-nav-item-dropdown>
      </transition>
    </template>
    <template v-else>
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Faq')" :to="{ name: 'Faq' }">
          FAQ
        </b-nav-item>
      </transition>
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Hotels')" :to="{ name: 'Hotels' }">
          Hotel<span class="hotels-last-letter">s</span>
        </b-nav-item>
      </transition>
      <transition name="fade" appear>
        <b-nav-item v-if="authorizedFor('Map')" :to="{ name: 'Map' }">
          Map
        </b-nav-item>
      </transition>
      <transition name="fade" appear>
        <b-nav-item v-if="!authorized" @click="showAuthSplash">
          More <span class="passcode-required">(passcode required)</span>
        </b-nav-item>
      </transition>
      <transition name="fade" appear>
        <b-nav-item v-if="debug && atHome && authorized" @click="forgetMe">
          Forget me
        </b-nav-item>
      </transition>
    </template> -->





    <!-- <transition name="fade" appear>
      <b-nav-item-dropdown text="Whatever">
        <b-dropdown-item href="#">
          Foo
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Bar
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Baz
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </transition> -->
  </b-nav>
</template>
<script lang="ts">
import store from '@/store';
import Vue, { PropType } from 'vue';

interface NavItem {
  routeName: string;
  labelHtml: string;
}

export default Vue.extend({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },

    mainItems: {
      type: Array as PropType<(string | Record<string, boolean>)[]>,
      default: () => [],
    },
  },

  data() {
    return {
      showMoreNavItemsList: false,
      // showMoreNavItemsList: true,
      leaving: false,
    };
  },

  computed: {
    authorized(): boolean {
      return store.getters.authorized;
    },

    atHome(): boolean {
      return this.$route.name === 'Home';
    },

    mobileView(): boolean {
      return window.innerWidth < 600;
    },

    navItems(): NavItem[] {
      return [
        { routeName: "Home", labelHtml: "Home" },
        { routeName: "Us", labelHtml: "Us" },
        { routeName: "Faq", labelHtml: "FAQ" },
        { routeName: "Hotels", labelHtml: 'Hotel<span class="hotels-last-letter">s</span>' },
        { routeName: "Map", labelHtml: "Map" },
        { routeName: "Rsvp", labelHtml: "RSVP" },
        { routeName: "Stream", labelHtml: "Stream" },
      ];
    },

    mainItemsEnabled(): Record<string, boolean> {
      const defaults = {
        home: true,
        us: true,
        faq: true,
        rsvp: this.$route.name === "Rsvp" || store.state.userType === "irl",
        stream: this.$route.name === "Stream" || store.state.userType === "streamer",
        hotels: this.$route.name === "Hotels" || false,
        map: this.$route.name === "Map" || false,
      };

      return this.mainItems.reduce<Record<string, boolean>>((memo, item) => ({
        ...memo,
        ...(typeof item === "string" ? { [item]: true } : item),
      }), defaults);
    },

    mainNavItems(): NavItem[] {
      return this.navItems.filter(({ routeName }) => {
        if (!store.getters.authorizedFor(routeName)) return false;
        if (this.$route.name === "Home") return true;
        const name = routeName.toLowerCase();
        return this.authorizedFor(name) && this.mainItemsEnabled[name];
      });
    },

    moreNavItems(): NavItem[] {
      return this.navItems.filter(({ routeName }) => {
        if (!store.getters.authorizedFor(routeName)) return false;
        if (this.$route.name === "Home") return false;
        const name = routeName.toLowerCase();
        return this.authorizedFor(name) && !this.mainItemsEnabled[name];
      });
    },

    hasMoreNavItems(): boolean {
      return !!this.moreNavItems.length;
    },
  },

  methods: {
    showAuthSplash(): void {
      store.commit("showAuth");
    },

    forgetMe(): void {
      localStorage.clear();
      window.location.reload();
    },

    authorizedFor(routeName: string): boolean {
      return store.getters.authorizedFor(routeName);
    },

    onBlurMoreItemsList(): void {
      setTimeout(() => {
        if (this.leaving) return;
        this.showMoreNavItemsList = false;
      }, 100);
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

.main-nav {
  font-family: 'Jacques Francois Shadow', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  // display: inline-block;
  padding: 30px;
  z-index: 1000;
  font-size: 1.5rem;
  align-items: center;

  &.nav {
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  // &:not(.vertical) {
  //   align-items: center;

  //   a {
  //     padding-top: 0;
  //     padding-bottom: 0;
  //     padding-left: 2rem;
  //     padding-right: 2rem;

  //     @include media-breakpoint-down(sm) {
  //       padding-left: 0.35rem;
  //       padding-right: 0.35rem;
  //       font-size: 0.8em;
  //     }
  //   }
  // }

  a {
    font-weight: bold;
    color: #2c3e50;
    white-space: nowrap;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;

    @include media-breakpoint-down(sm) {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      font-size: 0.75rem;
    }

    &.router-link-exact-active {
      color: #42b983;
    }

    // &.active {
    //   color: #42b983;
    // }

    .passcode-required {
      display: none;

      @include media-breakpoint-up(sm) {
        display: inline;
      }
    }
  }

  .more-nav-items-dropdown {
    position: relative;

    .more-nav-items-list-wrapper {
      position: absolute;
      z-index: 100;
      top: calc(100% + 1rem);
      right: -1rem;
      border-radius: 0.25rem;
      background-color: white;
      box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.25);

      &::before {
        content: "";
        position: absolute;
        left: calc(50% + 0.5rem);
        top: -0.25rem;
        transform-origin: center;
        transform: rotate(45deg);
        border-top: 0.25rem solid white;
        border-left: 0.25rem solid white;
        border-right: 0.25rem solid transparent;
        border-bottom: 0.25rem solid transparent;
        box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.25);
        width: 0.5rem;
        height: 0.5rem;
        z-index: -1;
      }

      .more-nav-items-list {
        list-style: none;
        margin: 0;
        padding: 0 1rem 0 1rem;
        border-radius: 0.25rem;
        // line-height: 1.5em;
        line-height: 1.5em;
        background-color: white;
        z-index: 100;

        a {
          // background-color: white;
          line-height: 1.5em;
        }

        .more-nav-items-list-item {
          margin: 0;
          // padding: 0.25rem 0;
          padding: 0.5rem 0;
          text-align: right;
          line-height: 1.5em;

          &:first-of-type {
            padding-top: 1rem;
          }

          &:last-of-type {
            padding-bottom: 1rem;
          }
        }
      }
    }

    // &:focus .more-nav-items-list {
    //   display: block;
    // }
  }

  // .top-nav-link {
  //   &::after {
  //     content: " | ";
  //     display: inline;
  //   }
  // }
}
</style>
