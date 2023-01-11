import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/pages/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/AboutView.vue"),
  },
  {
    path: "/listings",
    name: "Rent",
    component: () =>
      import(/* webpackChunkName: "rent" */ "@/pages/rent/index.vue"),
  },
  {
    path: "/listing/:id",
    name: "Listing",
    component: () =>
      import(/* webpackChunkName: "listingroute" */ "@/pages/rent/Listing.vue"),
  },
  {
    path: "/addlistings",
    name: "Applications",
    component: () =>
      import(
        /* webpackChunkName: "Applicationsroute" */ "@/pages/Applications.vue"
      ),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () =>
      import(/* webpackChunkName: "FAQ'sroute" */ "@/pages/Faq.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;