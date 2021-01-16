import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)


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
        path:'account-add',
        name:'account-add',
        component:() => import('../views/layout/Account-add.vue')
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
