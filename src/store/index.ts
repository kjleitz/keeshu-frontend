import auth, { UserType } from '@/lib/auth';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    webpSupported: false,
    inPrerender: !!(window as any).__PRERENDER_INJECTED,
    userType: localStorage.getItem("keeshu:userType") as UserType,
    authDeferred: false,
  },

  mutations: {
    setWebpSupported(state, supported: boolean): void {
      state.webpSupported = supported;
    },

    authorize(state, passcode: string): void {
      const userType = auth(passcode);
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
  },

  getters: {
    authorized(state): boolean {
      return !!state.userType;
    },
  },
});
