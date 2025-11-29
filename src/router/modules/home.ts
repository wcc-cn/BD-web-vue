import type {RouteRecordRaw} from 'vue-router'

const homeRouter:RouteRecordRaw = {
  path: '/home',
  component: () => import('@/pages/home.vue'),
  redirect: '/home/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/home/dashboard.vue'),
      meta: { title: '首页' }
    },
    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/pages/home/monitor.vue'),
      meta: { title: '实时监控' }
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/home/analysis.vue'),
      meta: { title: '数据分析' }
    },
    {
      path: 'alert',
      name: 'Alert',
      component: () => import('@/pages/home/alert.vue'),
      meta: { title: '告警记录' }
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/pages/home/user.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/pages/home/settings.vue'),
      meta: { title: '系统设置' }
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/pages/home/video.vue'),
      meta: { title: '视频管理' }
    }
  ]
}

export default homeRouter