<template>
  <div class="user-container">
    <el-card>
        <template #header>
            <div class="card-header">
                <span>用户管理</span>
                <el-button type="primary" @click="handleAdd">添加用户</el-button>
            </div>
        </template>
        <el-table :data="tableData" style="width: 100%">

            <el-table-column label="用户id" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="账号" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.account }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="用户名" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.username }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="密码" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.password }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="权限" style ="width: 18%" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.role === 0 ?'管理员' : '平台使用人员' }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column  align="center">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        编辑
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

        <el-dialog v-model="dialogEditFormVisible" title="编辑用户" width="500">
            <el-form :model="editForm">
                <el-form-item label="用户id" :label-width="formLabelWidth">
                    <el-input v-model="editForm.id" autocomplete="off" disabled="true"/>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.account" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.username" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="editForm.password" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="editForm.role" placeholder="Select" style="width: 240px">
                        <el-option
                          v-for="item in roleOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEditFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditUser">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogAddFormVisible" title="新增用户" width="500">
            <el-form :model="addForm">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.account" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.username" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="addForm.role" placeholder="Select" style="width: 240px">
                        <el-option
                          v-for="item in roleOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUser">
                    确定
                </el-button>
            </div>
            </template>
        </el-dialog>


    </el-card>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User } from '@element-plus/icons-vue'
import { query_user_page, delete_user, edit_user } from '@/api/user'
import { ElMessage, type ComponentSize } from 'element-plus'

const dialogEditFormVisible = ref(false)
const dialogAddFormVisible = ref(false)
const formLabelWidth = '100px'

const editForm = reactive({ id: 0, account: '', username: '', password: '', role: 0 })
const addForm = reactive({ account: '', username: '', password: '', role: 0 })
const roleOptions = [
  { value: 0, label: '管理员' },
  { value: 1, label: '平台使用人员' }
]

interface User {
  id: number
  account: string
  username: string
  password: string
  role: number
}

const tableData = ref<User[]>([])

const query_page = (page: number, size: number) => {
    query_user_page({page: page, size: size})
    .then((res: any) => {
      if(res.data.code === 200){
        console.log(res.data.data)
        tableData.value = res.data.data.data
        total.value = res.data.data.total
      }
    })
    .catch((err: any) => {
      console.log('分页查询用户失败: '+ err)
      ElMessage({message: '分页查询用户失败!', type: 'error', plain: true,})
    })
}

const currentPage = ref(1)
const pageSize = ref(10)
const size = ref<ComponentSize>('small')
const background = ref(false)
const disabled = ref(false)
const total = ref(10)

query_page(currentPage.value, pageSize.value)



const handleEdit = (index: number, row: User) => {
    dialogEditFormVisible.value = true
    editForm.id = row.id
    editForm.account = row.account
    editForm.username = row.username
    editForm.password = row.password
    editForm.role = row.role
}

const handleDelete = (index: number, row: User) => {
    delete_user({id: row.id})
        .then((res: any) => {
            if(res.data.code === 200){
                query_page(currentPage.value, pageSize.value)
            }
        })
        .catch((err: any) => {
            console.log('删除用户失败: '+ err)
            ElMessage({message: '删除用户失败!', type: 'error', plain: true,})
        })
}

const handleSizeChange = (val: number) => {
    query_page(currentPage.value, val)
}
const handleCurrentChange = (val: number) => {
    query_page(val, pageSize.value)
}

const handleEditUser = () =>{
    edit_user(editForm).then((res: any) => {
        if(res.data.code === 200){
            query_page(currentPage.value, pageSize.value)
        }
    }).catch((err: any) => {
      console.log('编辑用户失败: '+ err)
      ElMessage({message: '编辑用户失败!', type: 'error', plain: true,})
    })
    dialogEditFormVisible.value = false
    console.log(editForm)
}
const handleAdd = () => {
    dialogAddFormVisible.value = true
}

const handleAddUser = () => {
    edit_user(addForm).then((res: any) => {
        if(res.data.code === 200){
            query_page(currentPage.value, pageSize.value)
        }
    }).catch((err: any) => {
        console.log('新增用户失败: '+ err)
        ElMessage({message: '新增用户失败!', type: 'error', plain: true,})
    })
    dialogAddFormVisible.value = false
    addForm.account = ''
    addForm.username = ''
    addForm.password = ''
    addForm.role = 0
}
</script>

<style scoped>
.user-container {
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