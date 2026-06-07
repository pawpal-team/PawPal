<template>
  <div class="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-white">
    <div class="flex items-center justify-end px-5 pt-5">
      <button
        type="button"
        class="grid h-9 w-9 cursor-pointer place-items-center text-slate-500 hover:text-[#FFA002]"
        aria-label="關閉選單"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          class="h-6 w-6"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>

    <nav class="flex flex-1 flex-col gap-6 px-8 pt-2 pb-6">
      <section>
        <ul class="flex flex-col gap-4">
          <li>
            <a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">關於我們</a>
          </li>
          <li><span class="text-xs font-bold tracking-wider text-[#717182]">醫療專區</span></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">搜尋醫療院所</a></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">AI 即時診斷</a></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">緊急處置教學</a></li>
        </ul>
      </section>

      <section>
        <ul class="flex flex-col gap-4">
          <li><span class="text-xs font-bold tracking-wider text-[#717182]">寵物知識+</span></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">經驗分享討論區</a></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">衛教文章</a></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">小知識測驗</a></li>
        </ul>
      </section>

      <section>
        <ul class="flex flex-col gap-4">
          <li><span class="text-xs font-bold tracking-wider text-[#717182]">會員專區</span></li>
          <li><a href="#" class="text-base font-medium text-[#3D4A7A] hover:text-[#FFA002]">會員主頁</a></li>
          <li>
            <div class="flex items-center justify-center gap-20 border-t border-slate-200 pt-[50px]">
              <a href="#" class="flex items-center gap-1.5 text-base font-medium text-slate-500 hover:text-[#FFA002]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                註冊
              </a>
              <a href="#" class="flex items-center gap-1.5 text-base font-medium text-slate-500 hover:text-[#FFA002]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
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
        class="flex w-full items-center justify-center gap-2 rounded-full bg-[#92A8F5] py-4 text-base font-medium text-white shadow-md transition hover:bg-[#FFA002] active:bg-[#E08F00] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <path d="M12 22s-7-7.58-7-13a7 7 0 1 1 14 0c0 5.42-7 13-7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        搜尋附近醫院
      </button>
    </div>
  </div>
</template>
