import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)


function guardAdmin(to, from, next)
{
 let userRole= localStorage.getItem('userRole');
  if(userRole == 1) 
  {
    next(); // allow to enter route
  } 
  else
  {
    next('/admin-login'); // go to '/login';
  }
}

function guardAdminWandE(to, from, next)
{
 let userRole= localStorage.getItem('userRole');
  if(userRole == 1 || userRole == 2) 
  {
    next(); // allow to enter route
  } 
  else
  {
    next('/admin-login'); // go to '/login';
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component:() => import('../views/layout/Layout-master.vue'),
    redirect:'home',
    children:[
      {
        path:'home',
        name:'home',
        component:() => import('../views/layout/Home.vue')
      },
      {
        path:'books/:book_id',
        name:'books',
        component:() => import('../views/layout/Books.vue')
      },
      {
        path:'chapters/:chapter_id',
        name:'chapters',
        component:() => import('../views/layout/Chapters.vue')
      },
      {
        path:'search',
        name:'search',
        component:() => import('../views/layout/Search.vue')
      },
      {
        path:'search-single',
        name:'search-single',
        component:() => import('../views/layout/Search-single.vue')
      },
      {
        path:'single-hadith/:hadith_id',
        name:'single-hadith',
        component:() => import('../views/layout/Single-hadith.vue')
      }
    ]
  },



  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },






  /// admin panel

  
  // admin auth
  {
    path:'/admin-login',
    name:'admin-login',
    component:() => import('../views/admin/admin-auth/Admin-login.vue')
  },
  // {
  //   path:'/admin-register',
  //   name:'admin-register',
  //   component:() => import('../views/admin/admin-auth/Admin-register.vue')
  // },
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
        component:() => import('../views/admin/book/Book-add.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'book-list',
        name:'book-list',
        component:() => import('../views/admin/book/Book-list.vue')
      },
      {
        path:'book-edit/:book_id',
        name:'book-edit',
        component:() => import('../views/admin/book/Book-edit.vue'),
        beforeEnter: guardAdmin
      },
      // chapter
      {
        path:'chapter-add',
        name:'chapter-add',
        component:() => import('../views/admin/chapter/Chapter-add.vue'),
        beforeEnter: guardAdminWandE
      },
      {
        path:'chapter-list',
        name:'chapter-list',
        component:() => import('../views/admin/chapter/Chapter-list.vue')
      },
      {
        path:'chapter-edit/:chapter_id',
        name:'chapter-edit',
        component:() => import('../views/admin/chapter/Chapter-edit.vue'),
        beforeEnter: guardAdminWandE
      },
      // hadith
      {
        path:'hadith-add',
        name:'hadith-add',
        component:() => import('../views/admin/hadith/Hadith-add.vue'),
        beforeEnter: guardAdminWandE
      },
      {
        path:'hadith-list',
        name:'hadith-list',
        component:() => import('../views/admin/hadith/Hadith-list.vue')
      },
      {
        path:'hadith-edit/:hadith_id',
        name:'hadith-edit',
        component:() => import('../views/admin/hadith/Hadith-edit.vue'),
        beforeEnter: guardAdminWandE
      },
      {
        path:'hadith-view/:hadith_id',
        name:'hadith-view',
        component:() => import('../views/admin/hadith/Hadith-view.vue'),
        beforeEnter: guardAdminWandE
      },
      {
        path:'hotd/:hadith_id',
        name:'hotd',
        component:() => import('../views/admin/hadith/Hotd.vue'),
        beforeEnter: guardAdminWandE
      },
      {
        path:'hotd-list',
        name:'hotd-list',
        component:() => import('../views/admin/hadith/Hotd-list.vue'),
        beforeEnter: guardAdminWandE
      },
      // admin user
      {
        path:'admin-list',
        name:'admin-list',
        component:() => import('../views/admin/admin-auth/Admin-list.vue')
       // beforeEnter: guardAdmin
      },
      {
        path:'admin-add',
        name:'admin-add',
        component:() => import('../views/admin/admin-auth/Admin-register.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'admin-edit/:admin_id',
        name:'admin-edit',
        component:() => import('../views/admin/admin-auth/Admin-edit.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'admin-password-reset/:admin_id',
        name:'admin-password-reset',
        component:() => import('../views/admin/admin-auth/Admin-password-reset.vue'),
        beforeEnter: guardAdmin
      },
      // settings
      {
        path:'setting-list',
        name:'setting-list',
        component:() => import('../views/admin/Setting-list.vue'),
       // beforeEnter: guardAdmin
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
