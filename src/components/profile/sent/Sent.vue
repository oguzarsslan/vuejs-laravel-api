<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p v-if="getFriendSent == ''">You have no requests sent</p>
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
          <tr v-for="item in getFriendSent">
            <th scope="row">{{ item.item.id }}</th>
            <td>{{ item.item.id }}</td>
            <td>{{ item.item.name }}</td>
            <td>{{ item.item.email }}</td>
            <td>{{ new Date(item.created_at).toLocaleString()}}</td>
            <td>
              <button class="btn-xs btn-danger" @click="removeFriend(item.item.id)">Cancel</button>
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
  name: "Sent",
  methods: {
    ...mapActions([
      "getFriendsSent",
    ]),
    removeFriend(itemid) {
      this.$store.dispatch('removeFriend', itemid).then(response => {
        this.getFriendsSent();
        setTimeout(() => {
          this.$swal('it is cancelled');
        }, 500)
      })
    }
  },
  computed: {
    ...mapGetters([
      "getFriendSent"
    ]),
  },
  created() {
    this.getFriendsSent();
  }
}
</script>

<style scoped>

</style>
