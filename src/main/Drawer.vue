<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    mobile-breakpoint="960"
    color="#fafafa"
    width="260"
  >
  <div class="d-flex align-center">
    <v-img height="80px" width="80px" :src="logo"></v-img>
  </div>
  <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon color="#4983a6">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="mr-12" style="color: #4983a6">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</v-navigation-drawer>
</template>
<script>
import logo from '../assets/logo.png'
export default {
    data() {
        return {
            drawer: true,
            logo: logo,
            items: [
                { title: 'Events', icon: 'mdi-view-dashboard', link: '/events' },
                { title: 'Add Event', icon: 'mdi-plus', link: '/addevent' },
                // { title: 'Edit Event', icon: 'mdi-pencil', link: '/editevent' },
                { title: 'About', icon: 'mdi-help-box', link: '/about' },
            ],
        }
    }
}
</script>