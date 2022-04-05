<template>
  {{ loginInfo }}

  <h1>Login</h1>

  <label for="username">Username</label>
  <input
    v-model="loginInfo.username"
    type="text"
    name="username"
    id="username" />

  <div></div>

  <label for="password">Password</label>
  <input
    v-model="loginInfo.password"
    type="password"
    name="password"
    id="password" />

  <div></div>

  <button @click="login">Login</button>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/index.js";

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();

    const router = useRouter();

    const loginInfo = reactive({});

    function login() {
      axios.post("/login", loginInfo).then(function (res) {
        if (res.status === 200) {
          localStorage.setItem("refreshToken", res.data.refreshToken);

          authStore.accessToken = res.data.accessToken;
          authStore.isAuthenticated = true;

          router.push("/testing");
        }
      });
    }

    return { loginInfo, login };
  }
};
</script>

<style scoped></style>
