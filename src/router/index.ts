import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import ProfileListings from "@/pages/profile/Listings.vue";
import AddListing from "@/components/AddListing.vue";
import Bookings from "@/components/Bookings.vue";
import Notfound from "@/pages/NotFound.vue";
import Reviews from "@/components/CustomerReviews.vue";

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
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup route" */ "@/pages/SignUp.vue"),
  },
  {
    path: "/listing/:id",
    name: "Listing",
    component: () =>
      import(/* webpackChunkName: "listingroute" */ "@/pages/rent/Listing.vue"),
  },
  {
    path: "/:id",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Applicationsroute" */ "@/pages/profile/Applications.vue"
      ),
    children: [
      {
        path: "",
        name: "Listings",
        component: ProfileListings,
      },
      {
        path: "addlisting",
        name: "addlisting",
        component: AddListing,
      },
      {
        path: "bookings",
        name: "Bookings",
        component: Bookings,
      },
      {
        path: "reviews",
        name: "reviews",
        component: Reviews,
      },
    ],
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () =>
      import(/* webpackChunkName: "FAQ's route" */ "@/pages/Faq.vue"),
  },
  {
    path: "/policy",
    name: "Policy",
    component: () =>
      import(/* webpackChunkName: "Policy route" */ "@/pages/Privacy.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "Contact route" */ "@/pages/Contact.vue"),
  },
  {
    path: "/guide",
    name: "Guide",
    component: () =>
      import(/* webpackChunkName: "Guide route" */ "@/pages/Guide.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () =>
      import(/* webpackChunkName: "Team route" */ "@/pages/Team.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () =>
      import(/* webpackChunkName: "Blog route" */ "@/pages/Blog.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: Notfound,
    meta: {
      requiresAuth: false,
      title: "Page not found - Kikao",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
