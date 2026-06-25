<script setup>
import { ref } from 'vue'
const emit = defineEmits(['login'])
const email = ref('')
const password = ref('')

function handleSubmit() {
  emit('login', { email: email.value, password: password.value })
}
</script>

<template>
  <main class="login-form-page flex h-full items-center justify-center px-4 py-8 my-10">
    <form
      class="w-full max-w-[360px] rounded-[18px] bg-white px-8 py-7 shadow-[0_10px_35px_rgba(31,41,55,0.16)]"
      action="submit"
      @submit.prevent="handleSubmit"
    >
      <header class="mb-7 flex flex-col items-center text-center">
        <h1 class="text-[22px] font-bold leading-tight text-brand-navy">歡迎回來</h1>
        <p class="mt-2 text-[13px] font-normal leading-relaxed text-brand-gray">
          登入以查看寵物健康提醒與行事曆
        </p>
      </header>

      <div class="space-y-4">
        <label class="block">
          <span class="mb-2 block text-[13px] font-bold text-brand-navy">Email</span>
          <input
            class="h-11 w-full rounded-xl border-0 bg-[#F3F4F8] px-4 text-[14px] font-medium text-brand-navy outline-none transition placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-blue"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            v-model="email"
          />
        </label>

        <label class="block">
          <span class="mb-2 block text-[13px] font-bold text-brand-navy">密碼</span>
          <input
            class="h-11 w-full rounded-xl border-0 bg-[#F3F4F8] px-4 text-[14px] font-medium text-brand-navy outline-none transition placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-blue"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            v-model="password"
          />
        </label>
      </div>

      <button
        class="mt-5 h-11 w-full rounded-xl bg-brand-blue text-[14px] font-bold text-brand-white shadow-[0_8px_18px_rgba(146,168,245,0.36)] transition hover:bg-[#7F97EC] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        type="submit"
      >
        登入
      </button>

      <div class="my-6 flex items-center gap-3">
        <span class="h-px flex-1 bg-[#DDE5FC]"></span>
        <span class="text-[12px] font-medium text-brand-gray">或使用以下方式登入</span>
        <span class="h-px flex-1 bg-[#DDE5FC]"></span>
      </div>

      <div class="flex items-center justify-center gap-5">
        <button
          class="grid h-12 w-12 place-items-center rounded-full bg-white text-[20px] font-bold shadow-[0_4px_14px_rgba(31,41,55,0.13)] ring-1 ring-[#DDE5FC] transition active:scale-110 active:shadow-[0_7px_18px_rgba(31,41,55,0.16)] lg:hover:scale-110 lg:hover:shadow-[0_7px_18px_rgba(31,41,55,0.16)]"
          type="button"
          aria-label="使用 Google 登入"
        >
          <span><img src="https://assets.5xcampus.com/icons/google.svg" alt="google" /></span>
        </button>
        <button
          class="grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_4px_14px_rgba(31,41,55,0.13)] ring-1 ring-[#DDE5FC] transition active:scale-110 active:shadow-[0_7px_18px_rgba(31,41,55,0.16)] lg:hover:scale-110 lg:hover:shadow-[0_7px_18px_rgba(31,41,55,0.16)]"
          type="button"
          aria-label="使用 Apple 登入"
        >
          <img src="@/assets/icons/apple.svg" alt="apple" class="w-7" />
        </button>
        <button
          class="grid h-12 w-12 place-items-center rounded-full bg-white text-[10px] font-black text-[#06c755] shadow-[0_4px_14px_rgba(31,41,55,0.13)] ring-1 ring-[#DDE5FC] transition active:scale-110 active:shadow-[0_7px_18px_rgba(31,41,55,0.16)] lg:hover:scale-110 lg:hover:shadow-[0_7px_18px_rgba(31,41,55,0.16)]"
          type="button"
          aria-label="使用 LINE 登入"
        >
          LINE
        </button>
      </div>

      <div class="mt-7 flex items-center justify-center gap-3 text-[13px] font-bold">
        <RouterLink
          class="text-brand-orange transition active:text-[#E89000] lg:hover:text-[#E89000]"
          to="/register"
          >註冊帳號</RouterLink
        >
        <span class="text-[#DDE5FC]">・</span>
        <RouterLink
          class="text-brand-gray transition active:text-brand-navy lg:hover:text-brand-navy"
          to="/forgot-password"
          >忘記密碼</RouterLink
        >
      </div>
    </form>
  </main>
</template>
