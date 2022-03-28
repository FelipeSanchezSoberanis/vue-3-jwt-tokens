import axios from "axios";
import store from "../store/index";

axios.defaults.baseURL = "http://localhost:8080/api";

let refresh = false;

axios.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (error.response.status === 401 && !refresh) {
            refresh = true;

            const { status, data } = await axios.post("/refreshToken", {
                refreshToken: localStorage.getItem("refreshToken")
            });

            if (status === 200) {
                store.dispatch("setNewAccessToken", data.accessToken);
                error.config.headers["Authorization"] =
                    "Bearer " + data.accessToken;

                return axios.request(error.config);
            }
        }
        refresh = false;
        return error;
    }
);
