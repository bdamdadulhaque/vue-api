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
        path:'books/:book_name/:book_id',
        // path: "/account/:id/todo/:todoId",
        name:'books',
        component:() => import('../views/layout/Books.vue')
      },
      {
        // path:'chapters/:chapter_id',
        // path:'books/:book_name/chapter/:chapter_id',
        path:'books/:book_name/chapter/:chapter_name',
        name:'chapters',
        component:() => import('../views/layout/Chapters.vue')
      },
      {
        path:'search-home',
        name:'search-home',
        component:() => import('../views/layout/Search-home.vue')
      },
      {
        path:'search-main',
        name:'search-main',
        component:() => import('../views/layout/Search-main.vue')
      },
      {
        path:'advance-search',
        name:'advance-search',
        component:() => import('../views/layout/Advance-search.vue')
      },
      {
        path:'search-single-home',
        name:'search-single-home',
        component:() => import('../views/layout/Search-single-home.vue')
      },
      {
        path:'search-single-sidebar',
        name:'search-single-sidebar',
        component:() => import('../views/layout/Search-single-sidebar.vue')
      },
      {
        // path:'single-hadith/:hadith_id',
        // path:'hadith/:hadith_id',
        path:'books/:book_name/hadith/:hadith_no',
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
        beforeEnter: guardAdmin
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
        path:'hadith-import',
        name:'hadith-import',
        component:() => import('../views/admin/hadith/Hadith-import.vue'),
        //beforeEnter: guardAdminWandE
      },

      {
        path:'hadith-list',
        name:'hadith-list',
        component:() => import('../views/admin/hadith/Hadith-list.vue')
      },
      {
        path:'hadith-list-one',
        name:'hadith-list-one',
        component:() => import('../views/admin/hadith/Hadith-list-one.vue')
      },
      {
        path:'hadith-list-two',
        name:'hadith-list-two',
        component:() => import('../views/admin/hadith/Hadith-list-two.vue')
      },
      {
        path:'hadith-list-three',
        name:'hadith-list-three',
        component:() => import('../views/admin/hadith/Hadith-list-three.vue')
      },
      {
        path:'hadith-list-four',
        name:'hadith-list-four',
        component:() => import('../views/admin/hadith/Hadith-list-four.vue')
      },
      {
        path:'hadith-list-five',
        name:'hadith-list-five',
        component:() => import('../views/admin/hadith/Hadith-list-five.vue')
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
      // daily hadith
      {
        path:'daily-hadith-add',
        name:'daily-hadith-add',
        component:() => import('../views/admin/hadith/Daily-hadith-add.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'daily-hadith-list',
        name:'daily-hadith-list',
        component:() => import('../views/admin/hadith/Daily-hadith-list.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'daily-hadit-edit/:daily_hadith_id',
        name:'daily-hadith-edit',
        component:() => import('../views/admin/hadith/Daily-hadith-edit.vue'),
        beforeEnter: guardAdmin
      },
      
      // admin user
      {
        path:'admin-list',
        name:'admin-list',
        component:() => import('../views/admin/admin-auth/Admin-list.vue'),
        beforeEnter: guardAdmin
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
        beforeEnter: guardAdmin
      },
      {
        path:'report-list',
        name:'report-list',
        component:() => import('../views/admin/report/Report-list.vue'),
        beforeEnter: guardAdmin
      },
      {
        path:'report-edit/:report_id',
        name:'report-edit',
        component:() => import('../views/admin/report/Report-edit.vue'),
        beforeEnter: guardAdmin
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
