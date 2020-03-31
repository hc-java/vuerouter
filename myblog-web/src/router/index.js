import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/components/Login'
import Routertest from '@/components/Routertest'
import PageOne from '@/components/PageOne'
import PageTwo from '@/components/PageTwo'
import Index from '@/components/index';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '导航1',
      redirect :'/pageOne',
      component: Index,
      children : [ {
        path :'/pageOne',
        name :'页面1',
        component: PageOne
      },
        {
          path: '/pageTwo',
          name: '页面2',
          component: PageTwo,

        }]
    },
    {
      path: '/nav',
      name :'导航2',
      component :Index,
      children : [
        {
        path :'/login',
        name :'页面3',
        component: Login
        },
        {
          path: '/routertest',
          name: '页面4',
          component: Routertest
        }]
    }


    ]
})
