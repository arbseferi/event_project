<template>
  <v-app id="app">
    <v-row class="fill-height d-flex align-center justify-center">
      <v-col class="d-flex align-center justify-center">
        <v-img
          class="ml-16"
          style="border-radius: 12px"
          height="100%"
          width="80%"
          :src="eventImg"
        >
        </v-img>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-card
          v-if="mode"
          color="transparent"
          flat
          elevation="8"
          class="py-8 px-16 mr-16"
        >
          <v-alert v-if="alertFail" dense text type="error">
            {{ alertMsg }}
          </v-alert>
          <v-card-title> Log In </v-card-title>
          <v-text-field
            v-model="username"
            label="Username or Email"
            dense
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            dense
            outlined
          ></v-text-field>
          <v-card-actions>
            <v-spacer />
            <v-btn small text color="indigo lighten-2" @click="mode = false"
              >Register</v-btn
            >
            <v-btn @click="login" class="white--text" color="blue">Login</v-btn>
            <v-progress-circular
              v-if="loadingLogin"
              indeterminate
              color="blue"
            />
          </v-card-actions>
        </v-card>
        <v-card
          v-if="!mode"
          color="transparent"
          flat
          elevation="8"
          class="py-8 px-16 mr-16"
        >
          <v-form v-model="validRegister">
            <v-card-title> Register </v-card-title>
            <v-text-field
              v-model="registerName"
              label="Name"
              :rules="rules"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="registerSurname"
              label="Surname"
              :rules="rules"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="registerPhone"
              label="Phone"
              type="number"
              :rules="rules"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="registerEmail"
              label="Email"
              :rules="emailRules"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="registerUsername"
              label="Username"
              :rules="rules"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="registerPassword"
              type="password"
              label="Password"
              :rules="rules"
              dense
              outlined
            ></v-text-field>
            <v-card-actions>
              <v-spacer />
              <v-btn small text color="red" @click="mode = true">Cancel</v-btn>
              <v-btn
                @click="register"
                class="white--text"
                :disabled="!validRegister"
                color="green"
                >Register</v-btn
              >
              <v-progress-circular
                v-if="loadingRegister"
                indeterminate
                color="green"
              />
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import eventImg from "../assets/events.jpg";
export default {
  data() {
    return {
      windowHeight: window.innerHeight,
      username: "",
      password: "",
      mode: true,
      registerName: "",
      registerSurname: "",
      registerUsername: "",
      registerPassword: "",
      registerEmail: "",
      registerPhone: "",
      validRegister: false,
      alertFail: false,
      eventImg: eventImg,
      loadingRegister: false,
      loadingLogin: false,
      alertMsg: "",
    };
  },
  mounted() {},
  computed: {
    rules() {
      return [(v) => !!v || "Field cannot be empty!"];
    },
    emailRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ];
    },
  },
  methods: {
    login() {
      this.loadingLogin = true;
      this.alertFail = false;
      const body = {
        username_Email: this.username,
        password: this.password,
      };
      this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      this.axios
        .post(process.env.VUE_APP_API_URL+"/auth/signin", body)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.loadingLogin = false;
            localStorage.session = response.data.data.sessionGuid;
            localStorage.firstName = response.data.data.user.firstName;
            localStorage.lastName = response.data.data.user.lastName;
            this.$router.push({ path: "/events" });
          } else if (response.data.statusCode === 401) {
            this.alertFail = true;
            this.alertMsg = "Server Error";
            this.loadingLogin = false;
          } else {
            this.alertFail = true;
            this.alertMsg = "Not authenticated!";
            this.loadingLogin = false;
          }
        });
    },
    register() {
      this.loadingRegister = true;
      const body = {
        firstName: this.registerName,
        lastName: this.registerSurname,
        email: this.registerEmail,
        username: this.registerUsername,
        password: this.registerPassword,
        phone: this.registerPhone,
      };
      this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      this.axios
        .post(process.env.VUE_APP_API_URL+"/user", body)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.loadingRegister = false;
            this.mode = true;
          }
        });
    },
  },
};
</script>