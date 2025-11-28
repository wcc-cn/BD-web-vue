<template>
  <div class="settings-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>
      <div class="content-placeholder">
        <el-icon :size="80" color="#909399"><Setting /></el-icon>
        <p>系统设置页面</p>
        <el-text type="info">此页面用于配置系统参数和选项</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.settings-container {
  width: 100%;
  height: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.content-placeholder {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.content-placeholder p {
  font-size: 20px;
  color: #303133;
  margin: 0;
}
</style>
