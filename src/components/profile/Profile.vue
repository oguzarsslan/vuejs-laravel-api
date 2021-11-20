<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-5">
            <div class="offset-md-4 col-md-4">
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
                  <input class="form-control" type="text" id="name" :value="getAuthUser.name">
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="email">Email</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input class="form-control" type="text" id="email" :value="getAuthUser.email">
                </div>
                <!--                <div class="col-md-5 mb-3">-->
                <!--                  <label class="col-form-label" for="password">Password</label>-->
                <!--                </div>-->
                <!--                <div class="col-md-7">-->
                <!--                  <input class="form-control" type="text" id="password" :value="getAuthUser.password">-->
                <!--                </div>-->
                <div class="offset-md-9 col-md-3 mb-3">
                  <button class="btn btn-success text-right">Update</button>
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
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getUser')
  },
  computed: {
    ...mapGetters([
      "getAuthUser"
    ])
  },
}
</script>

<style scoped>
.form-control {
  /*border-style: none;*/
}

.btn {
  float: right;
}
</style>
