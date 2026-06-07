<template>
  <footer class="flex flex-col items-center bg-[#E9EEFD]">
    <div
      class="flex flex-col items-center h-[210px] md:flex-row md:items-stretch md:justify-center md:w-full md:max-w-[1400px] md:h-[200px] md:mx-auto md:px-8 md:py-8 md:gap-20"
    >
      <div class="flex flex-col pt-8 md:items-start md:pt-0 md:w-[350px]">
        <img
          class="w-[140px] h-[80px] object-contain md:w-[180px]"
          src="../../assets/images/PawPal_logo_p.PNG"
        />
        <p class="hidden text-[#6B7280] md:block">
          為毛孩家庭打造的即時照護平台,24 小時陪伴每一個緊急時刻。
        </p>
      </div>

      <div class="hidden md:flex md:flex-col md:items-start md:w-[350px]">
        <p class="mt-3 mb-4 text-[#3D4A7A]">醫療專區</p>
        <ul class="text-[14px] text-[#6B7280]">
          <li>搜尋醫療院所</li>
          <li>AI 即時診斷</li>
          <li>緊急處置教學</li>
        </ul>
      </div>

      <div class="hidden md:flex md:flex-col md:items-start md:w-[350px]">
        <p class="mt-3 mb-4 text-[#3D4A7A]">寵物知識+</p>
        <ul class="text-[14px] text-[#6B7280]">
          <li>經驗分享</li>
          <li>衛教文章</li>
          <li>小知識測驗</li>
        </ul>
      </div>

      <div class="flex flex-col items-center mb-6 md:items-start md:w-[350px]">
        <p class="mt-3 mb-4 text-[#3D4A7A]">聯絡我們</p>
        <div class="flex gap-2">
          <img class="w-[30px] h-[30px]" src="../../assets/icons/facebook-icon.svg" />
          <img class="w-[35px] h-[35px]" src="../../assets/icons/instagram-icon.svg" />
          <img class="w-[35px] h-[35px]" src="../../assets/icons/email-icon.svg" />
        </div>
        <p class="hidden text-[14px] text-[#6B7280] md:block">hi@pawpal.tw</p>
      </div>
    </div>

    <div class="flex items-center justify-center w-full h-[50px] bg-[#3D4A7A]">
      <p class="text-[14px] text-[#E9EEFD]">© 2026 PawPal.All rights reserved.</p>
    </div>
  </footer>
</template>
