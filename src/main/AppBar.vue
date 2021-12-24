<template>
  <v-app-bar
    id="app-bar"
    app
    flat
    color="grey-lighten 4"
    fixed
    height="80px"
  >
  <h3 style="color: #4983a6">Events Management Application</h3>
  <v-spacer />
  <v-icon color="#4983a6">mdi-account</v-icon>
  <h4 class="mx-4" style="color: #4983a6">{{firstName}} {{lastName}}</h4>
  <v-btn color="red" class="white--text" @click="logout">Log Out</v-btn>
  </v-app-bar> 
</template>
<script>
export default {
    methods: {
        logout() {
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.post(process.env.VUE_APP_API_URL+"/auth/signout",{} ,{headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    localStorage.clear()
                    this.$router.push({name: 'Login'})
                }else {
                    localStorage.clear()
                }
            })
        }
    },
    computed: {
        firstName() {
            return localStorage.firstName
        },
        lastName() {
            return localStorage.lastName
        }
    }
}
</script>