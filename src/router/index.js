import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";
import "firebase/auth";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new/',
    name: 'Record',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/category/',
    name: 'Category',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/category.vue')
  },
  {
    path: '/product/',
    name: 'Product',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/product.vue')
  },
  {
    path: '/settings/',
    name: 'Settings',
    meta: { layout: 'Main', auth: true },
    component: () => import('../views/settings.vue')
  },
  {
    path: '/register/',
    name: 'Register',
    meta: { layout: 'Login' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login/',
    name: 'Login',
    meta: { layout: 'Login' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/*',
    name: '404',
    meta: { layout: 'Main' },
    component: () => import('../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  const RequireAuth = to.matched.some(record => record.meta.auth)
  firebase.auth().onAuthStateChanged((user) => {
    if(RequireAuth && !user){
      next('/login/')
    }else if(!RequireAuth && user){
      next('/')
    }else{
      next()
    }
  });
})

export default router
