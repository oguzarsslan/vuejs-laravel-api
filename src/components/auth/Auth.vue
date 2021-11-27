<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="row mt-5 justify-content-md-center">
            <div class="col-md-2">
              <div class="form">
                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email"
                         class="form-control"
                         :class="{'is-invalid' : v$.user.email.$error}"
                         placeholder="abc@example.com"
                         @blur="v$.user.email.$touch()"
                         v-model="user.email">
                </div>
                <small>
                  <div class="input-errors" v-for="(error, index) of v$.user.email.$errors" :key="index">
                    <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                  </div>
                </small>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password"
                         class="form-control"
                         :class="{'is-invalid' : v$.user.password.$error}"
                         placeholder="****"
                         @blur="v$.user.password.$touch()"
                         v-model="user.password">
                </div>
                <small>
                  <div class="input-errors" v-for="(error, index) of v$.user.password.$errors" :key="index">
                    <div class="error-msg text-danger mb-1">{{ error.$message }}</div>
                  </div>
                </small>
                <button type="submit" class="btn btn-primary" @click="setData()"
                        :class="{'disabled' : v$.user.email.$error || v$.user.password.$error} ">
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
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, maxLength} from '@vuelidate/validators'
import router from "../../router";

export default {
  name: "Auth",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      isUser: true,
    }
  },
  validations() {
    return {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(10)
        }
      }
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
        router.push("/")
        this.$store.state.message = ""
      } else {
        this.$store.dispatch('setDataToServer', this.user)
        this.isUser = true
        this.user.email = ""
        this.user.password = ""
        setTimeout(() => {
          this.$swal(this.$store.state.message);
        }, 500)
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
  text-align: center;
}

.btn{
  min-inline-size: -webkit-fill-available;
}
</style>
