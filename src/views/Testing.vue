<template>
  <h1>Testing</h1>

  {{ test }}

  <div></div>

  <button @click="reload">Reload</button>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";

export default {
  name: "Testing",
  setup() {
    const test = reactive({});

    function reload() {
      axios.get("/testing").then(function (res) {
        test.data = res.data;
      });
    }

    onMounted(function () {
      axios.get("/testing").then(function (res) {
        test.data = res.data;
      });
    });

    return { test, reload };
  }
};
</script>

<style scoped></style>
