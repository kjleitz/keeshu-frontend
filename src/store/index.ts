import fakeAuth, { UserType } from '@/lib/fakeAuth';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    webpSupported: false,
    inPrerender: !!(window as any).__PRERENDER_INJECTED,
    // userType: localStorage.getItem("keeshu:userType") as UserType,
    userType: "irl" as UserType,
    authDeferred: false,
    intendedDestination: "",
  },

  mutations: {
    setWebpSupported(state, supported: boolean): void {
      state.webpSupported = supported;
    },

    // NB: This does not imply "real" auth; it's just for UX. See the comment
    //     above the `fakeAuth()` function in `src/lib/fakeAuth.ts` for details.
    authorize(state, passcode: string): void {
      const userType = fakeAuth(passcode);
      state.userType = userType;

      if (userType) {
        state.authDeferred = false;
        localStorage.setItem("keeshu:userType", userType);
      } else {
        localStorage.removeItem("keeshu:userType");
      }
    },

    deferAuth(state): void {
      state.authDeferred = true;
    },

    showAuth(state): void {
      state.authDeferred = false;
    },

    setIntendedDestination(state, routeName: string): void {
      state.intendedDestination = routeName || "";
    },

    clearIntendedDestination(state): void {
      state.intendedDestination = "";
    },
  },

  getters: {
    // NB: This does not imply "real" auth; it's just for UX. See the comment
    //     above the `fakeAuth()` function in `src/lib/fakeAuth.ts` for details.
    authorized(state): boolean {
      return !!state.userType;
    },

    // NB: This does not imply "real" auth; it's just for UX. See the comment
    //     above the `fakeAuth()` function in `src/lib/fakeAuth.ts` for details.
    authorizedFor(state): (page: string) => boolean {
      return (page: string): boolean => {
        if (state.userType === "admin") return true;

        switch (page.toLowerCase()) {
          case "rsvp": return state.userType === "irl";
          case "registry": return state.userType === "irl";
          case "stream": return state.userType === "irl" || state.userType === "streamer";
          case "faq": return state.userType === "irl" || state.userType === "streamer";
          default: return true;
        }
      };
    },
  },
});
