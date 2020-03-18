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
          <router-link :to="{name:'category-list'}" class="nav-link">
            <i class="nav-icon fas fa-th"></i>
            <p>Categories</p>
          </router-link>
        </li>
    
      </ul>
    </nav>
  </div>
</template>