import Vue from 'vue'
import Router from 'vue-router'
import Setup from './views/Setup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'setup',
      component: Setup
    },
    {
      path: '/run',
      name: 'run',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "run" */ './views/Run.vue')
    }
  ]
})
