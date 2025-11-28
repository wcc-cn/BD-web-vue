<template>
  <el-card class="alert-table">
    <template #header>
      <div class="card-header">
        <span>最近告警记录</span>
        <el-button text type="primary">查看更多</el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="device" label="设备" width="150" />
      <el-table-column prop="type" label="告警类型" width="150" />
      <el-table-column prop="level" label="级别" width="100">
        <template #default="scope">
          <el-tag :type="getLevelType(scope.row.level)">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="150">
        <template #default>
          <el-button size="small" type="primary" text>查看详情</el-button>
          <el-button size="small" type="success" text>处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AlertRecord {
  time: string
  device: string
  type: string
  level: string
  description: string
}

const tableData = ref<AlertRecord[]>([
  {
    time: '2025-11-28 10:30:25',
    device: '摄像头-01',
    type: '异常行为',
    level: '高',
    description: '检测到可疑人员徘徊'
  },
  {
    time: '2025-11-28 10:15:10',
    device: '摄像头-03',
    type: '区域入侵',
    level: '中',
    description: '未授权区域有人员进入'
  },
  {
    time: '2025-11-28 09:45:33',
    device: '摄像头-05',
    type: '物品遗留',
    level: '低',
    description: '检测到无主物品'
  },
  {
    time: '2025-11-28 09:20:18',
    device: '摄像头-02',
    type: '人员聚集',
    level: '中',
    description: '检测到人员异常聚集'
  }
])

const getLevelType = (level: string) => {
  const typeMap: Record<string, any> = {
    '高': 'danger',
    '中': 'warning',
    '低': 'info'
  }
  return typeMap[level] || 'info'
}
</script>

<style scoped>
.alert-table {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
</style>
