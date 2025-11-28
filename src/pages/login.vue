<template>
  <div class="login-container">
    <div class="login-box">

      <div class="system-title">行为检测系统</div>

      <el-form :model="form" label-width="0" class="login-form">

        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            :prefix-icon="Lock"
          />
        </el-form-item>

        <el-form-item>
          <div class="btn-group">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter();

const form = reactive({
  username: '',
  password: '',
})

const submitForm = () => {
  login(form)
    .then((res: any) => {
      if(res.data.code === 200){
        ElMessage({message: '登录成功', type: 'success', plain: true,})
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        router.push('/home')
      }
      else{
        ElMessage({message: '登录失败', type: 'error', plain: true, })
      }
    })
    .catch((err: any) => {
      console.log("登录失败：", err)
      ElMessage({message: '登录失败', type: 'error', plain: true,})
    })
}

const resetForm = () => {
  form.username = ''
  form.password = ''
}
</script>

<style scoped>
/* 整个背景 */
.login-container {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.login-container::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -200px;
  left: -200px;
}

.login-container::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -150px;
  right: -150px;
}

/* 登录卡片 */
.login-box {
  width: 300px;
  padding: 40px 35px;
  border-radius: 12px;
  background: #fff;
  
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题 */
.system-title {
  font-size: 28px;
  font-weight: 600;
  color: #409EFF;
  margin-bottom: 35px;
  text-align: center;
}

/* 表单 */
.login-form {
  width: 80%;
}

/* 按钮组 */
.btn-group {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
