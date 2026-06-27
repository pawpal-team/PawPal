<template>
  <main class="login-form-page my-10 flex h-full items-center justify-center px-4 py-8">
    <form
      class="w-full max-w-[360px] rounded-[18px] bg-white px-8 py-7 shadow-[0_10px_35px_rgba(31,41,55,0.16)]"
      action="submit"
    >
      <header class="mb-8 flex flex-col items-center text-center">
        <h1 class="text-[22px] font-bold leading-tight text-brand-navy">忘記密碼</h1>
        <p class="mt-2 text-[13px] font-normal leading-relaxed text-brand-gray">
          輸入註冊信箱，我們將寄出重設連結
        </p>
      </header>

      <label class="block">
        <span class="mb-2 block text-[13px] font-bold text-brand-navy">Email</span>
        <input
          class="h-11 w-full rounded-xl border-0 bg-[#F3F4F8] px-4 text-[14px] font-medium text-brand-navy outline-none transition placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-blue"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </label>

      <button
        class="mt-5 h-11 w-full rounded-xl bg-brand-blue text-[14px] font-bold text-brand-white shadow-[0_8px_18px_rgba(146,168,245,0.36)] transition active:bg-[#7F97EC] lg:hover:bg-[#7F97EC] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        type="submit"
      >
        寄出重設連結
      </button>

      <div class="mt-8 text-center">
        <RouterLink
          class="text-[13px] font-bold text-brand-gray transition active:text-brand-navy lg:hover:text-brand-navy"
          to="/login"
        >
          返回登入
        </RouterLink>
      </div>
    </form>
  </main>
</template>
