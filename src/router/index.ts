import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "auth",
      authTitle: "Connexion",
      authSubtitle: "Connecte-toi pour retrouver tes personnages.",
      authFooter: "D&D Builder • SRD 5.2",
    },
  },
  {
    path: "/auth/signup",
    name: "signup",
    component: () => import("../views/SignUp.vue"),
    meta: {
      layout: "auth",
      authTitle: "Créer un compte",
      authSubtitle: "Inscris-toi pour commencer à créer tes personnages.",
      authFooter: "D&D Builder • SRD 5.2",
    },
  },
  /* {
    path: "/",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { layout: "app" },
  }, */
  /* {
    path: "/characters",
    name: "characters",
    component: () => import("@/views/CharactersListView.vue"),
    meta: { layout: "app" },
  }, */
  /* {
    path: "/builder",
    name: "builder",
    component: () => import("@/views/BuilderView.vue"),
    meta: { layout: "builder" },
  }, */
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
