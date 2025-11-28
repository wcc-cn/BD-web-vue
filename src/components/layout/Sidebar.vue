<template>
  <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar">
    <div class="logo-section">
      <h2 v-if="!isCollapse">行为检测系统</h2>
      <h2 v-else class="logo-short">BD</h2>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      @select="handleMenuSelect"
    >
      <el-menu-item index="1">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><VideoCamera /></el-icon>
        <span>实时监控</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><DataAnalysis /></el-icon>
        <span>数据分析</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Warning /></el-icon>
        <span>告警记录</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><Setting /></el-icon>
        <span>系统设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { House, VideoCamera, DataAnalysis, Warning, Setting } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)

// 根据当前路由计算活跃菜单
const activeMenu = computed(() => {
  const path = route.path
  if (path.includes('/dashboard')) return '1'
  if (path.includes('/monitor')) return '2'
  if (path.includes('/analysis')) return '3'
  if (path.includes('/alert')) return '4'
  if (path.includes('/settings')) return '5'
  return '1'
})

const handleMenuSelect = (index: string) => {
  const routeMap: Record<string, string> = {
    '1': '/home/dashboard',
    '2': '/home/monitor',
    '3': '/home/analysis',
    '4': '/home/alert',
    '5': '/home/settings'
  }
  router.push(routeMap[index])
}

// 暴露方法给父组件调用
defineExpose({
  toggleCollapse: () => {
    isCollapse.value = !isCollapse.value
  }
})
</script>

<style scoped>
.sidebar {
  background-color: #304156;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
  transition: width 0.3s;
}

.logo-section {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3947;
}

.logo-section h2 {
  color: #fff;
  font-size: 18px;
  margin: 0;
  font-weight: 600;
}

.logo-short {
  font-size: 20px !important;
}

.sidebar-menu {
  border-right: none;
}

.sidebar-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
