import Vue from "vue";
import VueRouter from "vue-router";
import Schedule from "@/views/Schedule";
import Standing from "@/views/Standing";
import Stat from "@/views/Stat";
import About from "@/views/About";
import API from "@/views/API";

Vue.use(VueRouter);

const routes = [
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule
  },
  {
    path: "/standing",
    name: "Standing",
    component: Standing
  },
  {
    path: "/stat",
    name: "Stat",
    component: Stat
  },
  {
    path: "/doc",
    name: "API",
    component: API
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/",
    redirect: "/schedule"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
