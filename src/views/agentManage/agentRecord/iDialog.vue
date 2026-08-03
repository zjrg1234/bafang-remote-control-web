<template>
  <el-dialog v-model="dialogVisible" :title="text" width="700px" @closed="handleDialogClosed">
    <!-- :before-close="handleClose" -->
    <div>
      <el-form
        :model="formData"
        label-position="right"
        label-suffix=":"
        ref="formRef"
        :rules="rules"
        label-width="135px"
      >
        <el-form-item label="代理商等级" prop="level">
          <el-select
            v-model="formData.level"
            :disabled="formData.flag == 0"
            placeholder="请选择代理商等级"
          >
            <el-option label="一级" :value="1" />
            <el-option label="二级" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item
          label="上级代理商"
          prop="superior_agent_id"
          :required="formData.level == 2"
          v-if="formData.flag != 0 && formData.level == 2"
        >
          <el-select v-model="formData.superior_agent_id" placeholder="请选择代理商等级">
            <el-option
              :value="(item as any).id"
              :label="(item as any).agent_name"
              v-for="(item, index) in agentList"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上级代理商" v-if="formData.flag == 0">
          <el-input v-model="formData.superior_agent_name" :disabled="formData.flag == 0" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone_number">
          <el-input
            v-model="formData.phone_number"
            :disabled="formData.flag == 0"
            placeholder="请输入手机号"
          />
        </el-form-item>

        <el-form-item label="昵称" prop="agent_name">
          <el-input
            v-model="formData.agent_name"
            :disabled="formData.flag == 0"
            placeholder="请输入昵称"
          />
        </el-form-item>
        <el-form-item label="头像" prop="head_shot" :required="formData.level == 1">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            ref="uploader"
            :show-file-list="false"
            :limit="1"
            :headers="uploadHeaders"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="formData.flag == 0"
            name="imageFile[]"
          >
            <img v-if="formData.head_shot" :src="formData.head_shot" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="余额" prop="balance" v-if="formData.flag == 0">
          <el-input
            v-model="formData.balance"
            :disabled="formData.flag == 0"
            placeholder="请输入余额"
          />
        </el-form-item>
        <el-form-item label="场地数量" v-if="formData.flag == 0">
          <el-input
            v-model="formData.venue_quantity"
            :disabled="formData.flag == 0"
            placeholder="请输入场地数量"
          />
        </el-form-item>
        <el-form-item label="可创建场地总数" prop="create_site_quantity">
          <el-input
            v-model="formData.create_site_quantity"
            :disabled="formData.flag == 0"
            placeholder="请输入可创建场地总数"
          />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input
            v-model="formData.sorting"
            :disabled="formData.flag == 0"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <el-form-item label="是否自营" prop="is_support">
          <el-radio-group v-model="formData.is_support" :disabled="formData.flag == 0">
            <el-radio label="1" :value="1">是</el-radio>
            <el-radio label="2" :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="app显示端" prop="type">
          <el-radio-group v-model="formData.type" :disabled="formData.flag == 0">
            <el-radio label="2" :value="3">全部</el-radio>
            <el-radio label="1" :value="1">IOS</el-radio>
            <el-radio label="2" :value="2">Android</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { agentCreate, agentUpdate, agentDetail, fetchList } from '@/api/agentManage'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps } from 'element-plus'
  import { ElButton, ElRadioGroup, type FormInstance, type FormRules } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()

  const uploadImageUrl = `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/picture`
  defineOptions({ name: 'AgentRecordDialog' })
  const formRef = ref<FormInstance>()
  const dialogVisible = ref(false)
  const formData = ref({
    id: 0,
    level: 1,
    superior_agent_name: '',
    superior_agent_id: '',
    phone_number: '',
    head_shot: '',
    create_site_quantity: '',
    sorting: '',
    is_support: 1,
    agent_name: '',
    flag: 0,
    first_handling_fee: '',
    company_handling_fee: '',
    balance: '',
    venue_quantity: '',
    type: ''
  })
  const uploader = ref()
  const rules = computed<FormRules>(() => {
    // 头像的自定义校验函数
    const validateHeadShot = (rule: any, value: any, callback: any) => {
      if (formData.value.level == 2) {
        callback()
      } else {
        if (!value) {
          callback(new Error('请上传头像'))
        } else {
          callback()
        }
      }
    }

    // 新增：上级代理商的自定义校验函数
    const validateSuperiorAgent = (rule: any, value: any, callback: any) => {
      // 只有当选中二级代理商（level === 2）时，上级代理商才必填
      if (formData.value.level == 2) {
        if (!value) {
          callback(new Error('请选择上级代理商'))
        } else {
          callback()
        }
      } else {
        // 不是二级代理商时，直接通过校验
        callback()
      }
    }

    return {
      level: [{ required: true, message: '请选择代理商等级', trigger: 'change' }],
      phone_number: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      create_site_quantity: [{ required: true, message: '请输入可创建场地总数', trigger: 'blur' }],
      is_support: [{ required: true, message: '请选择是否自营', trigger: 'change' }],
      head_shot: [{ validator: validateHeadShot, trigger: 'change' }],
      // 新增：上级代理商的校验规则
      superior_agent_id: [{ validator: validateSuperiorAgent, trigger: 'blur' }],
      agent_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      type: [{ required: true, message: '请选择app显示端', trigger: 'change' }]
    }
  })
  const agentList = ref([])
  // -1 add 0 view 1 edit
  const text = computed(() => {
    return formData.value.flag == -1 ? '新增' : formData.value.flag == 0 ? '查看' : '编辑'
  })

  // 定义上传请求头
  const uploadHeaders = ref({
    Authorization: userStore.accessToken
  })

  const openDialog = (row: any) => {
    dialogVisible.value = true
    // -1 add 0 view 1 edit
    formData.value = {
      id: 0,
      level: 1,
      superior_agent_id: '',
      phone_number: '',
      head_shot: '',
      create_site_quantity: '',
      sorting: '',
      is_support: 1,
      agent_name: '',
      flag: 0,
      first_handling_fee: '',
      company_handling_fee: '',
      balance: '',
      venue_quantity: '',
      superior_agent_name: '',
      type: ''
    }
    // add
    if (row.flag == -1) {
      formData.value.flag = -1
    }
    // edit
    if (row.flag != -1) {
      formData.value = { ...row }
    }
    if (row.flag == 0) {
      agentDetail({ id: formData.value.id })
        .then((res) => {
          if (res.code == 200) {
            formData.value = { ...res.data, flag: 0 }
            dialogVisible.value = true
          } else {
            ElMessage.error(res.msg)
          }
        })
        .catch((err) => {
          ElMessage.error(err.msg)
        })
    }

    fetchList({
      page: 1,
      size: 999,
      level: 1
    }).then((res) => {
      console.log(res.data.content)
      agentList.value = res.data.content || []
    })

    handleDialogClosed()
  }
  const emit = defineEmits(['refresh'])
  const resetForm = () => {
    dialogVisible.value = false
    emit('refresh')
  }

  const confirm = async (formRef: FormInstance | undefined) => {
    let res = {
      code: 1,
      msg: ''
    }
    if (formData.value.flag == 0) {
      dialogVisible.value = false
      return
    }
    if (!formRef) return
    await formRef.validate(async (valid: any) => {
      if (valid) {
        if (formData.value.flag == -1) {
          const raw = { ...formData.value }

          // 过滤掉不需要的字段（包括指定字段 + 所有以下划线开头的字段）
          const addFormData1 = Object.fromEntries(
            Object.entries(raw).filter(([key]) => {
              // 排除指定字段
              const excludeKeys = new Set([
                'first_handling_fee',
                'company_handling_fee',
                'balance',
                'venue_quantity',
                'flag',
                'id'
              ])
              // 同时排除以下划线开头的字段
              return !excludeKeys.has(key)
            })
          )
          res = await agentCreate(addFormData1)
        } else if (formData.value.flag == 1) {
          let obj = { ...formData.value }
          if (formData.value.level == 1) {
            obj.superior_agent_id = ''
            obj.superior_agent_name = '掌控视界'
          }
          res = await agentUpdate(obj)
        }
        if (formData.value.flag != 0) {
          if (res.code == 200) {
            ElMessage.success('操作成功')
            resetForm()
          } else {
            ElMessage.error(res.msg)
          }
        }
      }
    })
  }

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code == 200) {
      formData.value.head_shot = response.data.file[0]
    }
    uploader.value.clearFiles()
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

  const handleDialogClosed = () => {
    nextTick(() => {
      // 安全判断 formRef 是否存在
      if (formRef.value) {
        formRef.value.clearValidate()
      }
    })
  }
  defineExpose({
    openDialog
  })
</script>

<style scoped lang="scss">
  :deep(.el-icon.avatar-uploader-icon) {
    width: 130px;
    height: 130px;
  }
</style>
