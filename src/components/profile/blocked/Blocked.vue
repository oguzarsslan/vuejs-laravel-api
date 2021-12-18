<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p v-if="getBlocked == ''">There are no users you have blocked</p>
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
          <tr v-for="item in getBlocked">
            <th scope="row">{{ item.item.id }}</th>
            <td>{{ item.item.id }}</td>
            <td>{{ item.item.name }}</td>
            <td>{{ item.item.email }}</td>
            <td>{{ new Date(item.created_at).toLocaleString()}}</td>
            <td>
              <button class="btn-xs btn-success" @click="unblocked(item.item.id)">Unblocked</button>
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
  name: "Blocked",
  methods: {
    ...mapActions([
      "getBlockeds",
    ]),
    unblocked(itemid) {
      this.$store.dispatch('unblocked', itemid).then(response => {
        this.getBlockeds();
        setTimeout(() => {
          this.$swal('user is unblocked');
        }, 500)
      })
    }
  },
  computed: {
    ...mapGetters([
      "getBlocked"
    ]),
  },
  created() {
    this.getBlockeds();
  }
}
</script>

<style scoped>

</style>
