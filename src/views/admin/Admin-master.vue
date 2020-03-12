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
          <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">Contact</a>
          </li>
        </ul>
        <!-- SEARCH FORM -->
        <form class="form-inline ml-3">
          <div class="input-group input-group-sm">
            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
            <div class="input-group-append">
              <button class="btn btn-navbar" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <!-- Messages Dropdown Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              Welcome, {{currentUser}} 
            </a>
            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <a href="#" class="dropdown-item">My Account</a>
              <div class="dropdown-divider"></div>
                <a href @click.prevent="logout()" class="dropdown-item">Logout</a>
              <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
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
          <span class="brand-text font-weight-light">Vue API Skel</span>
        </router-link>
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src="../../../node_modules/admin-lte/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
            </div>
            <div class="info">
              <a href="#" class="d-block">{{currentUser}}</a>
            </div>
          </div>

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

      <!-- Control Sidebar -->

      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="float-right d-none d-sm-inline">Anything you want</div>
        <!-- Default to the left -->
        <strong>
          Copyright &copy; 2020
          <a href="#">Vue API Skel</a>.
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
        currentUser
      }
    },
    components:{
        sidebar:Sidebar
    },
  methods: {
    logout() {
      localStorage.removeItem("AToken");
      localStorage.removeItem("currentUser");
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