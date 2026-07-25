<template>
  <v-container fluid class="pa-4">
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card class="status-card">
          <v-card-title class="text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5">
            <v-icon icon="mdi-information" color="primary" size="small" class="mr-2"></v-icon>
            插件状态
          </v-card-title>
          <v-card-text class="px-3 py-2">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <div class="status-item d-flex align-center py-2">
                  <v-icon :icon="enabled ? 'mdi-check-circle' : 'mdi-close-circle'" 
                           :color="enabled ? 'success' : 'error'" 
                           size="small" class="mr-3"></v-icon>
                  <div class="status-content flex-grow-1">
                    <div class="text-subtitle-2">插件状态</div>
                    <div class="text-caption text-grey">{{ enabled ? '已启用' : '未启用' }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="status-item d-flex align-center py-2">
                  <v-icon :icon="apiConnected ? 'mdi-web' : 'mdi-web-off'" 
                           :color="apiConnected ? 'success' : 'error'" 
                           size="small" class="mr-3"></v-icon>
                  <div class="status-content flex-grow-1">
                    <div class="text-subtitle-2">API状态</div>
                    <div class="text-caption text-grey">{{ apiConnected ? '正常' : '异常' }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="status-item d-flex align-center py-2">
                  <v-icon icon="mdi-file-video" size="small" color="primary" class="mr-3"></v-icon>
                  <div class="status-content flex-grow-1">
                    <div class="text-subtitle-2">总文件数</div>
                    <div class="text-caption text-grey">{{ stats.total_files }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="status-item d-flex align-center py-2">
                  <v-icon icon="mdi-alert-circle-outline" size="small" color="warning" class="mr-3"></v-icon>
                  <div class="status-content flex-grow-1">
                    <div class="text-subtitle-2">重试任务</div>
                    <div class="text-caption text-grey">{{ stats.retry_tasks_count }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <v-card flat class="rounded border">
          <v-card-title class="text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5">
            <v-icon icon="mdi-chart-bar" color="primary" size="small" class="mr-2"></v-icon>
            统计信息
          </v-card-title>
          <v-card-text class="px-3 py-2">
            <v-row>
              <v-col cols="12" sm="4">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">成功刮削</span>
                  <span class="text-body-2 font-bold text-success">{{ stats.success_count }}</span>
                </div>
                <v-progress-linear :value="stats.total_files > 0 ? (stats.success_count / stats.total_files * 100) : 0" 
                                   color="success" class="mt-2"></v-progress-linear>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">失败/重试</span>
                  <span class="text-body-2 font-bold text-warning">{{ stats.failed_count }}</span>
                </div>
                <v-progress-linear :value="stats.total_files > 0 ? (stats.failed_count / stats.total_files * 100) : 0" 
                                   color="warning" class="mt-2"></v-progress-linear>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">成功率</span>
                  <span class="text-body-2 font-bold">{{ stats.total_files > 0 ? Math.round(stats.success_count / stats.total_files * 100) : 0 }}%</span>
                </div>
                <v-progress-linear :value="stats.total_files > 0 ? (stats.success_count / stats.total_files * 100) : 0" 
                                   color="primary" class="mt-2"></v-progress-linear>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card flat class="rounded border">
          <v-card-title class="text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5">
            <v-icon icon="mdi-clock-outline" color="primary" size="small" class="mr-2"></v-icon>
            计划任务
          </v-card-title>
          <v-card-text class="px-3 py-2">
            <v-row>
              <v-col cols="12">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">下次重试时间</span>
                  <span v-if="nextRetryTime" class="text-body-2 font-bold text-primary">{{ nextRetryTime }}</span>
                  <span v-else class="text-body-2 text-grey">暂无重试任务</span>
                </div>
              </v-col>
              <v-col cols="12" class="mt-4">
                <v-btn color="primary" size="small" class="mr-2" @click="triggerRetry">
                  <v-icon icon="mdi-refresh" class="mr-1"></v-icon>
                  立即重试
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="rounded border">
          <v-card-title class="text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5">
            <v-icon icon="mdi-history" color="primary" size="small" class="mr-2"></v-icon>
            最近运行
          </v-card-title>
          <v-card-text class="px-3 py-2">
            <v-row v-if="lastRun">
              <v-col cols="12">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">时间</span>
                  <span class="text-body-2 font-bold">{{ formatTime(lastRun.timestamp) }}</span>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">类型</span>
                  <span class="text-body-2 font-bold">{{ getTypeLabel(lastRun.type) }}</span>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">结果</span>
                  <span class="text-body-2">成功 {{ lastRun.success }} / 失败 {{ lastRun.failed }}</span>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="flex items-center justify-between">
                  <span class="text-body-1">耗时</span>
                  <span class="text-body-2">{{ formatDuration(lastRun.duration) }}</span>
                </div>
              </v-col>
            </v-row>
            <div v-else class="text-center text-grey">
              暂无运行记录
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="scrapingStatus.running">
      <v-col cols="12">
        <v-card class="bg-primary-lighten-5">
          <v-card-title class="text-caption d-flex align-center px-3 py-2">
            <v-icon icon="mdi-loader" color="primary" size="small" class="mr-2 animate-spin"></v-icon>
            正在刮削中
          </v-card-title>
          <v-card-text class="px-3 py-2">
            <v-progress-linear :value="scrapingStatus.total > 0 ? (scrapingStatus.processed / scrapingStatus.total * 100) : 0" 
                               color="primary" height="8"></v-progress-linear>
            <div class="flex justify-between mt-2">
              <span>当前文件: {{ scrapingStatus.current_file }}</span>
              <span>{{ scrapingStatus.processed }} / {{ scrapingStatus.total }}</span>
            </div>
            <div class="flex justify-between">
              <span>成功: {{ scrapingStatus.success }} | 失败: {{ scrapingStatus.failed }}</span>
              <span>耗时: {{ formatDuration(scrapingStatus.duration) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  api: { 
    type: [Object, Function],
    required: true,
  }
})

const enabled = ref(false)
const apiConnected = ref(false)
const apiMessage = ref('')
const stats = ref({ total_files: 0, success_count: 0, failed_count: 0, retry_tasks_count: 0 })
const nextRetryTime = ref(null)
const lastRun = ref(null)
const scrapingStatus = ref({ running: false, total: 0, processed: 0, success: 0, failed: 0, current_file: null, duration: 0 })

let refreshInterval = null

const fetchStatus = async () => {
  try {
    const data = await props.api.get('plugin/DanmuTV/full_status');
    if (data && data.success) {
      const result = data.data
      enabled.value = result.enabled
      apiConnected.value = result.api_connected
      apiMessage.value = result.api_message
      stats.value = result.stats
      nextRetryTime.value = result.next_retry_time
      lastRun.value = result.last_run
      scrapingStatus.value = {
        running: result.running,
        total: result.total,
        processed: result.processed,
        success: result.success,
        failed: result.failed,
        current_file: result.current_file,
        duration: result.duration
      }
    }
  } catch (error) {
    console.error('获取状态失败:', error)
  }
}

const triggerRetry = async () => {
  try {
    await props.api.get('plugin/DanmuTV/process_retry_tasks')
    await fetchStatus()
  } catch (error) {
    console.error('触发重试失败:', error)
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
  const labels = { 'batch': '批量刮削', 'single': '单文件刮削', 'retry': '重试任务' }
  return labels[type] || type
}

onMounted(() => {
  fetchStatus()
  refreshInterval = setInterval(fetchStatus, 5000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<style scoped>
.bg-primary-lighten-5 {
  background-color: rgba(var(--v-theme-primary), 0.07);
}

.border {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.status-card {
  background-image: linear-gradient(to right, rgba(var(--v-theme-surface), 0.98), rgba(var(--v-theme-surface), 0.95)), 
                    repeating-linear-gradient(45deg, rgba(var(--v-theme-primary), 0.03), rgba(var(--v-theme-primary), 0.03) 10px, transparent 10px, transparent 20px);
  background-attachment: fixed;
  box-shadow: 0 1px 2px rgba(var(--v-border-color), 0.05) !important;
  transition: all 0.3s ease;
}

.status-card:hover {
  box-shadow: 0 3px 6px rgba(var(--v-border-color), 0.1) !important;
}

.status-item {
  border-radius: 8px;
  transition: all 0.2s ease;
  padding: 0.5rem;
  margin-bottom: 4px;
}

.status-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.03);
}

.text-subtitle-2 {
  font-size: 14px !important;
  font-weight: 500;
  margin-bottom: 2px;
}
</style>
