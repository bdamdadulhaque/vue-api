<template>
  <div>
    <div class="wrapper">
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#">
              <i class="fas fa-bars"></i>
            </a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <router-link :to="{name:'dashboard'}" class="nav-link">Home</router-link>
          </li>
        </ul>
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <!-- Messages Dropdown Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <img :src="userPhotoFind()" width="20" height="20" class="brand-image img-circle elevation-3"> {{loggedInUserName}}
            </a>
            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <a href @click.prevent="logout()" class="dropdown-item">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
      <!-- /.navbar -->
      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link :to="{name:'dashboard'}" class="brand-link">
          <img src="../../../node_modules/admin-lte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"/>
          <span class="brand-text font-weight-light">Hadith Site</span>
        </router-link>
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <!-- Sidebar Menu -->
            <sidebar></sidebar>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
      <!-- /.content-wrapper -->
      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="float-right d-none d-sm-inline">Developed By: ---</div>
        <!-- Default to the left -->
        <strong>
          Copyright &copy; 2020
          <a href="#">Hadith Site</a>.
        </strong> All rights reserved.
      </footer>
    </div>
    <!-- ./wrapper -->
  </div>
</template>
<script>
import('../../../node_modules/admin-lte/dist/js/adminlte.min.js');
import('../../../node_modules/admin-lte/dist/css/adminlte.min.css');
import('../../../node_modules/admin-lte/plugins/fontawesome-free/css/all.css');
import Sidebar from './Sidebar';
export default {
  data(){
    return{
      loggedInUserName:localStorage.getItem("loggedInUserName"),
      loggedInUserPhoto:localStorage.getItem("loggedInUserPhoto")
    }
  },
  components:{
    sidebar:Sidebar
  },
  methods: {
    userPhotoFind(){
      return uploadPath+"userPhoto/"+this.loggedInUserPhoto;
    },
    logout() {
      localStorage.removeItem("AToken");
      localStorage.removeItem("loggedInUserId");
      localStorage.removeItem("loggedInUserName");
      localStorage.removeItem("loggedInUserPhoto");
      this.$router.push("/admin-login");
    }
  },
  mounted() {
    var access_token = localStorage.getItem("AToken");
    if (!access_token) {
      this.$router.push("/admin-login");
    }
  }
};
</script>