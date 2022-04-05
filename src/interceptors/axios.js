import axios from "axios";
import { useAuthStore } from "@/stores/index";
import router from "@/router/index";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use((config) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        config.headers["Authorization"] = "Bearer " + authStore.accessToken;
    }

    return config;
});

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const authStore = useAuthStore();

        if (err.response.status === 401 && authStore.isAuthenticated) {
            authStore.isAuthenticated = false;

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

            let request = err.config;
            request.headers["Authorization"] =
                "Bearer " + authStore.accessToken;

            let originalRes = await axios(request);
            return originalRes;
        }

        // if (err.response.status === 403) {
        // let refreshToken = localStorage.getItem("refreshToken");
        // if (refreshToken) {
        // let res = await axios.post("/refreshToken", {
        // refreshToken: localStorage.getItem("refreshToken")
        // });

        // if (res.response && res.response.status === 401) {
        // router.push("/login");
        // return res;
        // }

        // authStore.accessToken = res.data.accessToken;
        // authStore.isAuthenticated = true;

        // let request = err.config;
        // request.headers["Authorization"] =
        // "Bearer " + authStore.accessToken;

        // let originalRes = await axios(request);
        // return originalRes;
        // }
        // }

        return err;
    }
);

export default axios;
