<script setup lang="ts">
import facebook from "@/components/icons/Facebook.vue";
import twitter from "@/components/icons/Twitter.vue";
import instagram from "@/components/icons/Whatsapp.vue";
import GlobeIcon from "./icons/GlobeIcon.vue";
</script>

<template>
  <div>
    <div class="border-t-2 border-gray-300 lg:w-[1200px] mx-auto mt-6"></div>
    <div
      class="lg:w-[1200px] mx-auto flex flex-wrap justify-around pt-10 item-center"
    >
      <div class="lg:mr-40 mr-10">
        <h1 class="font-bold text-xl">Company</h1>
        <div class="text-lg">
          <a href="/">About</a> <br />
          <a href="/">Careers</a> <br />
          <a href="/">Blog</a> <br />
          <a href="/">Partnerships</a>
        </div>
      </div>
      <div class="lg:mr-40">
        <h1 class="font-bold text-xl">Sell a home</h1>
        <div class="text-lg">
          <a href="/">Request an offer</a> <br />
          <a href="/">Pricing</a> <br />
          <a href="/">Reviews</a> <br />
          <a href="/">Stories</a>
        </div>
      </div>
      <div>
        <h1 class="font-bold text-xl">Buy, Rent and Sell</h1>
        <div class="text-lg">
          <a href="/">Buy and sell properties</a> <br />
          <a href="/">Rent a home</a> <br />
          <a href="/">Builder trade-up</a> <br />
          <a href="/">FAQ</a>
        </div>
      </div>
    </div>
    <div>
      <div class="lg:w-[1200px] mx-auto border-t-2 border-gray-200 py-8 mt-6">
        <div class="flex text-base font-bold">
          <div>
            <span>© KikaoHQ, Inc. 2021 - {{ new Date().getFullYear() }}</span>
            <a
              class="ml-10 hover:underline underline-offset-4"
              href="http://"
              rel="noopener noreferrer"
              >Help</a
            >
            <a
              class="ml-10 hover:underline underline-offset-4"
              href="http://"
              rel="noopener noreferrer"
              >Privacy</a
            >
            <a
              class="ml-10 hover:underline underline-offset-4"
              href="/faq"
              rel="noopener noreferrer"
              >FAQ</a
            >
            <a
              class="ml-10 hover:underline underline-offset-4"
              href="http://"
              rel="noopener noreferrer"
              >Terms</a
            >
          </div>
          <div class="ml-auto flex">
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-indigo-50 w-8 h-8 rounded-full flex border-2 ml-2 hover:bg-indigo-100 transition transform"
              ><facebook
                class="w-4 h-4 rounded-full text-center mt-1.5 ml-1.5"
              />
            </a>
            <a
              href="http://twitter.com/kikaohq"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-indigo-50 w-8 h-8 rounded-full flex border-2 ml-2 hover:bg-indigo-100 transition transform"
              ><twitter class="w-4 h-4 rounded-full text-center mt-1.5 ml-1.5"
            /></a>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-indigo-50 w-8 h-8 rounded-full flex border-2 ml-2 inline text-center hover:bg-indigo-100 transition transform"
              ><instagram
                class="w-4 h-4 rounded-full text-center mt-1.5 ml-1.5"
            /></a>
          </div>
          <div
            class="cursor-pointer py-1.5 px-6 bg-indigo-50 flex border-2 rounded-md ml-8 -translate-y-1.5 hover:bg-indigo-100"
          >
            <GlobeIcon class="mr-2" />
            <h5 class="app-text font-bold">English</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
