<template>
  <div>
    <Header/>

    <router-view/>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Home",
  data() {
    return {
      user: {},
    }
  },
  components: {
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
