<template>
  <el-dialog v-model="dialogVisible" :title="txt" width="600">
    <div>
      <el-form
        ref="formRef"
        :model="formData"
        label-width="120px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item label="活动标题" prop="activity_title">
          <el-input v-model="formData.activity_title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="公告所属类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="1" :value="1">平台公告</el-radio>
            <el-radio label="2" :value="2">专区公告</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题图片" prop="activity_image">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :headers="uploadHeaders"
            name="imageFile[]"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.activity_image" :src="formData.activity_image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label=" ">
          <div class="red">注：建议长宽比例为1:1</div>
        </el-form-item>

        <el-form-item label="活动详情" prop="">
          <ArtWangEditor
            ref="simpleEditorRef"
            v-model="formData.content"
            height="200px"
            placeholder="请输入内容，体验简化的编辑功能..."
            :toolbar-keys="simpleToolbarKeys"
          />
        </el-form-item>
        <el-form-item label="是否首页显示" prop="is_index">
          <el-radio-group v-model="formData.is_index">
            <el-radio label="1" :value="1">是</el-radio>
            <el-radio label="0" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            name="imageFile[]"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.index_image" :src="formData.index_image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label=" ">
          <div class="red">注：建议长宽比例为1:1</div>
        </el-form-item>
        <el-form-item label="是否发现页显示" prop="is_discover">
          <el-radio-group v-model="formData.is_discover">
            <el-radio label="1" :value="1">是</el-radio>
            <el-radio label="0" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发现页图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
            :headers="uploadHeaders"
            name="imageFile[]"
          >
            <img v-if="formData.discover_image" :src="formData.discover_image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label=" ">
          <div class="red">注：建议长宽比例为1:1</div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="1" :value="1">启用</el-radio>
            <el-radio label="0" :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input v-model="formData.sort" placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ActNotManageIDialog' })
  import { addAct, editAct } from '@/api/activity'

  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps } from 'element-plus'
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  const uploadImageUrl = `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/picture`
  const formRef = ref<FormInstance>()

  const rules = computed<FormRules>(() => ({
    activity_title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    type: [{ required: true, message: '请选择公告所属类型', trigger: 'blur' }],
    activity_image: [{ required: true, message: '请上传标题图片', trigger: 'blur' }],
    is_index: [{ required: true, message: '请选择是否首页显示', trigger: 'blur' }],
    is_discover: [{ required: true, message: '请选择是否发现页显示', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
  }))
  const txt = computed(() => {
    return flag.value == 0 ? '查看' : flag.value == 1 ? '编辑' : '添加'
  })

  // 定义上传请求头
  const uploadHeaders = ref({
    Authorization: userStore.accessToken
  })

  // -1 add 0 view 1 edit
  const flag = ref(-1)
  const dialogVisible = ref(false)
  const formData = ref({
    id: 0,
    type: 1, //公告所属类型 :1平台公告 2专区公告
    special_area: 0,
    //所属专区id
    special_area_name: '', //专区名称
    activity_title: '', //标题
    activity_image: '', //活动图片
    is_index: 1, //是否首页显示0否 1是
    index_image: '', //首页图片
    is_discover: 0, //是否发现页显示 0否 1是
    discover_image: '', //发现页图片
    content: '', //内容
    activity_type: 0, //活动公告指向类型 1活动公告 2排行榜
    status: 1, //状态 0不启用 1启用
    sort: '', //排序号
    remark: '' // 备注
  })

  const confirm = () => {
    if (flag.value == 0) {
      dialogVisible.value = false
      return
    }
    formRef.value?.validate().then(() => {
      if (formData.value.id) {
        editAct(formData.value)
          .then(() => {
            ElMessage.success('编辑成功')
            resetForm()
          })
          .catch(() => {
            ElMessage.error('编辑失败')
          })
      } else {
        addAct(formData.value)
          .then(() => {
            ElMessage.success('添加成功')
            resetForm()
          })
          .catch(() => {
            ElMessage.error('添加失败')
          })
      }
    })
  }

  /**
   * 简化工具栏配置
   * 只包含基础的编辑功能
   */
  const simpleToolbarKeys = [
    'bold',
    'italic',
    'underline',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'insertLink',
    'insertImage',
    '|',
    'undo',
    'redo'
  ]
  const emit = defineEmits(['refresh'])
  const openDialog = (row: any) => {
    dialogVisible.value = true
    formRef.value?.resetFields()
    flag.value = row.flag
    if (row.id) {
      formData.value = row
    }
  }
  const resetForm = () => {
    dialogVisible.value = false
    formData.value = {
      id: 0,
      type: 1, //公告所属类型 :1平台公告 2专区公告
      special_area: 0,
      //所属专区id
      special_area_name: '', //专区名称
      activity_title: ' ', //标题
      activity_image: ' ', //活动图片
      is_index: 1, //是否首页显示0否 1是
      index_image: '', //首页图片
      is_discover: 0, //是否发现页显示 0否 1是
      discover_image: '', //发现页图片
      content: '', //内容
      activity_type: 0, //活动公告指向类型 1活动公告 2排行榜
      status: 1, //状态 0不启用 1启用
      sort: '', //排序号
      remark: '' // 备注
    }
    emit('refresh')
  }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.activity_image = response.data.file[0]
    }
  }

  const handleAvatarSuccess1: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.index_image = response.data.file[0]
    }
  }
  const handleAvatarSuccess2: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.discover_image = response.data.file[0]
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

<style lang="scss" scoped>
  :deep(.el-form-item--default) {
    margin-bottom: 15px !important;
  }

  :deep(.el-icon.avatar-uploader-icon) {
    width: 100px !important;
    height: 100px !important;
  }
</style>
