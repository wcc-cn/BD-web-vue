<template>
  <div class="home-container">
    <el-container>
      <!-- 侧边栏组件 -->
      <Sidebar ref="sidebarRef" />

      <el-container direction="vertical">
        <!-- 顶部栏组件 -->
        <AppHeader @toggle-sidebar="handleToggleSidebar" @click-dialog="handleClickDialog" />

        <!-- 主内容区 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <el-dialog v-model="dialogTableVisible" title="消息通知" width="1000">
        <el-table :data="gridData">
            <el-table-column property="name" label="消息名称" width="150" align="center" />
            <el-table-column property="time" label="时间" width="200" align="center" />
            <el-table-column property="msg" label="内容" align="center" />
        </el-table>
    </el-dialog>
    
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import AppHeader from '@/components/layout/Header.vue'

const sidebarRef = ref()
const dialogTableVisible = ref(false)
const gridData = reactive([
  {
    name: '系统通知',
    time: '2016-05-02 00:00:00',
    msg: '日期: 2016-05-01, 告警数量: 100'
  },
  {
    name: '系统通知',
    time: '2016-05-02 00:00:00',
    msg: '日期: 2016-05-01, 告警数量: 100'
  },
  {
    name: '系统通知',
    time: '2016-05-02 00:00:00',
    msg: '日期: 2016-05-01, 告警数量: 100'
  },
  {
    name: '系统通知',
    time: '2016-05-02 00:00:00',
    msg: '日期: 2016-05-01, 告警数量: 100'
  },
  {
    name: '系统通知',
    time: '2016-05-02 00:00:00',
    msg: '日期: 2016-05-01, 告警数量: 100'
  }
])


const handleToggleSidebar = () => {
  sidebarRef.value?.toggleCollapse()
}

const handleClickDialog = () => {
  dialogTableVisible.value = true
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