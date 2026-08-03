<template>
  <el-dialog v-model="dialogVisible" :title="txt" width="600" :before-close="handleClose">
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        label-width="100px"
      >
        <el-form-item label="标题">
          <el-input v-model="formData.title" placeholder="" />
        </el-form-item>

        <el-form-item label="配置值">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :limit="1"
            ref="uploadRef"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="imageFile[]"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="">
          <div class="red">建议图片尺寸1125*2436px</div>
        </el-form-item>
        <el-form-item label="是否默认">
          <el-radio-group v-model="formData.status">
            <el-radio label="0" :value="1">是</el-radio>
            <el-radio label="1" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { editAdvertPageImage, addAdvertPageImage } from '@/api/platformSetManage'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  defineOptions({ name: 'AdvertPageImageDetailsDialog' })
  const uploadImageUrl = `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/picture`
  const uploadRef = ref()
  const dialogVisible = ref(false)
  const formRef = ref()
  const formData = ref({
    id: 0,
    title: '',
    image: '',
    status: 1
  })
  const txt = ref('')
  const imageUrl = ref('')
  const emit = defineEmits(['refresh'])

  // 定义上传请求头
  const uploadHeaders = ref({
    Authorization: userStore.accessToken
  })
  const handleClose = () => {
    uploadRef.value?.clearFiles()
    dialogVisible.value = false
  }
  const openDialog = (row: any) => {
    dialogVisible.value = true
    formRef.value?.resetFields()
    if (row.id) {
      imageUrl.value = row.image
      formData.value = {
        ...row
      }
      txt.value = '编辑'
    } else {
      txt.value = '添加'
      imageUrl.value = ''
    }

    console.log(formData.value.image)
  }

  const confirm = async () => {
    if (!imageUrl.value) {
      ElMessage.error('请上传图片')
      return
    }
    if (formData.value.id) {
      editAdvertPageImage({
        id: formData.value.id,
        title: formData.value.title,
        image: formData.value.image,
        status: formData.value.status
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('编辑成功')
          dialogVisible.value = false
          emit('refresh')
        } else {
          ElMessage.success(res.msg)
        }
      })
    } else {
      addAdvertPageImage({
        title: formData.value.title,
        image: formData.value.image || imageUrl.value,
        status: formData.value.status
      }).then((res) => {
        if (res.code === 200) {
          ElMessage.success('添加成功')
          dialogVisible.value = false
          emit('refresh')
        } else {
          ElMessage.success(res.msg)
        }
      })
    }
  }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      imageUrl.value = response.data.file[0]
    }
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp' // 可根据需要添加更多
    ]
    if (!allowedTypes.includes(rawFile.type)) {
      ElMessage.error('请上传图片')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('图片大小不能超过2MB')
      return false
    }
    return true
  }

  defineExpose({
    openDialog
  })
</script>
