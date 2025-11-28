<template>
  <div class="alert-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>告警记录</span>
        </div>
      </template>
      <div class="content-placeholder">
        <el-icon :size="80" color="#E6A23C"><Warning /></el-icon>
        <p>告警记录页面</p>
        <el-text type="info">此页面用于显示历史告警记录和详情</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'
</script>

<style scoped>
.alert-container {
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
