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
  <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color:blue">
    <div class="container">
    <router-link :to="{name:'home'}" class="navbar-brand img-responsive"><img :src="gettedLogo()" height="60px" alt="" srcset=""></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{name:'home'}" class="nav-link">Home</router-link>
        </li>
        <li v-for="(menu, index) in menus" :key="index" class="nav-item">
          <a v-if="menu.menu_type == 1" class="nav-link" :href="menu.menu_link" target="_blank">{{menu.menu_name}}</a>
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
      <!-- <a href="#">Link1</a>|
      <a href="#">Link2</a>| 
      <a href="#">Link3</a>|
      <a href="#">Link4</a> -->
        <a v-for="(menu, index) in menus" :key="index" :href="menu.menu_link" target="_blank"><span v-if="menu.menu_type == 2">{{menu.menu_name}}</span></a>
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
      search_keyword:'',
      site_logo:'',
      menus:[]
    }
  },
  methods: {
    searchHadith(){
      if(this.$route.name == 'search-main'){
        this.$router.push({ name: 'search-home', params: { search_keyword: this.search_keyword } })
      }
      else{
        this.$router.push({ name: 'search-main', params: { search_keyword: this.search_keyword } })
      }
    },
    getLogo(){
      axios.get('/getlogo/1')
        .then(response => {
            this.site_logo = response.data.fetched_site_logo.site_logo;
            console.log(response.data.fetched_site_logo.site_logo)
        })
    },
    gettedLogo(){
      return uploadPath+"defaultImage/"+this.site_logo;
    },
    menuList() {
      axios
        .get("/getmenu")
        .then(response => {
          this.menus = response.data.fetched_menu;
        })
    },
  },
  mounted(){
    this.getLogo();
    this.menuList();
  }
}
</script>
