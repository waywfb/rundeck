<template>
  <div id="app">
    <user-summary></user-summary>
  </div>
</template>

<script>
import userSummary from "./components/userSummary.vue";

export default {
  name: "App",
  components: {
    userSummary,
  },
};
</script>

<style></style>
