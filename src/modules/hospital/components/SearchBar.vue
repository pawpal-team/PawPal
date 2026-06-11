<template>
  <section class="search-bar" aria-label="醫院搜尋欄">
    <h2 class="search-bar__title">搜尋</h2>

    <label class="search-bar__search-field" for="hospital-search-input">
      <svg
        class="search-bar__search-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15.5 15.5L21 21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2" />
      </svg>
      <input id="hospital-search-input" type="text" placeholder="醫院名稱、地區、地址" />
    </label>

    <div class="search-bar__switches">
      <label class="search-bar__switch-row" for="focus-switch">
        <span>只顯示營業中</span>
        <input id="focus-switch" v-model="onlyOpen" type="checkbox" />
      </label>
      <label class="search-bar__switch-row" for="all-day-switch">
        <span>24 小時急診</span>
        <input id="all-day-switch" v-model="allDayEmergency" type="checkbox" />
      </label>
    </div>

    <div class="search-bar__filter">
      <h3 class="search-bar__filter-title">看診類別</h3>
      <div class="search-bar__chips" role="group" aria-label="看診類別篩選">
        <button
          v-for="category in categories"
          :key="category"
          class="search-bar__chip"
          :class="{ 'search-bar__chip--active': category === activeCategory }"
          type="button"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <p class="search-bar__summary">找到 <strong>5</strong> 間醫院</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const categories = [
  '全部',
  '24H 急診',
  '犬貓',
  '外科手術',
  '牙科',
  '預防醫學',
  '重症加護',
  '急救',
  '皮膚科',
  '異寵',
  '鳥類',
  '影像診斷',
  '心臟科',
]

const activeCategory = ref('全部')
const onlyOpen = ref(true)
const allDayEmergency = ref(false)
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 27.5rem;
  padding: 1.5rem 1.25rem;
  border-radius: 1rem;
  border: 1px solid #e3e7f7;
  background: #f7f8fe;
}

.search-bar__title {
  margin: 0 0 0.75rem;
  color: #2d3f96;
  font-size: 1rem;
  line-height: 1.5;
}

.search-bar__search-field {
  position: relative;
  display: block;
  margin-bottom: 1.25rem;
}

.search-bar__search-icon {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #a9b2db;
  pointer-events: none;
}

.search-bar__search-field input {
  width: 100%;
  height: 2rem;
  padding: 0 0.75rem 0 2rem;
  border: none;
  border-radius: 0.625rem;
  background: #edf0fa;
  color: #4f5e9d;
  font-size: 0.8125rem;
}

.search-bar__search-field input::placeholder {
  color: #8e97bd;
}

.search-bar__search-field input:focus-visible {
  outline: 2px solid #7f8fe2;
}

.search-bar__switches {
  display: grid;
  gap: 0.625rem;
  margin-bottom: 1.75rem;
}

.search-bar__switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: #4f5e9d;
  font-size: 0.875rem;
}

.search-bar__switch-row input {
  width: 2rem;
  height: 1.25rem;
  appearance: none;
  border-radius: 999px;
  background: #d6daec;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-bar__switch-row input::before {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s ease;
}

.search-bar__switch-row input:checked {
  background: #9fb0ff;
}

.search-bar__switch-row input:checked::before {
  transform: translateX(0.75rem);
}

.search-bar__filter-title {
  margin: 0 0 0.625rem;
  color: #2d3f96;
  font-size: 0.9375rem;
}

.search-bar__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4375rem;
}

.search-bar__chip {
  border: 1px solid #d5dcf7;
  border-radius: 999px;
  background: #f7f8fe;
  color: #4f5e9d;
  font-size: 0.75rem;
  line-height: 1.2;
  padding: 0.25rem 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-bar__chip:hover,
.search-bar__chip:focus-visible,
.search-bar__chip--active {
  border-color: #8a9af0;
  background: #e6ebff;
  color: #3a4ca5;
}

.search-bar__summary {
  margin: 1.75rem 0 0;
  color: #7c84a6;
  font-size: 0.875rem;
}

.search-bar__summary strong {
  color: #f4a300;
}

@media (max-width: 768px) {
  .search-bar {
    max-width: none;
    padding: 1rem;
  }

  .search-bar__chips {
    gap: 0.375rem;
  }
}
</style>
