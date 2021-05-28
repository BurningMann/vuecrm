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
/*   {
    path: '/category',
    name: 'Category',
    meta: { layout: 'Category' },
    component: () => import('../views/About.vue')
  }, */
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
