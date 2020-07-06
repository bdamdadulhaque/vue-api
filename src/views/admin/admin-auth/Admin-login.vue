<template>
<div>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <router-link :to="{name:'admin-login'}">
          <b>Hadith</b> Site
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
            <div v-if="allFieldRequired" class="row">
              <div class="col-12 text-center text-danger">
                <p>All fields are required!</p>
              </div>
            </div>
            <div v-if="invalidCredentials" class="row">
              <div class="col-12 text-center text-danger">
                <p>Username or Password invalid!</p>
              </div>
            </div>
            <div v-if="inActiveUser" class="row">
              <div class="col-12 text-center text-danger">
                <p>Your account status is inactive!</p>
              </div>
            </div>
            <div class="row">
              <!-- /.col -->
              <div class="col-4 m-auto">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
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
        allFieldRequired:false,
        invalidCredentials:false,
        inActiveUser:false
      }
    },
    methods:{
      userLogin(){
        if(this.user.email != '' && this.user.password != ''){
                  axios.post('/login',{
          email: this.user.email,
          password: this.user.password
          })
          .then(response => {
            if(response.data.user.user_status == 1){
              localStorage.setItem('AToken', response.data.accessToken);
              localStorage.setItem('loggedInUserId', response.data.user.id);
              localStorage.setItem('loggedInUserName', response.data.user.name);
              localStorage.setItem('loggedInUserPhoto', response.data.user.user_photo);
              //this.$router.push({name:'admin'});
              this.$router.push({name:'dashboard'});
            }
            else{
              this.inActiveUser = true
              this.invalidCredentials = false
              this.allFieldRequired = false
            }
          })
          .catch(error => {
            this.invalidCredentials = true
            this.inActiveUser = false
            this.allFieldRequired = false
          });
        }
        else{
          this.allFieldRequired = true
          this.inActiveUser = false
          this.invalidCredentials = false
        }

        }
    }
};
</script>