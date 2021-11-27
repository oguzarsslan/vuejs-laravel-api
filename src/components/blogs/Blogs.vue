<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <button class="btn-xs btn-success createBlog mt-3" @click="show = !show">
          {{ show ? 'Hide Form' : 'Create Blog' }}
        </button>
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-6">
            <div class="row mb-5 blogForm" v-if="show">
              <div class="col-md-5 mb-3">
                <label class="col-form-label" for="title">Title</label>
              </div>
              <div class="col-md-7 mb-3">
                <input
                    class="form-control"
                    type="text"
                    id="title"
                    v-model="blog.title"
                >
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label">Category</label>
              </div>
              <div class="col-md-7 mb-3">
                <select class="form-select" id="category" aria-label="Floating label select example"
                        v-model="blog.category">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label">Body</label>
              </div>
              <div class="col-md-7 mb-3">
                <textarea class="form-control" id="body" rows="4" v-model="blog.body"></textarea>
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label" for="files">Image(s)</label>
              </div>
              <div class="col-md-7 mb-3">
                <input class="form-control" id="files" type="file" ref="files" multiple @change="uploadImages()">
              </div>
              <div class="offset-md-9 col-md-3 mb-3">
                <button class="btn btn-success text-right" @click="setBlog()">Save</button>
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <div class="row justify-content-md">
              <div class="col-md-3 mb-3" v-for="(blog) in getBlog.data">
                <div class="card" style="width: 18rem;">
                  <img :src="apiUrl + blog.images[0].image" class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">{{ blog.title }}</h5>
                    <p class="card-text">{{ blog.body }}</p>
                    <span>{{ blog.category }}</span>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
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
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
  name: "Blogs",
  data() {
    return {
      blog: {
        title: "",
        body: "",
        category: "",
        images: ""
      },
      show: false,
      apiUrl: "http://127.0.0.1:8000/images/"
    }
  },
  methods: {
    ...mapActions([
      "getBlogs",
    ]),
    setBlog() {
      this.uploadImages();
      let data = new FormData();
      data.append('title', this.blog.title)
      data.append('body', this.blog.body)
      data.append('category', this.blog.category)

      for (let i = 0; i < this.blog.images.length; i++) {
        let image = this.blog.images [i];
        data.append('images[' + i + ']', image)
      }

      console.log(data)
      this.$store.dispatch('setBlog', data);
      this.blog = ""
      this.show = false
      this.getBlogs();
    },
    uploadImages() {
      this.blog.images = this.$refs.files.files;
    },
  },
  computed: {
    ...mapGetters([
      "getBlog"
    ])
  },
  created() {
    this.getBlogs();
  }
}
</script>

<style scoped>
.btn {
  float: right;
}

.createBlog {
  width: 125px;
  float: right;
}

.blogForm {
  border-style: dotted;
  border-width: 1px;
  padding: 25px;
}

.card img {
  height: 175px;
  object-fit: scale-down;
}
</style>
