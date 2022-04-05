import { useAuthStore } from "../stores/index";
import { createRouter, createWebHistory } from "vue-router";
import Testing from "../views/Testing.vue";
import Login from "../views/Login.vue";
import axios from "axios";

async function authenticated(_to, _from, next) {
    const authStore = useAuthStore();

    let refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || !authStore.isAuthenticated) {
        next("/login");
    }

    let res = await axios.post("/refreshToken", {
        refreshToken: localStorage.getItem("refreshToken")
    });

    if (res.response && res.response.status === 401) {
        localStorage.removeItem("refreshToken");
        router.push("/login");
        return res;
    }

    authStore.accessToken = res.data.accessToken;
    authStore.isAuthenticated = true;

    next();
}

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/testing",
        name: "testing",
        component: Testing,
        beforeEnter: authenticated
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
