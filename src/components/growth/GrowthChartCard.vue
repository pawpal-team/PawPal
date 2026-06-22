<script setup>
import { computed } from 'vue'
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

import { growthRecords } from '@/data/growthRecords.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const uiConfig = {
  weight: { type: 'line', color: '#ffa002' },
  food_intake: { type: 'bar', color: '#10B981' },
  water_frequency: { type: 'bar', color: '#92a8f5' },
  urination: { type: 'bar', color: '#ff66cc' },
  defecation: { type: 'bar', color: '#8B5CF6' },
}

const displayRecords = computed(() => {
  return growthRecords
    .map((record) => ({
      ...record,
      chartType: uiConfig[record.metric_type]?.type || 'line',
      themeColor: uiConfig[record.metric_type]?.color || '#cbd5e1',
    }))
    .filter((record) => {
      return record.history.some((item) => item.value > 0)
    })
})
const getChartData = (record) => {
  return {
    labels: record.history.map((item) => item.date),
    datasets: [
      {
        data: record.history.map((item) => item.value),
        borderColor: record.themeColor,
        backgroundColor: `${record.themeColor}25`,
        borderWidth: 2,
        pointBackgroundColor: record.themeColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
        tension: 0.4,
        borderRadius: record.chartType === 'bar' ? 4 : 0,
      },
    ],
  }
}
const getChartOptions = (record) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E293B',
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94A3B8', font: { size: 12 } },
    },
    y: {
      beginAtZero: record.chartType === 'bar',
      grid: { color: '#F1F5F9', borderDash: [5, 5] },
      ticks: { color: '#94A3B8', font: { size: 12 } },
    },
  },
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full p-4">
    <div
      v-for="record in displayRecords"
      :key="record.metric_type"
      class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col h-full"
      :class="{ 'md:col-span-2': record.metric_type === 'weight' }"
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full"
            :style="{ backgroundColor: record.themeColor }"
          ></span>
          <h3 class="text-brand-navy font-bold text-base">{{ record.metric }}</h3>
        </div>
        <div class="text-right flex flex-col items-end">
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-medium tracking-wider" :style="{ color: record.themeColor }">
              {{ record.currentValue }}
            </span>
            <span class="text-brand-gray text-sm font-medium">{{ record.unit }}</span>
          </div>
        </div>
      </div>
      <div class="relative w-full h-48 mt-auto">
        <Line
          v-if="record.chartType === 'line'"
          :data="getChartData(record)"
          :options="getChartOptions(record)"
        />
        <Bar v-else :data="getChartData(record)" :options="getChartOptions(record)" />
      </div>
    </div>
  </div>
</template>
