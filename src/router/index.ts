import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/us',
    name: 'Us',
    component: () => import(/* webpackChunkName: "us" */ '@/views/Us.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ '@/views/Map.vue'),
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: () => import(/* webpackChunkName: "hotels" */ '@/views/Hotels.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    // if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

export default router;
