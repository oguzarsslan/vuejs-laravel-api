<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Vue JS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" tag="a">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blogs" tag="a">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/users" tag="a">Users</router-link>
            </li>
            <li class="nav-item" v-if="!isAuth">
              <router-link to="/login" tag="a">Auth</router-link>
            </li>
            <li class="nav-item" v-if="isAuth">
              <router-link to="/friends" tag="a">Friends</router-link>
            </li>
            <li class="nav-item" v-if="isAuth">
              <router-link to="/profile" tag="a">Profile</router-link>
            </li>
            <li class="nav-item" v-if="isAuth">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "../router";
import {mapGetters} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      show: localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser")
          .then(response => {
                console.log("ok")
                router.push("/login")
                this.show = false
              }
          )
      // setTimeout(() => {
      //   location.reload();
      // }, 1000)

    }
  },
  computed: {
    ...mapGetters([
      "isAuth",
    ])
  }
}
</script>

<style scoped>
.nav-item a {
  text-decoration: none;
  margin-right: 7px;
}
</style>
