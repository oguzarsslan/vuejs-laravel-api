<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-5 justify-content-md-center">
            <div class="col-md-8 mb-5">
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
                  <label class="col-form-label" for="email">Password</label>
                </div>
                <div class="col-md-7 mb-3">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="********" aria-label="Recipient's username"
                           aria-describedby="button-addon2" disabled>
                    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                      Update Password
                    </button>
                  </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="col-md-7 mb-3">
                          <input
                              class="form-control"
                              type="password"
                              placeholder="Password"
                              :class="{'is-invalid' : v$.password.$error}"
                              @blur="v$.password.$touch()"
                              v-model="password">
                        </div>
                        <small>
                          <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
                            <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                          </div>
                        </small>
                        <div class="col-md-7 mb-3">
                          <input
                              class="form-control"
                              type="password"
                              placeholder="RePassword"
                              :class="{'is-invalid' : v$.repassword.$error}"
                              @blur="v$.repassword.$touch()"
                              v-model="repassword">
                        </div>
                        <small>
                          <div class="input-errors" v-for="(error, index) of v$.repassword.$errors" :key="index">
                            <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                          </div>
                        </small>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="updatePassword()" data-bs-dismiss="modal">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal -->
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="email">Avatar</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input class="form-control" id="files" type="file" ref="files">
                </div>
                <div class="offset-md-5 col-md-4 mb-3">
                  <img :src="apiUrl + getAuthUser.images[0].image" class="card-img-top" alt=""
                       v-if="getAuthUser.images[0]">
                  <img :src="apiUrl + defaultprofilephoto" class="card-img-top" alt="" v-else>
                  <a href="javascript:void(0)" @click="deleteProfilePhoto()" v-if="getAuthUser.images[0]"><i
                      class="bi bi-x"></i></a>
                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-success text-right" @click="updateUser()">Update</button>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item" v-for="item in getAuthUser.blogs">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      {{ item.title }}
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                       data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                      {{ item.body }} ->
                      <router-link :to="{ path: '/blog/' + item.id }" tag="a">Blog URL
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <ul v-for="item in getAuthUser.comments">
                <li> {{ item.comment }} ->
                  <router-link :to="{ path: '/blog/' + item.blog_id }" tag="a">Blog URL
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import useVuelidate from "@vuelidate/core";
import {maxLength, minLength, required, sameAs} from "@vuelidate/validators";

export default {
  name: "Profile",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/images/",
      defaultprofilephoto: "defaultprofilephoto.jpg",
      password: "",
      repassword: "",
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(10),
      },
      repassword: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(10),
        sameAs: sameAs(this.password)
      }
    }
  },
  methods: {
    ...mapActions([
      "getUser"
    ]),
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
      this.getUser();
    },
    updatePassword() {
      let data = new FormData();
      data.append('password', this.password)
      data.append('repassword', this.repassword)
      this.$store.dispatch('updatePassword', data).then(response => {
        this.getUser()
        this.password = ""
        this.repassword = ""
        console.log(response)
        setTimeout(() => {
          this.$swal(response.data);
        }, 500)
      })
    },
    deleteProfilePhoto() {
      this.$store.dispatch('deleteProfilePhoto').then(response => {
        console.log(response)
        setTimeout(() => {
          this.$swal('profile picture deleted');
        }, 500)
        this.getUser()
      })
    }
  },
  computed: {
    ...mapGetters([
      "getAuthUser"
    ]),
  },
  created() {
    this.getUser();
    console.log(this.$store.state.authUser)
  },
}
</script>

<style scoped>
.btn {
  float: right;
}

.card-img-top {
  width: 50%;
}
</style>
