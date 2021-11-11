<template>
  <div>
    <Header></Header>

    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Header from "./Header";

export default {
  name: "Home",
  data() {
    return {
      user: {},
      message: "",
    }
  },
  components: {
    Login,
    Register,
    Header
  },
  computed: {
    logoutClass() {
      return {
        'd-none': !this.$store.getters.isAuth
      }
    },
    loginClass() {
      return {
        'd-none': this.$store.getters.isAuth
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
</style>
