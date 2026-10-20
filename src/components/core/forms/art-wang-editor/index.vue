<!-- WangEditor 富文本编辑器 插件地址：https://www.wangeditor.com/ -->
<template>
  <div class="editor-wrapper">
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :mode="mode"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      :style="{ height: height, overflowY: 'hidden' }"
      v-model="modelValue"
      :mode="mode"
      :defaultConfig="editorConfig"
      @onCreated="onCreateEditor"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'
  import { onBeforeUnmount, onMounted, shallowRef, computed } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { useUserStore } from '@/store/modules/user'
  import EmojiText from '@/utils/ui/emojo'
  import { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
  import axios from 'axios' // 确保引入了 axios，或者用你封装的 request 实例

  defineOptions({ name: 'ArtWangEditor' })

  // Props 定义
  interface Props {
    /** 编辑器高度 */
    height?: string
    /** 自定义工具栏配置 */
    toolbarKeys?: string[]
    /** 插入新工具到指定位置 */
    insertKeys?: { index: number; keys: string[] }
    /** 排除的工具栏项 */
    excludeKeys?: string[]
    /** 编辑器模式 */
    mode?: 'default' | 'simple'
    /** 占位符文本 */
    placeholder?: string
    /** 上传配置 */
    uploadConfig?: {
      maxFileSize?: number
      maxNumberOfFiles?: number
      server?: string
    }
  }

  const props = withDefaults(defineProps<Props>(), {
    height: '500px',
    mode: 'default',
    placeholder: '请输入内容...',
    excludeKeys: () => ['fontFamily']
  })

  const modelValue = defineModel<string>({ required: true })

  // 编辑器实例
  const editorRef = shallowRef<IDomEditor>()
  const userStore = useUserStore()

  // 常量配置
  const DEFAULT_UPLOAD_CONFIG = {
    maxFileSize: 3 * 1024 * 1024, // 3MB
    maxNumberOfFiles: 10,
    fieldName: 'imageFile[]',
    allowedFileTypes: ['image/*']
  } as const

  // 图标映射配置
  const ICON_MAP = {
    bold: '&#xe630;',
    blockquote: '&#xe61c;',
    underline: '&#xe65a;',
    italic: '&#xe638;',
    'group-more-style': '&#xe648;',
    color: '&#xe68c;',
    bgColor: '&#xe691;',
    bulletedList: '&#xe64e;',
    numberedList: '&#xe66c;',
    todo: '&#xe641;',
    'group-justify': '&#xe67e;',
    'group-indent': '&#xe63e;',
    emotion: '&#xe690;',
    insertLink: '&#xe63a;',
    'group-image': '&#xe634;',
    insertTable: '&#xe67b;',
    codeBlock: '&#xe68b;',
    divider: '&#xe66d;',
    undo: '&#xe65e;',
    redo: '&#xe659;',
    fullScreen: '&#xe633;',
    tableFullWidth: '&#xe67b;'
  } as const

  // 计算属性：上传服务器地址
  const uploadServer = computed(
    () => `${import.meta.env.VITE_API_PROXY_URL}/backend/upload/picture`
  )

  // 合并上传配置
  const mergedUploadConfig = computed(() => ({
    ...DEFAULT_UPLOAD_CONFIG,
    ...props.uploadConfig
  }))

  // 工具栏配置
  const toolbarConfig = computed((): Partial<IToolbarConfig> => {
    const config: Partial<IToolbarConfig> = {}

    // 完全自定义工具栏
    if (props.toolbarKeys && props.toolbarKeys.length > 0) {
      config.toolbarKeys = props.toolbarKeys
    }

    // 插入新工具
    if (props.insertKeys) {
      config.insertKeys = props.insertKeys
    }

    // 排除工具
    if (props.excludeKeys && props.excludeKeys.length > 0) {
      config.excludeKeys = props.excludeKeys
    }

    return config
  })

  // 编辑器配置
  const editorConfig = computed((): Partial<IEditorConfig> => {
    // 处理 token 拼接
    const token = userStore.accessToken
    const authHeader = token ? (token.startsWith('Bearer ') ? token : `Bearer ${token}`) : ''

    return {
      placeholder: props.placeholder,
      MENU_CONF: {
        uploadImage: {
          // 改用 customUpload，完全接管上传逻辑
          async customUpload(
            file: File,
            insertFn: (url: string, alt: string, href: string) => void
          ) {
            console.log(
              '【开始上传】当前文件:',
              file.name,
              '大小:',
              (file.size / 1024 / 1024).toFixed(2) + 'MB'
            )

            // 1. 自己在前端做一次大小和类型校验（防止被静默拦截）
            const maxSize = mergedUploadConfig.value.maxFileSize
            if (maxSize && file.size > maxSize) {
              ElMessage.error(`图片大小不能超过 ${maxSize / 1024 / 1024}MB`)
              return
            }

            try {
              const formData = new FormData()
              // 【关键】这里的字段名必须和后端接收的字段名完全一致！
              // 如果后端写的是 @RequestParam("file")，这里就写 'file'
              // 如果是 @RequestParam("imageFile[]")，这里就写 'imageFile[]'
              formData.append(mergedUploadConfig.value.fieldName, file)

              // 2. 发起请求
              console.log('【发起请求】URL:', uploadServer.value)
              const res = await axios.post(uploadServer.value, formData, {
                headers: {
                  Authorization: userStore.accessToken
                }
              })

              console.log('【请求成功】后端返回数据:', res.data)

              const imgUrl = res.data.data?.file[0]
              if (imgUrl && typeof imgUrl === 'string') {
                // 4. 手动插入图片
                insertFn(imgUrl, file.name, '')
                ElMessage.success('图片上传成功')
              } else {
                console.error('❌ 解析图片地址失败，请检查返回结构:', res.data)
                ElMessage.error('上传成功，但解析图片地址失败')
              }
            } catch (error: any) {
              console.error('【请求失败】错误详情:', error)
              // 打印具体的错误状态码和报错信息
              if (error.response) {
                console.error('状态码:', error.response.status)
                console.error('响应数据:', error.response.data)
                ElMessage.error(
                  `上传失败 (${error.response.status}): ${error.response.data?.message || '服务器错误'}`
                )
              } else if (error.request) {
                console.error('无响应，可能是跨域或网络断开')
                ElMessage.error('上传失败：网络错误或跨域被拦截')
              } else {
                ElMessage.error('上传失败：请求配置错误')
              }
            }
          }
        }
      }
    }
  })

  // 编辑器创建回调
  const onCreateEditor = (editor: IDomEditor) => {
    editorRef.value = editor

    // 监听全屏事件
    editor.on('fullScreen', () => {
      console.log('编辑器进入全屏模式')
    })

    // 确保在编辑器创建后应用自定义图标
    applyCustomIcons()
  }

  // 优化的图标替换函数 - 针对特定编辑器实例
  const overrideIcons = (editorInstance: IDomEditor) => {
    // 获取当前编辑器的工具栏容器
    const editorContainer = editorInstance.getEditableContainer().closest('.editor-wrapper')
    if (!editorContainer) return

    const toolbar = editorContainer.querySelector('.w-e-toolbar')
    if (!toolbar) return

    Object.entries(ICON_MAP).forEach(([menuKey, iconCode]) => {
      const button = toolbar.querySelector(`button[data-menu-key="${menuKey}"]`)
      if (button) {
        button.innerHTML = `<i class='iconfont-sys'>${iconCode}</i>`
      }
    })
  }

  // 应用自定义图标（带重试机制）
  const applyCustomIcons = () => {
    let retryCount = 0
    const maxRetries = 10
    const retryDelay = 100

    const tryApplyIcons = () => {
      const editor = editorRef.value
      if (!editor) {
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(tryApplyIcons, retryDelay)
        }
        return
      }

      // 获取当前编辑器的工具栏容器
      const editorContainer = editor.getEditableContainer().closest('.editor-wrapper')
      if (!editorContainer) {
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(tryApplyIcons, retryDelay)
        }
        return
      }

      const toolbar = editorContainer.querySelector('.w-e-toolbar')
      const toolbarButtons = editorContainer.querySelectorAll('.w-e-bar-item button[data-menu-key]')

      if (toolbar && toolbarButtons.length > 0) {
        overrideIcons(editor)
        return
      }

      // 如果工具栏还没渲染完成，继续重试
      if (retryCount < maxRetries) {
        retryCount++
        setTimeout(tryApplyIcons, retryDelay)
      } else {
        console.warn('工具栏渲染超时，无法应用自定义图标 - 编辑器实例:', editor.id)
      }
    }

    // 使用 requestAnimationFrame 确保在下一帧执行
    requestAnimationFrame(tryApplyIcons)
  }

  // 暴露编辑器实例和方法
  defineExpose({
    /** 获取编辑器实例 */
    getEditor: () => editorRef.value,
    /** 设置编辑器内容 */
    setHtml: (html: string) => editorRef.value?.setHtml(html),
    /** 获取编辑器内容 */
    getHtml: () => editorRef.value?.getHtml(),
    /** 清空编辑器 */
    clear: () => editorRef.value?.clear(),
    /** 聚焦编辑器 */
    focus: () => editorRef.value?.focus()
  })

  // 生命周期
  onMounted(() => {
    // 图标替换已在 onCreateEditor 中处理
  })

  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor) {
      editor.destroy()
    }
  })
</script>

<style lang="scss">
  @use './style';
</style>
