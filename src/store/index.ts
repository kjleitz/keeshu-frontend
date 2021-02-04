import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    webpSupported: false,
    inPrerender: !!(window as any).__PRERENDER_INJECTED,
  },

  mutations: {
    setWebpSupported(state, supported): void {
      state.webpSupported = supported;
    },
  },
});
