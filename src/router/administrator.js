import administrator from '@/pages/administrator'

export default {
    path: '/administrator',
    component: administrator,
    meta: {
        title: '管理中心',
    },
    children: [
        {
            path: '/administrator/addcartoon',
            name: 'user',
            meta: {
                title: '添加漫画',
            },
            component: () => import('@/pages/administrator/addcartoon'),
        },
        {
            path: '/administrator/addcartoon',
            name: 'user',
            meta: {
                title: '新漫画',
            },
            component: () => import('@/pages/administrator/addcartoon'),
        }
    ]
}
