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
                      v-model="getBlogDetail.title"
                  >
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label">Category</label>
                </div>
                <div class="col-md-7 mb-3">
                  <select class="form-select"
                          id="category"
                          aria-label="Floating label select example"
                          v-model="getBlogDetail.category">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-md-5 mb-3">
                  <label class="col-form-label" for="keywords">Keywords</label>
                </div>
                <div class="col-md-7 mb-3">
                  <div class="tag-container">
                  <span class="tag" v-for="(keyword, index) in getBlogDetail.keywords.split(',')">
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
                    v-model="getBlogDetail.body">
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
                <div class="col-md-3 mb-3" v-for="item in getBlogDetail.images">
                  <img :src="apiUrl + item.image" class="card-img-top" alt=""
                       v-if="getBlogDetail.images">
                  <img :src="apiUrl + defaultprofilephoto" class="card-img-top" alt="" v-else>
                  <a href="javascript:void(0)" @click="deleteImage(item.id)"><i class="bi bi-x"></i></a>
                </div>
              </div>
            </div>
            <div v-if="!show">
              <div class="col-md-3 mb-3" v-for="item in getBlogDetail.images" v-if="getBlogDetail.images[0]">
                <div class="card">
                  <img :src="apiUrl + item.image" class="card-img-top" alt="">
                </div>
                <a href="javascript:void(0)" @click="deleteImage(item.id)" v-if="auth"><i class="bi bi-x"></i></a>
              </div>
              <div class="col-md-3 mb-3" v-else>
                <div class="card">
                  <img :src="apiUrl + defaultprofilephoto" class="card-img-top" alt="">
                </div>
              </div>
              <h5 class="card-title">{{ getBlogDetail.title }}</h5>
              <p class="card-text">{{ getBlogDetail.body }}</p>
              <span>{{ getBlogDetail.category }}</span>
              <br><br>
              <span class="keyword" v-for="keyword in getBlogDetail.keywords.split(',')">{{ keyword }}</span>
            </div>
          </div>
        </div>
        <div class="row" v-if="!show">
          <div class="col-md-6 mt-5">
            <div class="row">
              <div class="col-md-12" v-for="item in getBlogDetail.comments">
                <div v-if="getAuthUser.id === item.users.id">
                  <button class="btn-xs btn-danger float-end" @click="deleteComment(item.id)"><i class="bi bi-x"></i>
                  </button>
                  <button class="btn-xs btn-success float-end" @click="updateComment = !updateComment">
                    <i class="bi" :class="updateComments"></i>
                  </button>
                </div>
                <figure class="text-center">
                  <blockquote class="blockquote">
                    <p>{{ item.comment }}</p>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    <cite title="Source Title">{{ item.users.name }}</cite>
                  </figcaption>
                </figure>
                <div class="form-floating float-end" v-if="updateComment">
                <textarea class="form-control commentInput"
                          id="floatingTextarea1"
                          v-model="commentUpdate"
                          :class="{'is-invalid' : v$.commentUpdate.$error}"
                          @blur="v$.commentUpdate.$touch()"></textarea>
                  <small>
                    <div class="input-errors" v-for="(error, index) of v$.commentUpdate.$errors" :key="index">
                      <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                    </div>
                  </small>
                  <label for="floatingTextarea1">Comments</label>
                  <button class="btn btn-primary mt-2 float-end" @click="upComment(item.id,item.users.user_id)">Update</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 mt-5">
            <div class="form-floating float-end">
            <textarea class="form-control commentInput"
                      id="floatingTextarea"
                      v-model="comment"
                      :class="{'is-invalid' : v$.comment.$error}"
                      @blur="v$.comment.$touch()"></textarea>
              <small>
                <div class="input-errors" v-for="(error, index) of v$.comment.$errors" :key="index">
                  <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                </div>
              </small>
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
import {maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "BlogDetail",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/images/",
      defaultprofilephoto: "defaultprofilephoto.jpg",
      id: this.$route.params.id,
      show: false,
      updateComment: false,
      blogImage: "",
      authUser: false,
      authUserComment: false,
      comment: "",
      commentUpdate: "",
      keywordError: false,
    }
  },
  validations() {
    return {
      comment: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      commentUpdate: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      }
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
      data.append('blogId', this.id);
      data.append('title', this.getBlogDetail.title);
      data.append('body', this.getBlogDetail.body);
      data.append('category', this.getBlogDetail.category);

      for (let i = 0; i < this.blogImage.length; i++) {
        let image = this.blogImage [i];
        data.append('images[' + i + ']', image)
      }

      console.log(data)
      this.$store.dispatch('updateBlog', data);
      this.show = false
      this.$store.dispatch('getBlogDetails', this.id);
    },
    uploadImages() {
      this.blogImage = this.$refs.files.files;
    },
    deleteImage(data) {
      this.$store.dispatch('deleteImage', data);
      this.$store.dispatch('getBlogDetails', this.id);
      setTimeout(() => {
        this.$swal('the picture was deleted');
      }, 500)
    },
    setComment() {
      let data = new FormData();
      data.append('user_id', this.getAuthUser.id);
      data.append('blog_id', this.id);
      data.append('comment', this.comment);
      this.$store.dispatch('setComment', data);
      this.comment = ""
      this.$store.dispatch('getBlogDetails', this.id);
      console.log(data)
    },
    upComment(id,user_id) {
      let data = new FormData();
      data.append('id', id);
      data.append('comment', this.commentUpdate);
      data.append('auth_id', this.getAuthUser.id);
      data.append('comment_user_id', user_id);
      console.log(data)
      this.$store.dispatch('upComment', data);
      this.updateComment = false
      this.$store.dispatch('getBlogDetails', this.id);
      setTimeout(() => {
        this.$swal('comment updated');
      }, 500)
    },
    deleteComment(id) {
      this.$store.dispatch('deleteComment', id);
      this.$store.dispatch('getBlogDetails', this.id);
      setTimeout(() => {
        this.$swal('comment deleted');
      }, 500)
    },

    //keywords
    addKeywords(event) {
      let text = event.target
      let matched = false
      if (text.value.length > 0) {
        this.getBlogDetail.keywords.split(',').forEach(keyword => {
          if (keyword.toLowerCase() === text.value.toLowerCase()) {
            matched = true
          }
        })
        if (!matched) {
          this.getBlogDetail.keywords.split(',').push(text.value)
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
        this.getBlogDetail.keywords.split(',').splice(this.getBlogDetail.keywords.split(',').length - 1, 1)
      }
    },
    removeOneKeyword(index) {
      this.getBlogDetail.keywords.splice(index, 1)
    }
    //keywords

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
      let blogID = this.getBlogDetail.user_id
      if (autUserID == blogID) {
        return this.authUser = true
      } else {
        return this.authUser = false
      }
    },
    updateComments() {
      return this.updateComment ? "bi-arrow-bar-up" : "bi-arrow-clockwise"
    }
  },
  created() {
    this.$store.dispatch('getBlogDetails', this.id);
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

.keyword {
  background-color: lightslategrey;
  color: white;
  padding: 7px;
  border-radius: 10px;
  margin-right: 5px;
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
