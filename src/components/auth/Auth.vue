<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-5">
            <div class="offset-5 col-md-2">
              <div class="form">
                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" placeholder="abc@example.com" v-model="user.email">
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" placeholder="****" v-model="user.password">
                </div>
                <button type="submit" class="btn btn-primary" @click="setData()">
                  {{ isUser ? 'Sign In' : 'Sign Up' }}
                </button>
              </div>
              <p v-if="isUser">
                Don't have an account? <a href="#" @click.prevent="signUp">Sign up</a>
              </p>
              <p v-if="!isUser">
                Already have an account? <a href="#" @click.prevent="signIn">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      isUser: true,
    }
  },
  methods: {
    signUp() {
      this.isUser = false
      this.user.email = ""
      this.user.password = ""
    },
    signIn() {
      this.isUser = true
      this.user.email = ""
      this.user.password = ""
    },
    setData() {
      if (this.isUser) {
        this.$store.dispatch('loginUser', this.user)
        // this.$router.replace("/")
      } else {
        this.$store.dispatch('setDataToServer', this.user)
        this.isUser = true
        this.user.email = ""
        this.user.password = ""
      }
    }
  }
}
</script>

<style scoped>
.form {
  border-style: solid;
  border-width: 1px;
  padding: 10px;
}

p {
  margin-top: 20px;
}
</style>
