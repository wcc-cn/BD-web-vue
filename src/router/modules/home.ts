import type {RouteRecordRaw} from 'vue-router'

const homeRouter:RouteRecordRaw = { path: '/home', component: ()=> import('@/pages/home.vue') }

export default homeRouter