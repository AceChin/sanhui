import Layout from '@/pages/layout'

export default [{
  path: '/',
  component: Layout,
  meta: {
    title: "个人中心"
  },
  children: [
    {
      path: '/userinfo',
      name: 'user',
      meta: {
        title: '首页',
      },
      component: () => import('@/pages/user'),
    }
  ]
}, {
  path: '/',
  component: Layout,
  meta: {
    title: "个人中心"
  },
  children: [
    {
      path: '/userinfo/avatar',
      name: 'user',
      meta: {
        title: '首页',
      },
      component: () => import('@/pages/user'),
    }
  ]
}]

  // {
  //   path: '/userinfo',
  //   name: 'userinfo',
  //   statu: true,
  //   leaf: true,
  //   meta: {
  //       title: '个人中心',
  //   },
  //   component: () => import ('@/pages/user')
  // }