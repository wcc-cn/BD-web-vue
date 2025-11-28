<template>
  <div class="monitor-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>实时监控</span>
        </div>
      </template>
      <div class="content-placeholder">
        <el-icon :size="80" color="#409EFF"><VideoCamera /></el-icon>
        <p>实时监控页面</p>
        <el-text type="info">此页面用于显示实时监控视频流</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { VideoCamera } from '@element-plus/icons-vue'
</script>

<style scoped>
.monitor-container {
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
