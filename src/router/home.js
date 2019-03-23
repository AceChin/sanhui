import Layout from '@/pages/layout'

export default {
    path: '/',
    component: Layout,
    meta: { 
      title:"首页"
    },
    children:[
        {
            path: '/',
            name: 'home',
            meta: { 
              title: '首页',
            },
            component: () => import('@/pages/home'),
          },
        {
            path: '/cartoon',
            name: 'cartoon',
            meta: { 
            title: '漫画页面',
            },
            component: () => import('@/pages/cartoonDetail'),
        }]
  }