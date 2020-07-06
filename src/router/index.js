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
      // book
      {
        path:'book-add',
        name:'book-add',
        component:() => import('../views/admin/book/Book-add.vue')
      },
      {
        path:'book-list',
        name:'book-list',
        component:() => import('../views/admin/book/Book-list.vue')
      },
      {
        path:'book-edit/:book_id',
        name:'book-edit',
        component:() => import('../views/admin/book/Book-edit.vue')
      },
      // chapter
      {
        path:'chapter-add',
        name:'chapter-add',
        component:() => import('../views/admin/chapter/Chapter-add.vue')
      },
      {
        path:'chapter-list',
        name:'chapter-list',
        component:() => import('../views/admin/chapter/Chapter-list.vue')
      },
      {
        path:'chapter-edit/:chapter_id',
        name:'chapter-edit',
        component:() => import('../views/admin/chapter/Chapter-edit.vue')
      },
      // hadith
      {
        path:'hadith-add',
        name:'hadith-add',
        component:() => import('../views/admin/hadith/Hadith-add.vue')
      },
      {
        path:'hadith-list',
        name:'hadith-list',
        component:() => import('../views/admin/hadith/Hadith-list.vue')
      },
      {
        path:'hadith-edit/:hadith_id',
        name:'hadith-edit',
        component:() => import('../views/admin/hadith/Hadith-edit.vue')
      },
      {
        path:'hadith-view/:hadith_id',
        name:'hadith-view',
        component:() => import('../views/admin/hadith/Hadith-view.vue')
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
      {
        path:'admin-password-reset/:admin_id',
        name:'admin-password-reset',
        component:() => import('../views/admin/admin-auth/Admin-password-reset.vue')
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
