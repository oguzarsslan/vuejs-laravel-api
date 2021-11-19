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
              <router-link to="/about" tag="a">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blogs" tag="a">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/users" tag="a">Users</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" tag="a">Auth</router-link>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
            <li class="nav-item">
              <router-link to="/profile" tag="a">Profile</router-link>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser")
      // this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.nav-item a {
  text-decoration: none;
  margin-right: 7px;
}
</style>
<!--<b-navbar toggleable="lg" type="dark" variant="dark">-->
<!--<router-link-->
<!--  to="/"-->
<!--  tag="a">Vue JS-->
<!--</router-link>-->
<!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->
<!--<b-collapse id="nav-collapse" is-nav>-->
<!--  <b-navbar-nav>-->
<!--    <router-link-->
<!--      to="/"-->
<!--      tag="a"-->
<!--      active>Home-->
<!--    </router-link>-->
<!--    <router-link-->
<!--      to="/"-->
<!--      tag="a">Users-->
<!--    </router-link>-->
<!--    <router-link-->
<!--      to="/login"-->
<!--      tag="a"-->
<!--      :class="loginClass">Login-->
<!--    </router-link>-->
<!--    <router-link-->
<!--      to="/register"-->
<!--      tag="a"-->
<!--    >Register-->
<!--    </router-link>-->
<!--    <router-link-->
<!--      to="/logout"-->
<!--      tag="a"-->
<!--    >Logout-->
<!--    </router-link>-->
<!--  </b-navbar-nav>-->
<!--</b-collapse>-->
<!--</b-navbar>-->


<!--<li class="nav-item dropdown">-->
<!--<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"-->
<!--   aria-expanded="false">-->
<!--  Dropdown-->
<!--</a>-->
<!--<ul class="dropdown-menu" aria-labelledby="navbarDropdown">-->
<!--  <li><a class="dropdown-item" href="#">Action</a></li>-->
<!--  <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--  <li>-->
<!--    <hr class="dropdown-divider">-->
<!--  </li>-->
<!--  <li><a class="dropdown-item" href="#">Something else here</a></li>-->
<!--</ul>-->
<!--</li>-->
