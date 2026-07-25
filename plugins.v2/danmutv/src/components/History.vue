<template>
  <v-container fluid class="pa-4">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        <v-icon icon="mdi-history" color="primary" class="mr-2"></v-icon>
        历史记录
        <span class="text-sm text-grey ml-2">({{ total }} 条)</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="history"
          :items-per-page="10"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:item.timestamp="{ item }">
            {{ formatTime(item.timestamp) }}
          </template>
          <template v-slot:item.type="{ item }">
            <v-chip :color="getTypeColor(item.type)" size="small">
              {{ getTypeLabel(item.type) }}
            </v-chip>
          </template>
          <template v-slot:item.path="{ item }">
            <div class="text-truncate" :title="item.path">
              {{ item.path }}
            </div>
          </template>
          <template v-slot:item.result="{ item }">
            <span class="text-success">成功 {{ item.success }}</span>
            <span class="mx-2">/</span>
            <span class="text-error">失败 {{ item.failed }}</span>
          </template>
          <template v-slot:item.duration="{ item }">
            {{ formatDuration(item.duration) }}
          </template>
          <template v-slot:expanded-item="{ item }">
            <td colspan="7">
              <div v-if="item.details && item.details.length > 0">
                <v-data-table
                  :headers="detailHeaders"
                  :items="item.details"
                  hide-default-footer
                  class="elevation-0"
                >
                  <template v-slot:item.result="{ item }">
                    <v-icon :icon="item.result === 'success' ? 'mdi-check-circle' : 'mdi-close-circle'" 
                             :color="item.result === 'success' ? 'success' : 'error'" 
                             size="small"></v-icon>
                  </template>
                </v-data-table>
              </div>
              <div v-else class="text-grey text-sm">暂无详情</div>
            </td>
          </template>
        </v-data-table>

        <div v-if="total === 0" class="text-center py-8 text-grey">
          <v-icon icon="mdi-history" size="48"></v-icon>
          <p class="mt-2">暂无历史记录</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const history = ref([])
const total = ref(0)
const loading = ref(false)

const headers = [
  { text: '时间', value: 'timestamp', width: '18%' },
  { text: '类型', value: 'type', width: '10%' },
  { text: '路径', value: 'path', width: '30%' },
  { text: '处理数', value: 'processed', width: '10%' },
  { text: '结果', value: 'result', width: '15%' },
  { text: '耗时', value: 'duration', width: '10%' }
]

const detailHeaders = [
  { text: '文件', value: 'file', width: '70%' },
  { text: '结果', value: 'result', width: '15%' },
  { text: '弹幕数', value: 'danmu_count', width: '15%' }
]

const fetchHistory = async () => {
  loading.value = true
  try {
    const response = await fetch('/plugin/danmutv/history', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await response.json()
    if (data.success) {
      history.value = data.data.history || []
      total.value = data.data.total || 0
    }
  } catch (error) {
    console.error('获取历史记录失败:', error)
  } finally {
    loading.value = false
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleString('zh-CN')
}

const formatDuration = (seconds) => {
  if (!seconds) return '0秒'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`
}

const getTypeLabel = (type) => {
  const labels = {
    'batch': '批量刮削',
    'single': '单文件刮削',
    'retry': '重试任务'
  }
  return labels[type] || type
}

const getTypeColor = (type) => {
  const colors = {
    'batch': 'primary',
    'single': 'info',
    'retry': 'warning'
  }
  return colors[type] || 'info'
}

onMounted(() => {
  fetchHistory()
})
</script>
