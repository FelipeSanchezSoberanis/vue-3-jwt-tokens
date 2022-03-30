import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use((config) => {
    console.log("Before request");
    return config;
});

axios.interceptors.response.use((config) => {
    console.log("After response");
    return config;
});

export default axios;
