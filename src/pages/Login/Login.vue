<template>
  <div class="login">
    <div class="form-box">
      <el-form
        ref="loginFormRef"
        :model="loginData"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="Username" prop="checkPass">
          <el-input v-model="loginData.username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginData.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">Login</el-button>
          <el-button @click="resetForm(loginFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const loginFormRef = ref<FormInstance>()
const loginData = reactive({
  username: '',
  password: ''
})
const submitForm = (formEl: FormInstance | undefined): void => {

}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang='scss' scoped>
  .login {
    position: relative;
    .form-box {
      width: 40%;
      min-width: 30%;
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid #000;
      border-radius: 15px;
      padding: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 50%);
    }
    .form-box::before {
      content: "";
      width: 200%;
      height: 200%;
      background: red;
      position: absolute;
      z-index: -2;
    }
  }
</style>