import Vue from 'vue'
import Router from 'vue-router'
const components= {
  layout: () => import('@/components/layout/index'),
  index: () => import('@/components/index/index'),
  detail:()=>import('@/components/details/index'),
  mybuild:()=>import('@/components/mybuild/index'),
  login:()=>import('@/components/login/index'),
  palmactivity:()=>import('@/components/palmactivity/index'),
  articledetail:()=>import('@/components/articledetail/index'),
  myinfo:()=>import('@/components/mybuild/myinfo/index'),
  integral:()=>import('@/components/mybuild/integral/index'),
  updatepsd:()=>import('@/components/mybuild/updatepas/index'),
  partyfee:()=>import('@/components/mybuild/partyfee/index'),
  yunhudong:()=>import('@/components/yunactivity/index'),
  news:()=>import('@/components/news/index'),
  think:()=>import('@/components/palmactivity/think/index'),
  mythink:()=>import('@/components/palmactivity/mythink/index'),
  map:()=>import('@/components/map/index'),
  jifendetail:()=>import('@/components/jifendetail/index')
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      children:[
        {
          path: '/',
          name: 'index',
          component: components.index
        },
        {
          path: 'mybuild',
          name: 'mybuild',
          component: components.mybuild,

        },
        {
          path: 'news',
          name: 'news',
          component: components.news,

        },
      ]
    },
    {
      path: '/yunhudong',
      name: 'yunhudong',
      component: components.yunhudong
    },
    {
      path: '/jifendetail',
      name: 'jifendetail',
      component: components.jifendetail
    },
    {
      path: '/map',
      name: 'map',
      component: components.map
    },
    {
      path: '/mybuild/myinfo',
      name: 'myinfo',
      component: components.myinfo
    },
    {
      path: '/mybuild/partyfee',
      name: 'partyfee',
      component: components.partyfee
    },
    {
      path: '/mybuild/updatepsd',
      name: 'updatepsd',
      component: components.updatepsd
    },
    {
      path:'/mybuild/integral',
      name: 'integral',
      component: components.integral
    },
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    {
      path: '/palmactivity',
      name: 'palmactivity',
      component: components.palmactivity,

    },
    {
      path: '/palmactivity/think',
      name: 'think',
      component: components.think,
    },
    {
      path: '/palmactivity/mythink',
      name: 'mythink',
      component: components.mythink,
    },
    {
      path: '/articledetail',
      name: 'articledetail',
      component: components.articledetail
    },
    {
      path: '/detail',
      name: 'detail',
      component: components.detail,
      children:[
        {
          path: 'xingong',
          name: 'xingong',
          component: components.detail,
        },
        {
          path: 'life',
          name: 'life',
          component: components.detail,
        },
        {
          path: 'yunhudong',
          name: 'yunhudong',
          component: components.detail,
        },
        {
          path: 'yidiantong',
          name: 'yidiantong',
          component: components.detail,
        },
        {
          path: 'liangshengfen',
          name: 'liangshengfen',
          component: components.detail,
        },
        {
          path: 'history',
          name: 'history',
          component: components.detail,
        },
        {
          path: 'studyevery',
          name: 'studyevery',
          component: components.detail,
        },
        {
          path: 'photoevery',
          name: 'photoevery',
          component: components.detail,
        },
        {
          path: 'zhidubuild',
          name: 'zhidubuild',
          component: components.detail,
        },
        {
          path: 'activity',
          name: 'activity',
          component: components.detail,
        },
        {
          path: 'message',
          name: 'message',
          component: components.detail,
        },
        {
          path: 'politicsstudy',
          name: 'politicsstudy',
          component: components.detail,
        },
      ]
    },

  ]
})
