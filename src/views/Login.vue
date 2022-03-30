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

export default {
  name: "Login",
  setup() {
    const router = useRouter();

    const loginInfo = reactive({});

    function login() {
      axios.post("/login", loginInfo).then(function (res) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        if (res.status === 200) {
          router.push("/testing");
        }
      });
    }

    return { loginInfo, login };
  }
};
</script>

<style scoped></style>
