<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getFriendRequest">
            <th scope="row">{{ item.item.id }}</th>
            <td>{{ item.item.id }}</td>
            <td>{{ item.item.name }}</td>
            <td>{{ item.item.email }}</td>
            <td>
              <button class="btn-xs btn-success" @click="addFriends(item.item.id)">Accept</button>
              <button class="btn-xs btn-danger" @click="removeFriend(item.item.id)">Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    {{ getFriendRequest }}
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Request",
  methods: {
    ...mapActions([
      "getFriendRequests",
      "addFriends"
    ]),
    addFriends(itemid) {
      this.$store.dispatch('addFriends', {accept: itemid}).then(response => {
        this.getFriendRequests();
      })
    },
    removeFriend(itemid) {
      this.$store.dispatch('removeFriend', itemid).then(response => {
        this.getFriendRequests();
      })
    }
  },
  computed: {
    ...mapGetters([
      "getFriendRequest",
      "addFriend"
    ]),
  },
  created() {
    this.getFriendRequests();
  }
}
</script>

<style scoped>

</style>
