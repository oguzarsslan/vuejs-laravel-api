<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-8">
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
              <tr v-for="(item, index) in getData.data">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <button class="btn-xs btn-danger" @click="deleteUser(item.id)">delete</button>
                </td>
                <td>
                  <button class="btn-xs btn-outline-danger" disabled v-if="item.status === 'blocked'"> blocked</button>
                  <button class="btn-xs btn-danger" @click="blocked(item.id)" v-else>block</button>
                </td>
                <td v-if="item.status === 'accepted'">
                  <button class="btn-xs btn-success"
                          :class="{'btn-danger' : cancel}"
                          @mouseover="mouseOver(item.id)"
                          @mouseleave="mouseOver(item.id)"
                          @click="removeFriend(item.id)"
                  >
                    {{ cancel ? 'Remove' : 'Friend' }}
                  </button>
                </td>
                <td v-else-if="item.status === 'pending' && item.sender_id === item.id">
                  <button class="btn-xs btn-success" @click="addFriends(item.id)"> Accept</button>
                  <button class="btn-xs btn-danger" @click="removeFriend(item.id)"> Cancel</button>
                </td>
                <td v-else-if="item.status === 'pending'">
                  <button class="btn-xs btn-info"
                          :id="item.id"
                          :class="{'btn-danger' : cancel}"
                          @mouseover="mouseOver(item.id)"
                          @mouseleave="mouseOver(item.id)"
                          @click="removeFriend(item.id)"
                  >
                    {{ cancel ? 'Cancel' : 'Pending' }}
                  </button>
                </td>
                <td v-else-if="item.status === 'blocked' && item.sender_id === item.id">
                  <button class="btn-xs"
                          :class="{'btn-danger' : cancel, 'btn-warning' : !cancel}"
                          @mouseover="mouseOver()"
                          @mouseleave="mouseOver()"
                          @click="unblocked(item.id)"
                  >
                    {{ cancel ? 'Unblocked' : 'Blocked' }}
                  </button>
                </td>
                <td v-else>
                  <button class="btn-xs btn-success"
                          @click="sendRequest(item.id)">Add Friends
                  </button>
                </td>
                <td>{{ item.status }}</td>
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
import {mapActions, mapGetters} from "vuex";
import Profile from "../profile/Profile";

export default {
  name: "Users",
  data() {
    return {
      cancel: false
    }
  },
  components: {Profile},
  methods: {
    ...mapActions([
      "getDataFromServer",
      "sendRequest"
    ]),
    deleteUser(itemid) {
      this.$store.dispatch('deleteUser', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    removeFriend(itemid) {
      this.$store.dispatch('removeFriend', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    addFriends(itemid) {
      this.$store.dispatch('addFriends', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    blocked(itemid) {
      this.$store.dispatch('blocked', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    unblocked(itemid) {
      this.$store.dispatch('unblocked', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    sendRequest(itemid) {
      this.$store.dispatch('sendRequest', itemid).then(response => {
        this.getDataFromServer();
      })
    },
    mouseOver(itemid) {
      this.cancel = !this.cancel;
    }
  },
  computed: {
    ...mapGetters([
      "getData",
      "getAuthUser",
    ]),
    ...mapActions([
      "getUser",
    ])
  },
  created() {
    this.getDataFromServer();
    this.getUser;
  }
}
</script>

<style scoped>

</style>
