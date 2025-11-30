<template>
  <div class="detect-result-container">
    <el-card>
        <template #header>
            <div class="card-header">
                <span>识别结果</span>
            </div>
        </template>
        <el-table :data="tableData" style="width: 100%">

            <el-table-column label="视频ID" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="源视频名称" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.videoName }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="识别效果视频名称" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.predictVideoName }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="检测结果描述" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.detectDescription }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作"  align="center">
                <template #default="scope">
                    <el-button size="small" @click="handlePlay(scope.$index, scope.row)">
                        播放视频
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="margin-top: 20px; display: flex; justify-content: flex-end;"
        />

        <el-dialog v-model="playDialogVisible" title="识别效果" width="1000px">
            <video
                :src="videoUrl"
                ref="videoRef"
                controls
                autoplay
                style="width:100%; background: #000;"
            ></video>
        </el-dialog>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive  } from 'vue'
import type {ComponentSize } from 'element-plus'
import { ElMessage } from 'element-plus'
import {queryDetectResultPage, deleteDetectResult} from '@/api/detectResult'
// import { addVideo, getVideoPage, delete_video, detectVideo} from '@/api/video'

const playDialogVisible = ref(false)
const videoRef = ref<HTMLVideoElement>()
const videoUrl = ref('')
const videoInfo = reactive({
  name: '',
  format: 'mp4',
  fps: '25',
  type: '行为识别'
})

const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>('small')
const background = ref(false)
const disabled = ref(false)
const total = ref(10)


watch(playDialogVisible, (newVal, oldVal) => {
  if (!newVal) {
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
    }
  } 
})

interface DetectResult {
  id: number;
  videoName: string;
  predictVideoName: string;
  detectDescription: string;
}

const tableData = ref<DetectResult[]>([])

const query_page = (page: number, size: number) => {
    queryDetectResultPage({page: page, size: size})
        .then((res: any) => {
            if(res.data.code === 200){
                tableData.value = res.data.data.data
                total.value = res.data.data.total
            }
        })
        .catch((err: any) => {
            console.log('分页查询识别结果失败: '+ err)
            ElMessage({message: '分页查询识别结果失败!', type: 'error', plain: true,})
        })
}

query_page(currentPage.value, pageSize.value)

const handleSizeChange = (val: number) => {
    query_page(currentPage.value, val)
}
const handleCurrentChange = (val: number) => {
    query_page(val, pageSize.value)
}

const handlePlay = (index: number, row: any) => {
    videoUrl.value = "http://localhost:8081/predict_video/" + row.predictVideoName
    videoInfo.name = row.predictVideoName
    playDialogVisible.value = true
    console.log(videoUrl.value)
}

const handleDelete = (index: number, row: any) => {
    deleteDetectResult({id: row.id}).then((res: any) => {
        if (res.data.code === 200) {
            query_page(currentPage.value, pageSize.value)
        }
    }).catch((err: any) => {
        ElMessage({message: '删除失败!', type: 'error', plain: true,})
        console.log('删除失败: ' + err)
    })
}



</script>

<style scoped>
.video-detect-result-container {
  width: 100%;
  height: 100%;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between; /* 左右拉开 */
  align-items: center;            /* 垂直居中 */
  padding: 10px 0;
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
