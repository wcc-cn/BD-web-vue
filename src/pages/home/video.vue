<template>
  <div class="video-container">
    <el-card>
        <template #header>
            <div class="card-header">
                <span>视频管理</span>
                <el-button type="primary" @click="handleAdd">新增视频</el-button>
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

            <el-table-column label="视频名称" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
        
        <el-dialog title="新增视频" v-model="dialogVisible" width="40%">
            <el-upload
                class="upload"
                drag
                action="http://localhost:8080/bd/video/upload"
                multiple
                :on-success="handleUploadSuccess"
                :on-remove="handleUploadRemove"
                ref="uploadRef"
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png 文件不得超过 500kb
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddVideo">上传</el-button>
            </template>
        </el-dialog>

        <el-dialog
            v-model="playDialogVisible"
            title="播放视频"
            width="800px"
            >
            <video
                :src="videoUrl"
                controls
                autoplay
                style="width:100%; max-height: 600px; background: #000;"
            ></video>
        </el-dialog>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch  } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, ComponentSize } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addVideo, getVideoPage, delete_video } from '@/api/video'

const dialogVisible = ref(false)
const playDialogVisible = ref(false)
const videoUrl = ref('')

const videoList = ref<string[]>([])
const uploadRef = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>('small')
const background = ref(false)
const disabled = ref(false)
const total = ref(10)

watch(dialogVisible, (newVal, oldVal) => {
  if (!newVal) {
    autoClearFiles()
  } 
})

interface Video {
  id: number;
  name: string;
}

const tableData = ref<Video[]>([])

const query_page = (page: number, size: number) => {
    getVideoPage({page: page, size: size})
        .then((res: any) => {
            if(res.data.code === 200){
                tableData.value = res.data.data.data
                total.value = res.data.data.total
            }
        })
        .catch((err: any) => {
            console.log('分页查询视频失败: '+ err)
            ElMessage({message: '分页查询视频失败!', type: 'error', plain: true,})
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
    videoUrl.value = "http://localhost:8081/video/" + row.name
    playDialogVisible.value = true
}

const handleDelete = (index: number, row: any) => {
    delete_video({id: row.id}).then((res: any) => {
        if (res.data.code === 200) {
            query_page(currentPage.value, pageSize.value)
        }
    }).catch((err: any) => {
        ElMessage({message: '删除失败!', type: 'error', plain: true,})
        console.log('删除失败: ' + err)
    })
}

const handleAdd = () => {
    dialogVisible.value = true
}
const handleUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    videoList.value = uploadFiles.map(file => file.name)
}
const handleUploadRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    videoList.value = uploadFiles.map(file => file.name)
}
const handleAddVideo = () => {
    addVideo({videoList: videoList.value}).then((res: any) => {
        if (res.data.code === 200) {
            query_page(currentPage.value, pageSize.value)
        } else {
            ElMessage({message: '添加视频失败!', type: 'error', plain: true,})
        }
    })
    dialogVisible.value = false
    uploadRef.value.clearFiles()
}
const autoClearFiles = () => {
    uploadRef.value.clearFiles()
}


</script>

<style scoped>
.video-container {
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
