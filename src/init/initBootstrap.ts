import '@/styles/bootstrap_custom.scss';
import Vue from 'vue';

import {
  BootstrapVue,
  BFormInput,
  BIcon,
  BIconLink45deg,
  // BImg,
  BNav,
  BNavItem,
} from 'bootstrap-vue';

/**
 * From https://bootstrap-vue.org/docs:
 *
 *   Aliasing Vue import
 *
 *   If you are using a specific build of Vue (i.e. runtime-only vs. compiler +
 *   runtime), you will need to set up an alias to 'vue' in your bundler config
 *   to ensure that your project, BootstrapVue and PortalVue are all using the
 *   same build version of Vue. If you are seeing an error such as "$attr and
 *   $listeners is readonly", or "Multiple instances of Vue detected", then you
 *   will need to set up an alias.
 *
 * So, just keep that in mind in case it comes up.
 */

export default function initBootstrap(): void {
  Vue.use(BootstrapVue);
  Vue.component('BFormInput', BFormInput);
  Vue.component('BIcon', BIcon);
  Vue.component('BIconLink45deg', BIconLink45deg);
  // Vue.component('BImg', BImg);
  Vue.component('BNav', BNav);
  Vue.component('BNavItem', BNavItem);
}
