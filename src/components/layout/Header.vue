<template>
  <el-header class="header">
    <div class="header-left">
      <el-icon class="menu-icon" @click="handleToggleSidebar"><Expand /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ currentPageName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-icon class="header-icon"><Bell /></el-icon>
      <el-dropdown>
        <div class="user-info">
          <el-avatar :size="35" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">{{ userInfo.username }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Expand, Bell, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || "{'username':'未知'}"))

// 路由名称映射
const routeNameMap: Record<string, string> = {
  '/': '首页',
  '/home': '首页',
  '/home/dashboard': '首页',
  '/login': '登录',
  '/home/monitor': '实时监控',
  '/home/analysis': '数据分析',
  '/home/alert': '告警记录',
  '/home/settings': '系统设置'
}
// 实时计算当前页面名称
const currentPageName = computed(() => {
  // 其次根据路由推算
  return routeNameMap[route.path] || '首页'
})

// 定义 emit
const emit = defineEmits(['toggle-sidebar'])

const handleToggleSidebar = () => {
  emit('toggle-sidebar')
}

const handleLogout = () => {
  router.push('/login');
  localStorage.removeItem('userInfo');
  ElMessage({message: '已退出登录', type: 'primary', plain: true,})
  console.log('已退出登录');
}
</script>

<style scoped>
.header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-icon {
  font-size: 20px;
  cursor: pointer;
  color: #5a5e66;
}

.menu-icon:hover {
  color: #409EFF;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  font-size: 20px;
  cursor: pointer;
  color: #5a5e66;
}

.header-icon:hover {
  color: #409EFF;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.username {
  font-size: 14px;
  color: #303133;
}
</style>
