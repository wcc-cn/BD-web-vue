<template>
  <div class="dashboard-container">
    <!-- 数据统计卡片 -->
    <el-row :gutter="20" class="stats-cards">
      <el-col :span="6">
        <StatsCard
          :icon="VideoCamera"
          value="24"
          label="在线设备"
          color="blue"
        />
      </el-col>
      <el-col :span="6">
        <StatsCard
          :icon="Warning"
          value="8"
          label="今日告警"
          color="green"
        />
      </el-col>
      <el-col :span="6">
        <StatsCard
          :icon="User"
          value="156"
          label="检测人数"
          color="orange"
        />
      </el-col>
      <el-col :span="6">
        <StatsCard
          :icon="DataAnalysis"
          value="98.5%"
          label="识别准确率"
          color="purple"
        />
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-section">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>实时监控状态</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-icon :size="60" color="#dcdfe6"><DataLine /></el-icon>
            <p>图表区域</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>告警统计</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <el-icon :size="60" color="#dcdfe6"><PieChart /></el-icon>
            <p>图表区域</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 告警记录表格组件 -->
    <AlertTable />
  </div>
</template>

<script setup lang="ts">
import { VideoCamera, Warning, User, DataAnalysis, DataLine, PieChart } from '@element-plus/icons-vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import AlertTable from '@/components/dashboard/AlertTable.vue'
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
}

.stats-cards {
  margin-bottom: 20px;
}

.chart-section {
  margin-bottom: 20px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.chart-placeholder p {
  margin-top: 10px;
  font-size: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
</style>
