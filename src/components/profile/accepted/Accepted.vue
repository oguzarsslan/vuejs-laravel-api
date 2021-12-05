<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p v-if="getFriend == ''">You have no friends</p>
        <table class="table" v-else>
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getFriend">
            <th scope="row">{{ item.item.id }}</th>
            <td>{{ item.item.id }}</td>
            <td>{{ item.item.name }}</td>
            <td>{{ item.item.email }}</td>
            <td>{{ new Date(item.updated_at).toLocaleString()}}</td>
            <td>
              <button class="btn-xs btn-danger" @click="removeFriend(item.item.id)">Remove</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Accepted",
  methods: {
    ...mapActions([
      "getFriends",
    ]),
    removeFriend(itemid) {
      this.$store.dispatch('removeFriend', itemid).then(response => {
        this.getFriends();
      })
    }
  },
  computed: {
    ...mapGetters([
      "getFriend"
    ]),
  },
  created() {
    this.getFriends();
  }
}
</script>

<style scoped>

</style>
