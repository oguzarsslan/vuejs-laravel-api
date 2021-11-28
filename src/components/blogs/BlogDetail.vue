<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-10">
            <div class="row justify-content-md">
              <div class="col-md-3 mb-3" v-for="item in getBlogDetail.data.images">
                <div class="card" style="width: 18rem;">
                  <img :src="apiUrl + item.image" class="card-img-top" alt="">
                </div>
              </div>
            </div>
            <h5 class="card-title">{{ getBlogDetail.data.title }}</h5>
            <p class="card-text">{{ getBlogDetail.data.body }}</p>
            <span>{{ getBlogDetail.data.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BlogDetail",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/images/",
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters([
      "getBlogDetail"
    ]),
    ...mapActions([
      "getBlogDetails",
    ]),
  },
  created() {
    // this.getBlogDetails;
    this.$store.dispatch('getBlogDetails', this.id)
  }
}
</script>

<style scoped>

</style>
