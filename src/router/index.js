import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'Main' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new/',
    name: 'Record',
    meta: { layout: 'Main' },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/category/',
    name: 'Category',
    meta: { layout: 'Main' },
    component: () => import('../views/category.vue')
  },
  {
    path: '/product/',
    name: 'Product',
    meta: { layout: 'Main' },
    component: () => import('../views/product.vue')
  },
  {
    path: '/settings/',
    name: 'Settings',
    meta: { layout: 'Main' },
    component: () => import('../views/settings.vue')
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

export default router
