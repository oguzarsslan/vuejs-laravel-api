<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <button class="btn-xs btn-success createBlog mt-3" @click="show = !show">
          {{ show ? 'Hide Form' : 'Create Blog' }}
        </button>
        <div class="row mt-5 justify-content-md-center">
          <div class="col-md-5 mb-3">
            <input class="form-control me-2" type="search" placeholder="Search" v-model="search" v-if="!show">
          </div>
          <div class="col-md-8">
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
                    :class="{'is-invalid' : v$.blog.title.$error}"
                    @blur="v$.blog.title.$touch()"
                >
                <small>
                  <div class="input-errors" v-for="(error, index) of v$.blog.title.$errors" :key="index">
                    <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                  </div>
                </small>
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label">Category</label>
              </div>
              <div class="col-md-7 mb-3">
                <select class="form-select"
                        id="category"
                        aria-label="Floating label select example"
                        v-model="blog.category"
                        :class="{'is-invalid' : v$.blog.category.$error}"
                        @blur="v$.blog.category.$touch()">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <small>
                  <div class="input-errors" v-for="(error, index) of v$.blog.category.$errors" :key="index">
                    <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                  </div>
                </small>
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label" for="keywords">Keywords</label>
              </div>
              <div class="col-md-7 mb-3">
                <div class="tag-container">
                  <span class="tag" v-for="(keyword, index) in blog.keywords">
                    <span class="content">{{ keyword }}</span>
                    <span class="close" @click="removeOneKeyword(index)">x</span>
                  </span>
                  <input
                      class="form-control keywordsInput mt-3"
                      type="text"
                      id="keywords"
                      @keydown.enter="addKeywords"
                      @keydown.backspace="removeKeyword"
                  >
                  <small v-if="keywordError">
                    <div class="error-msg text-danger mb-1">already added</div>
                  </small>
                </div>
              </div>
              <div class="col-md-5 mb-3">
                <label class="col-form-label">Body</label>
              </div>
              <div class="col-md-7 mb-3">
                <textarea
                    class="form-control"
                    id="body" rows="4"
                    v-model="blog.body"
                    :class="{'is-invalid' : v$.blog.body.$error}"
                    @blur="v$.blog.body.$touch()"></textarea>
                <small>
                  <div class="input-errors" v-for="(error, index) of v$.blog.body.$errors" :key="index">
                    <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                  </div>
                </small>
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
              <div class="col-md-3 mb-3" v-for="blog in resultQuery">


                <div class="card" style="width: 18rem;">
                  <img :src="apiUrl + blog.images[0].image" class="card-img-top" alt="" v-if="blog.images[0]">
                  <img :src="apiUrl + defaultprofilephoto" class="card-img-top" alt="" v-else>
                  <div class="card-body">
                    <span class="float-end">Seen : {{ blog.seen }}</span>
                    <h5 class="card-title">{{ blog.title }}</h5>
                    <p class="card-text">{{ blog.body }}</p>
                    <p>{{ blog.category }}</p>
                    <small>{{ blog.users.name }}</small>
                    <div class="favorites">
                      <a href="javascript:(0)" @click="favorited(blog.id)" v-if="blog.favorites[0] == null || blog.favorites[0].favorite === 0"><i class="bi bi-heart"></i></a>
                      <a href="javascript:(0)" @click="unfavorited(blog.id)" v-else><i class="bi bi-heart-fill"></i></a>
                    </div>
                    <router-link
                        class="btn btn-primary text-white"
                        tag="a"
                        :to="{name: 'BlogDetail', params: {id: blog.id} }">
                      Details
                    </router-link>
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
import {maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "Blogs",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      blog: {
        title: "",
        body: "",
        category: "",
        keywords: [],
        images: ""
      },
      show: false,
      apiUrl: "http://127.0.0.1:8000/images/",
      defaultprofilephoto: "defaultprofilephoto.jpg",
      search: null,
      keywordError: false
    }
  },
  validations() {
    return {
      blog: {
        title: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20)
        },
        body: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(255)
        },
        category: {
          required
        }
      }
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
      data.append('keywords', this.blog.keywords)

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
    favorited(blogID) {
      this.$store.dispatch('favorited', blogID);
      this.getBlogs()
    },
    unfavorited(blogID) {
      this.$store.dispatch('unfavorited', blogID);
      this.getBlogs()
    },
    addKeywords(event) {
      let text = event.target
      let matched = false
      if (text.value.length > 0) {
        this.blog.keywords.forEach(keyword => {
          if (keyword.toLowerCase() === text.value.toLowerCase()) {
            matched = true
          }
        })
        if (!matched) {
          this.blog.keywords.push(text.value)
          text.value = ""
        } else {
          this.keywordError = true
          setTimeout(() => {
            this.keywordError = false
          }, 2000)
        }
      }
    },
    removeKeyword(e) {
      if (e.target.value.length <= 0) {
        this.blog.keywords.splice(this.blog.keywords.length - 1, 1)
      }
    },
    removeOneKeyword(index) {
      this.blog.keywords.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters([
      "getBlog"
    ]),
    resultQuery() {
      if (this.search) {
        return this.getBlog.filter(item => {
          return this.search
              .toLowerCase()
              .split(" ")
              .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.getBlog;
      }
    },
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

.tag {
  background-color: #fbbd08;
  padding: 7px;
  color: #000;
  cursor: default;
  margin-right: 5px;
  border-radius: 10px;
}

.tag * {
  font-size: 14px;
}

.tag .close {
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
}

.close {
  margin-left: 5px;
  border-style: inset;
  border-color: red;
  background: red;
  color: white;
  border-radius: 5px;
}
</style>
