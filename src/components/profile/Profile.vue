<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-5 justify-content-md-center">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="created_at">Created At Date</label>
                </div>
                <div class="col-md-7">
                  <input class="form-control" type="text" id="created_at"
                         :placeholder="new Date(getAuthUser.created_at).toLocaleString()" disabled>
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="name">Name</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input
                      class="form-control"
                      type="text"
                      id="name"
                      v-model="getAuthUser.name"
                  >
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="email">Email</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="getAuthUser.email"
                  >
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="email">Avatar</label>
                </div>

                <div class="col-md-7 mb-3">
                  <input class="form-control" id="files" type="file" ref="files" @change="uploadImage()">
                </div>
                <!--                <div class="col-md-5 mb-3">-->
                <!--                  <label class="col-form-label" for="password">Password</label>-->
                <!--                </div>-->
                <!--                <div class="col-md-7">-->
                <!--                  <input class="form-control" type="text" id="password" :value="getAuthUser.password">-->
                <!--                </div>-->
                <div class="offset-md-5 col-md-4 mb-3">
                  <img :src="apiUrl + getAuthUser.images[0].image" class="card-img-top" alt="" v-if="getAuthUser.images[0]">
                  <img :src="apiUrl + getAuthUser.images[0].image" class="card-img-top" alt="" v-if="getAuthUser.images[0]">
                  <img :src="apiUrl + defaultprofilephoto" class="card-img-top" alt="" v-else>
                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-success text-right" @click="updateUser()">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/images/",
      defaultprofilephoto : "defaultprofilephoto.jpg"
    }
  },
  computed: {
    ...mapGetters([
      "getAuthUser"
    ]),
    ...mapActions([
      "getUser",
    ])
  },
  created() {
    this.getUser;
    console.log(this.$store.state.authUser)
  },
  methods: {
    updateUser() {
      let image = this.$refs.files.files[0];
      console.log(image)
      let data = new FormData();
      data.append('id', this.getAuthUser.id)
      data.append('name', this.getAuthUser.name)
      data.append('email', this.getAuthUser.email)
      data.append('image', image)

      console.log(data);

      this.$store.dispatch('updateUser', data)
      this.getUser;
    },
  }
}
</script>

<style scoped>
.btn {
  float: right;
}
</style>
