import store from "@/store";
import Vue from "vue";
import VueRouter, { NavigationGuard, RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const youDontEvenGoHere: NavigationGuard = (to, from, next): void => {
  if (store.getters.authorizedFor(to.name)) {
    store.commit("clearIntendedDestination", to.name);
    next();
  } else {
    store.commit("setIntendedDestination", to.name);
    next({ name: "Home" });
  }
};

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/us",
    name: "Us",
    component: () => import(/* webpackChunkName: "us" */ "@/views/Us.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/map",
    name: "Map",
    component: () => import(/* webpackChunkName: "map" */ "@/views/Map.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: () => import(/* webpackChunkName: "hotels" */ "@/views/Hotels.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/faq",
    name: "Faq",
    component: () => import(/* webpackChunkName: "faq" */ "@/views/Faq.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/rsvp",
    name: "Rsvp",
    component: () => import(/* webpackChunkName: "rsvp" */ "@/views/Rsvp.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/stream",
    name: "Stream",
    component: () => import(/* webpackChunkName: "stream" */ "@/views/Stream.vue"),
    beforeEnter: youDontEvenGoHere,
  },
  {
    path: "/registry",
    name: "Registry",
    beforeEnter(_to, _from, _next): void {
      window.location.assign("https://www.williams-sonoma.com/registry/w66hm9rwbd/registry-list.html");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    // if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

export default router;
