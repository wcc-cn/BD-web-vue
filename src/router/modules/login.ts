import type { RouteRecordRaw } from "vue-router"

const loginRouter:RouteRecordRaw = { path: '/login', component: ()=> import('@/pages/login.vue') }
export default loginRouter
