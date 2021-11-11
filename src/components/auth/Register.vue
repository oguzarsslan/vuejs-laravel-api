<template>
  <div>
    <div v-for="item in getData.data">
      <li>{{ item.name }}</li>
      <button class="btn btn-primary" @click="deleteUser(item.id)">delete</button>
    </div>
    <input type="text" v-model="user.name" placeholder="name">
    <input type="email" v-model="user.email" placeholder="email">
    <input type="password" v-model="user.password" placeholder="password">
    <button class="btn btn-primary" @click="register">register</button>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      user: {},
      message: "",
    }
  },
  name: "Register",
  methods: {
    ...mapActions([
      "getDataFromServer",
    ]),
    register() {
      this.$store.dispatch("setDataToServer", this.user).then(response => {
        this.message = response;
        this.getDataFromServer();
      })
    },
    deleteUser(itemid) {
      this.$store.dispatch('deleteUser', itemid).then(response => {
        this.getDataFromServer();
      })
    }
  },
  computed: {
    ...mapGetters([
      "getData"
    ]),
  },
  created() {
    this.getDataFromServer();
    console.log(this.$jwt.getToken());
  }
}
</script>

<style scoped>
</style>
