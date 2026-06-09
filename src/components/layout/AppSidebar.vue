<template>
  <div class="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-brand-white">
    <div class="flex items-center justify-end px-5 pt-5">
      <button
        type="button"
        class="grid h-9 w-9 cursor-pointer place-items-center text-brand-gray hover:text-brand-orange"
        aria-label="關閉選單"
      ><img src="@/assets/icons/close.svg" alt="Close Icon" class="h-4 w-4" />
      </button>
    </div>

    <nav class="flex flex-1 flex-col gap-6 px-8 pt-2 pb-6">
      <section>
        <ul class="flex flex-col gap-4">
          <li>
            <a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">關於我們</a>
          </li>
          <li><span class="text-base font-bold tracking-wider text-brand-navy">醫療專區</span></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">搜尋醫療院所</a></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">AI 即時診斷</a></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">緊急處置教學 </a></li>
        </ul>
      </section>
      
      <section>
        <ul class="flex flex-col gap-4">
          <li><span class="text-base font-bold tracking-wider text-brand-navy">寵物知識+</span></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">經驗分享討論區</a></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">衛教文章</a></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">小知識測驗</a></li>
        </ul>
      </section>

      <section>
        <ul class="flex flex-col gap-4">
          <li><span class="text-base font-bold tracking-wider text-brand-navy">會員專區</span></li>
          <li><a href="#" class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange">會員主頁</a></li>
          <li>
            <div class="flex items-center justify-center gap-20 border-t border-brand-lightblue pt-[50px]">
              <a href="#" class="cursor-pointer flex items-center gap-1.5 text-base font-medium text-brand-gray active:text-brand-orange">
                <img src="@/assets/icons/register.svg" alt="Register Icon" class="h-4 w-4" />
                註冊
              </a>
              <a href="#" class="cursor-pointer flex items-center gap-1.5 text-base font-medium text-brand-gray active:text-brand-orange">
                <img src="@/assets/icons/login.svg" alt="Login Icon" class="h-4 w-4 active:stroke-brand-orange" />
                登入
              </a>
            </div>
          </li>
        </ul>
      </section>
    </nav>

    <div class="px-6 pb-8">
      <button
        type="button"
        class="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange py-4 text-base font-medium text-brand-white shadow-md transition hover:bg-[#e58f00] active:bg-[#E08F00]"
      >
        <img src="@/assets/icons/search-hospital.svg" alt="Hospital Icon" class="h-5 w-5" />
        搜尋附近醫院
      </button>
    </div>
  </div>
</template>
