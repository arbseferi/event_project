<template>
  <v-app >
    <app-bar />
    <drawer />
    <!-- <v-progress-linear v-if="loading" indeterminate color="primary"/> -->
    <main-view/>
  </v-app>
</template>
<script>
  export default {
    name: 'DashboardIndex',
    components: {
      AppBar: () => import('../main/AppBar.vue'),
      Drawer: () => import('../main/Drawer.vue'),
      MainView: () => import('../main/Main.vue')
    },
    data() {
    return {
      prevRoute: null,
      loading: true
    }
    },
    methods: {
    },
  }
</script>