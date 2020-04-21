<template>
<div>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <router-link :to="{name:'admin-login'}">
          <b>Vue</b>API
        </router-link>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          <form @submit.prevent="userLogin()">
            <div class="input-group mb-3">
              <input v-model="user.email" type="email" class="form-control" placeholder="Email" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input v-model="user.password" type="password" class="form-control" placeholder="Password" />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div v-if="invalidCredentials" class="row">
              <div class="col-12 text-center invalidCredentials">
                <p>Username or Password invalid!</p>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember">Remember Me</label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
          <div class="social-auth-links text-center mb-3">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
            </a>
          </div>
          <!-- /.social-auth-links -->
          <p class="mb-1">
            <a href="forgot-password.html">I forgot my password</a>
          </p>
          <p class="mb-0">
            <router-link :to="{name:'admin-register'}" class="text-center">Register</router-link>
          </p>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </body>
</div>
</template>
<script>
//import adminLte from 'admin-lte';
import("../../../../node_modules/admin-lte/dist/js/adminlte.min.js");
import("../../../../node_modules/admin-lte/dist/css/adminlte.min.css");
import("../../../../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css");
import axios from 'axios';
export default {
    data(){
      return{
        user:{
          email:'',
          password:''
        },
        invalidCredentials:false
      }
    },
    methods:{
      userLogin(){
        axios.post('/login',{
          email: this.user.email,
          password: this.user.password
          })
          .then(response => {
            localStorage.setItem('AToken', response.data.accessToken);
            localStorage.setItem('loggedInUserId', response.data.user.id);
            localStorage.setItem('loggedInUserName', response.data.user.name);
            this.$router.push({name:'admin'});
          })
          .catch(error => {
            this.invalidCredentials = true
            console.log("Invalid credentials")
          });
        }
    }
};
</script>
<style scoped>
.invalidCredentials p{
  color:red;
}
</style>