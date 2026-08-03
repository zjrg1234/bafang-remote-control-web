<template>
  <el-dialog v-model="dialogVisible" :title="text" width="700px">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="版本号" prop="version_mark">
          <el-input v-model="formData.version_mark" placeholder="请输入版本号" />
        </el-form-item>
        <el-form-item label="版本编码">
          <el-input v-model="formData.version_coding" placeholder="请输入版本编码" />
        </el-form-item>
        <el-form-item label="APP类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="1" :value="1">苹果</el-radio>
            <el-radio label="2" :value="2">安卓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="升级包URL">
          <el-upload
            ref="upload"
            class="upload-demo"
            :headers="uploadHeaders"
            :action="uploadImageUrl"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>

            <template #tip>
              <div class="el-upload__tip text-red"> 仅支持上传一个文件 </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="更新内容">
          <el-input
            v-model="formData.update_content"
            type="textarea"
            placeholder="请输入更新内容"
          />
        </el-form-item>
        <el-form-item label="是否启用改绑专区" prop="is_change_special">
          <el-radio-group v-model="formData.is_change_special">
            <el-radio label="0" :value="0">否</el-radio>
            <el-radio label="1" :value="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否强制更新" prop="forced_updating">
          <el-radio-group v-model="formData.forced_updating">
            <el-radio label="0" :value="0">否</el-radio>
            <el-radio label="1" :value="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="1" :value="1">启用</el-radio>
            <el-radio label="0" :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(formRef)">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  import { addVersion, editVersion } from '@/api/platformSetManage'
  import type { UploadInstance, UploadProps } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()

  const uploadImageUrl = `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/file`
  const upload = ref<UploadInstance>()

  defineOptions({ name: 'EditComQDialog' })
  const emit = defineEmits(['refresh'])
  const dialogVisible = ref(false)
  const formData = ref({
    id: '',
    version_mark: '', //版本号
    version_coding: '', //版本编码
    type: 1, //1苹果 2安卓
    update_content: '', //更新内容
    is_change_special: 0, //是否转区 0否1是
    forced_updating: 0, //是否强制更新  0否 1 是
    status: 1, //状态 0禁用 1启用
    app_url: '' // 安卓使用
  })
  const text = computed(() => {
    return formData.value.id === '' ? '新增' : '编辑'
  })
  const formRef = ref<FormInstance>()

  const rules = computed<FormRules>(() => ({
    version_mark: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
    // version_coding: [{ required: true, message: '请输入版本编码', trigger: 'blur' }],
    type: [{ required: true, message: '请选择APP类型', trigger: 'change' }],
    // app_url: [{ required: true, message: '请输入升级包URL', trigger: 'blur' }],
    is_change_special: [{ required: true, message: '请选择是否转区', trigger: 'change' }],
    forced_updating: [{ required: true, message: '请选择是否强制更新', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
  }))

  // 定义上传请求头
  const uploadHeaders = ref({
    Authorization: userStore.accessToken
  })

  const openDialog = (row: any) => {
    dialogVisible.value = true
    if (row) {
      formData.value = { ...row }
    }
  }

  const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        if (formData.value.id) {
          editVersion(formData.value).then((res) => {
            if (res.code === 200) {
              ElMessage.success('编辑成功')
              emit('refresh')
              resetForm(formEl)
            } else {
              ElMessage.error(res.msg || '编辑失败')
            }
          })
        } else {
          addVersion(formData.value).then((res) => {
            if (res.code === 200) {
              ElMessage.success('新增成功')
              emit('refresh')
              resetForm(formEl)
            } else {
              ElMessage.error(res.msg || '新增失败')
            }
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    upload.value?.clearFiles()
    formData.value = {
      id: '',
      version_mark: '', //版本号
      version_coding: '', //版本编码
      type: 1, //1苹果 2安卓
      update_content: '', //更新内容
      is_change_special: 0, //是否转区 0否1是
      forced_updating: 0, //是否强制更新  0否 1 是
      status: 1, //状态 0禁用 1启用
      app_url: '' // 安卓使用
    }
    dialogVisible.value = false
  }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.app_url = response.data.file[0]
    }
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile.name)
    if (formData.value.type == 2 && !rawFile.name.endsWith('.apk')) {
      ElMessage.error('请上传apk文件')
      return false
    }

    if (formData.value.type == 1 && !rawFile.name.endsWith('.dmg')) {
      ElMessage.error('请上传dmg文件')
      return false
    }

    return true
  }

  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss"></style>
