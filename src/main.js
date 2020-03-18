import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import bootstrapCss from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Jquery from 'jquery'
window.$ = window.jQuery = Jquery;
import dt from '../node_modules/datatables.net/js/jquery.dataTables.min.js'
//window.DataTable = dt;
import dtbjs from '../node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js'
//window.DataTable = dtbjs;
import dtcss from '../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css'
//window.DataTable = dtcss;
//import popper from 'popper.js'
import bootstrapjs from '../node_modules/bootstrap/dist/js/bootstrap.min.js'
window.bootstrapjs = bootstrapjs;
import izitoastCss from '../node_modules/izitoast/dist/css/iziToast.min.css'
import izitoastJs from '../node_modules/izitoast/dist/js/iziToast.min.js'
window.iziToast = izitoastJs;
import axios from 'axios';
window.axios = axios;
let token = localStorage.getItem('AToken');
window.token = token; 
axios.defaults.baseURL = 'http://localhost/laraapiskel/public/api';
//axios.defaults.baseURL = 'http://localhost/laraapiskel/public/';
axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let uploadPath = 'http://localhost/laraapiskel/public/';
window.uploadPath = uploadPath;

let loggedInUserId = localStorage.getItem("loggedInUserId");
window.loggedInUserId = loggedInUserId;
let loggedInUserName = localStorage.getItem("loggedInUserName");
window.loggedInUserName = loggedInUserName;

import { Form, HasError, AlertError } from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
