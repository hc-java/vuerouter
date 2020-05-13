import Vue from 'vue'
import Router from 'vue-router'


import Index from '../view/index';
import Login from '../view/admin/login';
import Main from '../view/admin/main';
import AddArticle from '../view/admin/addArticle';
import QueryArticle from '../view/admin/queryArticle';
import QueryReply from '../view/admin/queryReply';
import QueryComment from '../view/admin/queryComment';
import Queryabout from '../view/admin/queryabout';


import Home from '../view/web/home';
import Classify from '../view/web/classify';
import About from '../view/web/about';
import Album from '../view/web/album';
import Blogconent from '../view/web/blogconent';
import QueryTitle from '../view/web/queryTitle';

import Left from '@/components/left';

Vue.use(Router)

export default new Router({
  base:'/myblog/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect :'/home',
      component: Index,
      children : [ {
        path :'/home',
        name :'首页',
        component: Home
      },
        {
          path :'/classify',
          name :'分类',
          component: Classify

        },
        {
          path :'/album',
          name :'相册',
          component: Album
         /* meta : {
              needLogin:true  //需要登录才能反问
          }*/

        },
        {
          path :'/about',
          name :'关于我',
          component: About

        },
        {
          path: '/blogconent/:articleId/:classifyName',
          name:'评论页面',
          component: Blogconent
        },
        {
          path:'/queryTitle/:input',
          name:'查询页面',
          component : QueryTitle
        }
      ]
    },
    {
      path :'/left',
      name:'左侧栏',
      component: Left
    },
    {
      path :'/login',
      name :'login',
      component: Login
    },
    //main start
    {
      path :'/main',
      name :'main',
       // hidden : true,
      component: Main,
      children : [{
        path :'/addArticle',
        component: AddArticle
      },
        {
          path :'/queryArticle',
          component: QueryArticle
        },
        {
          path :'/queryReply',
          component: QueryReply
        },
        {
          path :'/queryComment',
          component: QueryComment
        },
        {
          path :'/queryabout',
          component: Queryabout
        }
        ]
    },

    //main end

    {
      path :'/',
      name :'文章管理',
      redirect :'/addArticle',
      component :AddArticle,
      hidden : true,
      children : [{
        path :'/addArticle',
        name :'添加文章',
        component: AddArticle
      },
        {
          path :'/queryArticle',
          name :'查询文章',
          component: QueryArticle
        }]

    },
    {
      path :'/',
      name :'评论管理',
      redirect :'/addComment',
      component :QueryComment,
      hidden : true,
      children : [ {
        path :'/queryComment',
        name :'查询评论',
        component: QueryComment
      },
        {
        path :'/queryReply',
        name :'查询回复',
        component: QueryReply
      }]

    },
    {
      path :'/',
      name :'个人管理',
      component :Queryabout,
      hidden : true,
      children : [ {
        path :'/queryabout',
        name :'个人信息',
        component: Queryabout
      }]
    }






    ]
})
