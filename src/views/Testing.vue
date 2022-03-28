<template>
  <h1>Testing</h1>

  {{ test }}

  <div></div>

  <button @click="reload">Reload</button>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "Testing",
  setup() {
    const store = useStore();

    const test = reactive({});

    function reload() {
      axios
        .get("/testing", {
          headers: { Authorization: "Bearer " + store.state.accessToken }
        })
        .then(function (res) {
          test.data = res.data;
        });
    }

    onMounted(function () {
      axios
        .get("/testing", {
          headers: { Authorization: "Bearer " + store.state.accessToken }
        })
        .then(function (res) {
          test.data = res.data;
        });
    });

    return { test, reload };
  }
};
</script>

<style scoped></style>
