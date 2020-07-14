<template>
  <div class="home">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Hadith Site">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Hadith Site</title>
    <!-- Font Awesome CSS -->
    <!-- <link rel="stylesheet" href="assets/css/all.css"> -->
    <!-- Bootstrap core CSS -->
    <!-- <link href="assets/css/bootstrap.css" rel="stylesheet"> -->
  
    <!-- Custom styles for this template -->
    <!-- <link href="style.css" rel="stylesheet"> -->
  </head>
  <body class="d-flex flex-column">
  <header class="mb-5">
  <!-- Fixed navbar -->
  
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container">
    <router-link :to="{name:'home'}" class="navbar-brand img-responsive"><img src="../../layout-assets/logo.png" height="60px" alt="" srcset=""></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{name:'home'}" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link3</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link4</a>
        </li>
      </ul>
      <form v-if="this.$route.name != 'home'" @submit.prevent="searchHadith()" class="header-search">
        <input v-model="search_keyword" name="search_keyword" type="text" placeholder="Search" aria-label="Search">
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
    </div>
  </div>
  </nav>
  
</header>

<!-- Begin page content -->
<main role="main" class="flex-shrink-0 mb-50">

  <router-view></router-view>
  
</main><!-- End page content -->
<footer class="footer py-2 text-center mt-5">
  <div class="container">
    <!-- <div class="d-flex justify-content-between">
      <a href="#">Tour</a>
      <a href="#">Product</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Features</a>
      <a class="py-2 d-none d-md-inline-block" href="#">Enterprise</a>
    </div> -->
      <a href="#">Link1</a>|
      <a href="#">Link2</a>| 
      <a href="#">Link3</a>|
      <a href="#">Link4</a>
  </div>
</footer>

<!-- <script src="assets/js/jquery-3.5.1.slim.min.js"></script> -->
<!-- <script src="assets/js/bootstrap.bundle.js"></script> -->
</body>

  </div>
</template>

<script>
import '../../layout-assets/js/jquery-3.5.1.slim.min.js';
import '../../layout-assets/js/bootstrap.bundle.js';

import '../../layout-assets/css/all.css';
import '../../layout-assets/css/bootstrap.css';
import '../../layout-assets/style.css';
export default {
  data(){
    return {
      search_keyword:''
    }
  },
  methods: {
    searchHadith(){
      this.$router.push({ name: 'search', params: { search_keyword: this.search_keyword } })
    },
  }
}
</script>
