import { createRouter, createWebHistory } from "vue-router";
import Testing from "../views/Testing.vue";
import Login from "../views/Login.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/testing",
        name: "testing",
        component: Testing
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
