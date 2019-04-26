import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainBoard from '@/components/MainBoard'
import Index from '@/components/Index'
import List from '@/components/List'
import Lend from '@/components/Lend'
import Return from '@/components/Return'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'MainBoard',
      component: MainBoard,
      redirct: '/index',
      children: [
        {
          path: '/index',
          component: Index
        },
        {
          path: '/list',
          component: List
        },
        {
          path: '/lend',
          component: Lend
        },
        {
          path: '/return',
          component: Return
        }
      ]
    }
  ]
})
