<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-6">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in getData.data">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <button class="btn-xs btn-danger" @click="deleteUser(item.id)">delete</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
  name: "Users",
  methods: {
    ...mapActions([
      "getDataFromServer",
    ]),
    deleteUser(itemid) {
      this.$store.dispatch('deleteUser', itemid).then(response => {
        this.getDataFromServer();
      })
    }
  },
  computed: {
    ...mapGetters([
      "getData"
    ])
  },
  created() {
    this.getDataFromServer();
  }
}
</script>

<style scoped>

</style>
