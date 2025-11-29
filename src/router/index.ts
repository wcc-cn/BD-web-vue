import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import homeRoute from './modules/home'
import loginRouter from './modules/login'


const routes:RouteRecordRaw[] = [
    { 
        path: '/', 
        name:"home", 
        redirect:'/login',
        children:[
            homeRoute,
            loginRouter
        ]
    },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router