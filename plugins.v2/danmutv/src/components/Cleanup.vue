<template>
  <v-container fluid class="pa-4">
    <v-card flat class="rounded border status-card">
      <v-card-title class="text-caption d-flex align-center px-3 py-2 bg-primary-lighten-5">
        <v-icon icon="mdi-delete-sweep" color="error" size="small" class="mr-2"></v-icon>
        孤儿字幕清理
      </v-card-title>
      <v-card-text class="px-3 py-2">
        <v-row class="mb-3">
          <v-col cols="12">
            <v-chip label="扫描路径:" size="small" class="mr-2"></v-chip>
            <span class="text-caption text-grey">{{ scanPath || '未配置' }}</span>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" sm="6">
            <v-btn color="primary" size="small" class="mr-2" @click="scanOrphanSubtitles" :loading="scanning">
              <v-icon icon="mdi-search" class="mr-1"></v-icon>
              扫描孤儿字幕
            </v-btn>
            <v-btn color="error" size="small" class="mr-2" @click="cleanSelected" :disabled="!selectedPaths.length" :loading="cleaning">
              <v-icon icon="mdi-delete" class="mr-1"></v-icon>
              清理选中 ({{ selectedPaths.length }})
            </v-btn>
            <v-btn color="info" size="small" @click="selectAll" :disabled="!orphanSubtitles.length">
              <v-icon icon="mdi-check-all" class="mr-1"></v-icon>
              全选
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-chip v-if="totalFound > 0" label="找到: {{ totalFound }} 个" size="small" class="mr-2"></v-chip>
            <v-chip v-if="cleanedCount > 0" label="已清理: {{ cleanedCount }} 个" size="small"></v-chip>
          </v-col>
        </v-row>

        <div v-if="scanning" class="text-center py-8">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <p class="mt-2">正在扫描...</p>
        </div>

        <v-data-table
          v-else
          :headers="headers"
          :items="orphanSubtitles"
          :items-per-page="10"
          :loading="loading"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.select="{ item }">
            <v-checkbox
              :value="item.path"
              v-model="selectedPaths"
              hide-details
            ></v-checkbox>
          </template>
          <template v-slot:item.path="{ item }">
            <div class="text-truncate" :title="item.path">
              {{ getFileName(item.path) }}
            </div>
          </template>
          <template v-slot:item.size="{ item }">
            {{ formatSize(item.size) }}
          </template>
          <template v-slot:item.modified_time="{ item }">
            {{ item.modified_time }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon size="small" color="error" @click="cleanSingle(item.path)">
              <v-icon icon="mdi-delete"></v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <div v-if="!scanning && totalFound === 0 && !loading" class="text-center py-8 text-grey">
          <v-icon icon="mdi-check-circle" size="48" color="success"></v-icon>
          <p class="mt-2">没有找到孤儿字幕文件</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  api: { 
    type: [Object, Function],
    required: true,
  }
})

const orphanSubtitles = ref([])
const totalFound = ref(0)
const cleanedCount = ref(0)
const selectedPaths = ref([])
const scanning = ref(false)
const cleaning = ref(false)
const loading = ref(false)
const scanPath = ref('')

const headers = [
  { text: '', value: 'select', width: '5%' },
  { text: '文件路径', value: 'path', width: '50%' },
  { text: '大小', value: 'size', width: '15%' },
  { text: '修改时间', value: 'modified_time', width: '20%' },
  { text: '操作', value: 'actions', width: '10%' }
]

const scanOrphanSubtitles = async () => {
  scanning.value = true
  selectedPaths.value = []
  try {
    const data = await props.api.get('plugin/DanmuTV/scan_orphan_subtitles')
    if (data && data.success) {
      orphanSubtitles.value = data.data.orphan_subtitles || []
      totalFound.value = data.data.total_found || 0
      scanPath.value = data.data.scan_path || ''
    }
  } catch (error) {
    console.error('扫描孤儿字幕失败:', error)
  } finally {
    scanning.value = false
  }
}

const fetchScanPath = async () => {
  try {
    const data = await props.api.get('plugin/DanmuTV/get_config')
    if (data && data.success) {
      scanPath.value = data.data.path || ''
    }
  } catch (error) {
    console.error('获取配置失败:', error)
  }
}

const cleanSingle = async (filePath) => {
  try {
    const data = await props.api.post('plugin/DanmuTV/clean_orphan_subtitles', [filePath])
    if (data && data.success) {
      cleanedCount.value += data.data.cleaned_count || 0
      orphanSubtitles.value = orphanSubtitles.value.filter(item => item.path !== filePath)
      totalFound.value = orphanSubtitles.value.length
    }
  } catch (error) {
    console.error('清理字幕文件失败:', error)
  }
}

const cleanSelected = async () => {
  if (!selectedPaths.value.length) return
  cleaning.value = true
  try {
    const data = await props.api.post('plugin/DanmuTV/clean_orphan_subtitles', selectedPaths.value)
    if (data && data.success) {
      cleanedCount.value += data.data.cleaned_count || 0
      orphanSubtitles.value = orphanSubtitles.value.filter(item => !selectedPaths.value.includes(item.path))
      totalFound.value = orphanSubtitles.value.length
      selectedPaths.value = []
    }
  } catch (error) {
    console.error('清理选中字幕失败:', error)
  } finally {
    cleaning.value = false
  }
}

const selectAll = () => {
  if (selectedPaths.value.length === orphanSubtitles.value.length) {
    selectedPaths.value = []
  } else {
    selectedPaths.value = orphanSubtitles.value.map(item => item.path)
  }
}

const getFileName = (filePath) => {
  return filePath.split('/').pop() || filePath
}

const formatSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

onMounted(() => {
  fetchScanPath()
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
</style>
