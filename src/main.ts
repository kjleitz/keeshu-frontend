import '@/styles/fonts.scss';

import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import initBootstrap from '@/init/initBootstrap';
import { checkWebpSupport } from '@/lib/browser';

initBootstrap();

Vue.config.productionTip = false;

checkWebpSupport((supported) => {
  // Follows the same convention as `modernizr`, because I don't care to add
  // `modernizr` at the moment but it may lead me back here if I forget.
  const webpSupportClass = supported ? 'webp' : 'no-webp';
  document.body.classList.add(webpSupportClass);
  store.commit('setWebpSupported', supported);
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
