import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // admin auth
  {
    path:'/admin-login',
    name:'admin-login',
    component:() => import('../views/admin/admin-auth/Admin-login.vue')
  },
  {
    path:'/admin-register',
    name:'admin-register',
    component:() => import('../views/admin/admin-auth/Admin-register.vue')
  },
  // admin master
  {
    path:'/admin',
    name:'admin',
    component:() => import('../views/admin/Admin-master.vue'),
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:() => import('../views/admin/Dashboard.vue')
      },
      // admin profile
      {
        path:'profile',
        name:'profile',
        component:() => import('../views/admin/admin-auth/Admin-profile.vue')
      },
      // category
      {
        path:'category-add',
        name:'category-add',
        component:() => import('../views/admin/category/Category-add.vue')
      },
      {
        path:'category-list',
        name:'category-list',
        component:() => import('../views/admin/category/Category-list.vue')
      },
      {
        path:'category-edit/:category_id',
        name:'category-edit',
        component:() => import('../views/admin/category/Category-edit.vue')
      },
      // product
      {
        path:'product-add',
        name:'product-add',
        component:() => import('../views/admin/product/Product-add.vue')
      },
      {
        path:'product-list',
        name:'product-list',
        component:() => import('../views/admin/product/Product-list.vue')
      },
      {
        path:'product-edit/:product_id',
        name:'product-edit',
        component:() => import('../views/admin/product/Product-edit.vue')
      },
      // admin user
      {
        path:'admin-list',
        name:'admin-list',
        component:() => import('../views/admin/admin-auth/Admin-list.vue')
      },
      {
        path:'admin-add',
        name:'admin-add',
        component:() => import('../views/admin/admin-auth/Admin-register.vue')
      },
      {
        path:'admin-edit/:admin_id',
        name:'admin-edit',
        component:() => import('../views/admin/admin-auth/Admin-edit.vue')
      },
      // settings
      {
        path:'setting-list',
        name:'setting-list',
        component:() => import('../views/admin/Setting-list.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
