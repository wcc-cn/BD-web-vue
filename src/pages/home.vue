<template>
  <div class="home-container">
    <el-container>
      <!-- 侧边栏组件 -->
      <Sidebar ref="sidebarRef" />

      <el-container direction="vertical">
        <!-- 顶部栏组件 -->
        <AppHeader @toggle-sidebar="handleToggleSidebar" />

        <!-- 主内容区 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import AppHeader from '@/components/layout/Header.vue'

const sidebarRef = ref()

const handleToggleSidebar = () => {
  sidebarRef.value?.toggleCollapse()
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.el-container {
  width: 100%;
  height: 100%;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>