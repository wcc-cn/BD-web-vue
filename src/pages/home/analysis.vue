<template>
  <div class="analysis-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>数据分析</span>
        </div>
      </template>
      <div class="content-placeholder">
        <el-icon :size="80" color="#67C23A"><DataAnalysis /></el-icon>
        <p>数据分析页面</p>
        <el-text type="info">此页面用于显示数据分析图表和报告</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { DataAnalysis } from '@element-plus/icons-vue'
</script>

<style scoped>
.analysis-container {
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
