<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-md-10">
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-12 blogButton" v-if="auth">
            <button class="btn btn-info" @click="show = !show">
              {{ show ? 'Hide Form' : 'Update' }}
            </button>
            <button class="btn btn-danger m-lg-1" @click="deleteBlog()">Delete</button>
          </div>
          <div class="col-md-10">
            <div class="row justify-content-md">

              <div class="row mb-5 mt-5 blogForm" v-if="show">
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="title">Title</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input
                      class="form-control"
                      type="text"
                      id="title"
                      v-model="getBlogDetail.data.title"
                  >
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label">Category</label>
                </div>
                <div class="col-md-7 mb-3">
                  <select class="form-select"
                          id="category"
                          aria-label="Floating label select example"
                          v-model="getBlogDetail.data.category">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label">Body</label>
                </div>
                <div class="col-md-7 mb-3">
                <textarea
                    class="form-control"
                    id="body" rows="4"
                    v-model="getBlogDetail.data.body">
                </textarea>
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="files">Image(s)</label>
                </div>
                <div class="col-md-7 mb-3">
                  <input class="form-control" id="files" type="file" ref="files" multiple @change="uploadImages()">
                </div>
                <div class="offset-md-9 col-md-3 mb-3 updateButton">
                  <button class="btn btn-success text-right" @click="updateBlog()">Update</button>
                </div>
                <div class="col-md-3 mb-3" v-for="item in getBlogDetail.data.images">
                  <img :src="apiUrl + item.image" class="card-img-top" alt=""
                       v-if="item">
                  <a href="javascript:void(0)" @click="deleteImage(item.id)"><i class="bi bi-x"></i></a>
                </div>
              </div>
            </div>
            <div v-if="!show">
              <div class="col-md-3 mb-3" v-for="item in getBlogDetail.data.images">
                <div class="card">
                  <img :src="apiUrl + item.image" class="card-img-top" alt="">
                </div>
                <a href="javascript:void(0)" @click="deleteImage(item.id)"><i class="bi bi-x"></i></a>
              </div>
              <h5 class="card-title">{{ getBlogDetail.data.title }}</h5>
              <p class="card-text">{{ getBlogDetail.data.body }}</p>
              <span>{{ getBlogDetail.data.category }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-5">
            sa
          </div>
          <div class="col-md-6 mt-5">
            <div class="form-floating float-end">
            <textarea class="form-control commentInput" placeholder="Leave a comment here"
                      id="floatingTextarea"></textarea>
              <label for="floatingTextarea">Comments</label>
              <button class="btn btn-primary mt-2 float-end" @click="setComment()">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import router from "../../router";

export default {
  name: "BlogDetail",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/images/",
      id: this.$route.params.id,
      show: false,
      blogImage: "",
      authUser: false
    }
  },
  methods: {
    deleteBlog() {
      this.$store.dispatch('deleteBlog', this.id).then(response => {
        router.push("/blogs")
      })
    },
    updateBlog() {
      this.uploadImages();
      let data = new FormData();
      data.append('blogId', this.getBlogDetail.data.id)
      data.append('title', this.getBlogDetail.data.title)
      data.append('body', this.getBlogDetail.data.body)
      data.append('category', this.getBlogDetail.data.category)

      for (let i = 0; i < this.blogImage.length; i++) {
        let image = this.blogImage [i];
        data.append('images[' + i + ']', image)
      }

      console.log(data)
      this.$store.dispatch('updateBlog', data);
      this.show = false
      this.$store.dispatch('getBlogDetails', this.id)
    },
    uploadImages() {
      this.blogImage = this.$refs.files.files;
    },
    deleteImage(data) {
      this.$store.dispatch('deleteImage', data)
      this.$store.dispatch('getBlogDetails', this.id)
      setTimeout(() => {
        this.$swal('the picture was deleted');
      }, 500)
    },
    setComment(){
      console.log(1)
    }
  },
  computed: {
    ...mapGetters([
      "getBlogDetail",
      "getAuthUser"
    ]),
    ...mapActions([
      "getBlogDetails",
      "getUser"
    ]),
    auth() {
      let autUserID = this.getAuthUser.id
      let blogID = this.getBlogDetail.data.user_id
      if (autUserID == blogID) {
        return this.authUser = true
      } else {
        return this.authUser = false
      }
    },
  },
  created() {
    this.$store.dispatch('getBlogDetails', this.id)
    this.getUser;
  }
}
</script>

<style scoped>
.blogButton {
  text-align: right;
}

.card {
  width: 18rem;
}

.updateButton {
  text-align: right;
}

.commentInput {
  width: 500px;
  height: 100px !important;
}
</style>
