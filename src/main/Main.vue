<template>
  <v-main class="py-n12">
    <router-view />
  </v-main>
</template>
<script>
  export default {
    name: 'MainView',
    components: {
    },
  }
</script>
<style>
  .v-main__wrap {
    max-width: 100%;
    position: relative;
    background-color: #fafafa;
  }
</style>