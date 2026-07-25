<template>
  <v-container fluid class="pa-4">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        <v-icon icon="mdi-alert-circle-outline" color="warning" class="mr-2"></v-icon>
        重试任务列表
        <span class="text-sm text-grey ml-2">({{ total }} 个)</span>
      </v-card-title>
      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-btn color="primary" size="small" class="mr-2" @click="processAll">
              <v-icon icon="mdi-refresh" class="mr-1"></v-icon>
              全部重试
            </v-btn>
            <v-btn color="error" size="small" class="mr-2" @click="clearAll">
              <v-icon icon="mdi-delete" class="mr-1"></v-icon>
              清空全部
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-chip label="最小弹幕数: {{ minDanmuCount }}" size="small" class="mr-2"></v-chip>
            <v-chip label="最大重试: {{ maxRetryTimes }}次" size="small"></v-chip>
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="tasks"
          :items-per-page="10"
          :loading="loading"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.file_path="{ item }">
            <div class="text-truncate" :title="item.file_path">
              {{ getFileName(item.file_path) }}
            </div>
          </template>
          <template v-slot:item.error_type="{ item }">
            <v-chip :color="getErrorColor(item.error_type)" size="small">
              {{ getErrorLabel(item.error_type) }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon size="small" color="primary" @click="retrySingle(item.file_path)">
              <v-icon icon="mdi-refresh"></v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="removeSingle(item.file_path)">
              <v-icon icon="mdi-delete"></v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <div v-if="total === 0" class="text-center py-8 text-grey">
          <v-icon icon="mdi-check-circle" size="48" color="success"></v-icon>
          <p class="mt-2">暂无重试任务</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tasks = ref([])
const total = ref(0)
const minDanmuCount = ref(100)
const maxRetryTimes = ref(10)
const loading = ref(false)

const headers = [
  { text: '文件路径', value: 'file_path', width: '30%' },
  { text: '重试次数', value: 'retry_count', width: '10%' },
  { text: '上次尝试', value: 'last_attempt', width: '15%' },
  { text: '下次重试', value: 'next_retry_time', width: '15%' },
  { text: '错误类型', value: 'error_type', width: '10%' },
  { text: '弹幕数量', value: 'last_danmu_count', width: '10%' },
  { text: '操作', value: 'actions', width: '10%' }
]

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await fetch('/plugin/danmutv/retry_tasks', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await response.json()
    if (data.success) {
      tasks.value = Object.values(data.data.tasks || {})
      total.value = data.data.total || 0
      minDanmuCount.value = data.data.min_danmu_count || 100
      maxRetryTimes.value = data.data.max_retry_times || 10
    }
  } catch (error) {
    console.error('获取重试任务失败:', error)
  } finally {
    loading.value = false
  }
}

const processAll = async () => {
  try {
    await fetch('/plugin/danmutv/process_retry_tasks', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    await fetchTasks()
  } catch (error) {
    console.error('处理重试任务失败:', error)
  }
}

const clearAll = async () => {
  try {
    await fetch('/plugin/danmutv/clear_retry_tasks', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    await fetchTasks()
  } catch (error) {
    console.error('清空重试任务失败:', error)
  }
}

const retrySingle = async (filePath) => {
  try {
    const response = await fetch('/plugin/danmutv/generate_danmu', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      method: 'GET',
      body: new URLSearchParams({ file_path: filePath })
    })
    await fetchTasks()
  } catch (error) {
    console.error('重试单个任务失败:', error)
  }
}

const removeSingle = async (filePath) => {
  try {
    await fetch(`/plugin/danmutv/remove_retry_task?file_path=${encodeURIComponent(filePath)}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    await fetchTasks()
  } catch (error) {
    console.error('移除重试任务失败:', error)
  }
}

const getFileName = (filePath) => {
  return filePath.split('/').pop() || filePath
}

const getErrorLabel = (errorType) => {
  const labels = {
    'rate_limit': '限流',
    'network': '网络',
    'unknown': '未知'
  }
  return labels[errorType] || errorType
}

const getErrorColor = (errorType) => {
  const colors = {
    'rate_limit': 'warning',
    'network': 'error',
    'unknown': 'info'
  }
  return colors[errorType] || 'info'
}

onMounted(() => {
  fetchTasks()
})
</script>
