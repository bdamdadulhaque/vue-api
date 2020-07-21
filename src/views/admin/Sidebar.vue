<template>
  <div>
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
        with font-awesome or any other icon font library-->
        <li class="nav-item">
          <router-link :to="{name:'dashboard'}" class="nav-link active">
            <i class="nav-icon fas fa-home"></i>
            <p>Home</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'book-list'}" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>Books</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'chapter-list'}" class="nav-link">
            <i class="nav-icon fas fa-book-open"></i>
            <p>Chapters</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'hadith-list'}" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>Hadiths</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'hadith-import'}" class="nav-link">
            <i class="nav-icon fas fa-book"></i>
            <p>Hadiths Import</p>
          </router-link>
        </li>
        <li v-if="userRole == 1" class="nav-item">
          <router-link :to="{name:'daily-hadith-list'}" class="nav-link">
            <i class="nav-icon fa fa-clock"></i>
            <p>Daily Hadith</p>
          </router-link>
        </li>
        <li v-if="userRole == 1" class="nav-item">
          <router-link :to="{name:'report-list'}" class="nav-link">
            <i class="nav-icon fas fa-exclamation-circle"></i>
            <p>Report</p>
          </router-link>
        </li>
        <li v-if="userRole == 1" class="nav-item">
          <router-link :to="{name:'admin-list'}" class="nav-link">
            <i class="nav-icon fas fa-user"></i>
            <p>Admin</p>
          </router-link>
        </li>
        <li v-if="userRole == 1" class="nav-item">
          <router-link :to="{name:'setting-list'}" class="nav-link">
            <i class="nav-icon fas fa-tools"></i>
            <p>Settings</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userRole:localStorage.getItem('userRole')
    }
  }
}
</script>