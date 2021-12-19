<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-5 mb-3">
            <input class="form-control me-2" type="search" placeholder="Search" v-model="search">
          </div>
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
              <tr v-for="item in resultQuery">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <button class="btn-xs btn-danger" @click="deleteUser(item.id)">delete</button>
                </td>
                <td>
                  <button class="btn-xs btn-outline-danger" disabled
                          v-if="item.status === 'blocked' && item.recipient_id === item.id">blocked
                  </button>
                  <button class="btn-xs btn-danger" @click="blocked(item.id)" v-else>block</button>
                </td>
                <td v-if="item.status === 'accepted'">
                  <button class="btn-xs btn-success"
                          :class="cancel === item.id ? 'btn-danger' : ''"
                          @mouseover="cancel = item.id"
                          @mouseleave="cancel = false"
                          @click="removeFriend(item.id)"
                  >
                    {{ cancel === item.id ? 'Remove' : 'Friend' }}
                  </button>
                </td>
                <td v-else-if="item.status === 'pending' && item.sender_id === item.id">
                  <button class="btn-xs btn-success" @click="addFriends(item.id)"> Accept</button>
                  <button class="btn-xs btn-danger" @click="removeFriend(item.id)"> Cancel</button>
                </td>
                <td v-else-if="item.status === 'pending'">
                  <button class="btn-xs btn-info"
                          :id="item.id"
                          :class="cancel === item.id ? 'btn-danger' : ''"
                          @mouseover="cancel = item.id"
                          @mouseout="cancel = false"
                          @click="removeFriend(item.id)"
                  >
                    {{ cancel === item.id ? 'Cancel' : 'Pending' }}
                  </button>
                </td>
                <td v-else-if="item.status === 'blocked' && item.recipient_id === item.id">
                  <button class="btn-xs"
                          :class="cancel === item.id ? 'btn-danger' : 'btn-warning'"
                          @mouseover="cancel = item.id"
                          @mouseout="cancel = false"
                          @click="unblocked(item.id)"
                  >
                    {{ cancel === item.id ? 'Unblocked' : 'Blocked' }}
                  </button>
                </td>
                <td v-else-if="item.status === 'blocked'">
                  <button class="btn-xs btn-outline-dark">Bloklandın</button>
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
      cancel: false,
      search: null,
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
        setTimeout(() => {
          this.$swal('user deleted');
        }, 500)
      })
    },
    removeFriend(itemid) {
      this.$store.dispatch('removeFriend', itemid).then(response => {
        this.getDataFromServer();
        setTimeout(() => {
          this.$swal('it is cancelled');
        }, 500)
      })
    },
    addFriends(itemid) {
      this.$store.dispatch('addFriends', itemid).then(response => {
        this.getDataFromServer();
        setTimeout(() => {
          this.$swal('request accepted');
        }, 500)
      })
    },
    blocked(itemid) {
      this.$store.dispatch('blocked', itemid).then(response => {
        this.getDataFromServer();
        setTimeout(() => {
          this.$swal('user is blocked');
        }, 500)
      })
    },
    unblocked(itemid) {
      this.$store.dispatch('unblocked', itemid).then(response => {
        this.getDataFromServer();
        setTimeout(() => {
          this.$swal('user is unblocked');
        }, 500)
      })
    },
    sendRequest(itemid) {
      this.$store.dispatch('sendRequest', itemid).then(response => {
        this.getDataFromServer();
        setTimeout(() => {
          this.$swal('request sent');
        }, 500)
      })
    },
    mouseOver(data) {
      if (data) {
        this.cancel = !this.cancel;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getData",
      "getAuthUser",
    ]),
    ...mapActions([
      "getUser",
    ]),
    resultQuery() {
      if (this.search) {
        return this.getData.filter(item => {
          return this.search
              .toLowerCase()
              .split(" ")
              .every(v => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.getData;
      }
    }
  },
  created() {
    this.getDataFromServer();
    this.getUser;
  }
}
</script>

<style scoped>

</style>
