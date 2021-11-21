<template>
  <div id="nav">
    <Home/>

  </div>
</template>

<script>
import Home from "./components/Home";

export default {
  name: 'App',
  components: {
    Home
  },
  created() {
    this.$store.dispatch('initAuth')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
