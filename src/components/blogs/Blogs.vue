<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row mt-5">
          <div class="offset-3 col-md-6">
            <div class="row">
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
                <label class="col-form-label" for="images">Image(s)</label>
              </div>
              <div class="col-md-7 mb-3">
                <input class="form-control" type="file" ref="file" @change="uploadImages()">
              </div>
              <div class="offset-md-9 col-md-3 mb-3">
                <button class="btn btn-success text-right" @click="setBlog()">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    setBlog() {
      this.uploadImages();
      console.log(this.blog)
      this.$store.dispatch('setBlog', this.blog);
    },
    uploadImages() {
      const file = this.$refs.file.files[0].name;
      this.blog.images = file;
    },
  }
}
</script>

<style scoped>
.btn {
  float: right;
}
</style>
