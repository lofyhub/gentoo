<script setup lang="ts">
import Twitter from "@/components/icons/socials/Twitter.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const date = new Date().getFullYear();
</script>

<template>
  <footer class="bg-white py-10 w-full font-normal">
    <div class="w-4/5 mx-auto">
      <div class="flex">
        <LogoIcon class="mr-3" />
        <div class="mt-3 flex justify-between">
          <p class="text-2xl inline">Kikao</p>
          <p class="text-1xl inline mt-1.5 ml-6">
            Copyright © {{ date }} Kikao Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap justify-between pt-4 w-4/5">
        <a href="/"> Home</a>
        <a href="/about">About Us</a>
        <a href="/policy">Policy </a>
        <a href="/contact">Help</a>
        <a href="/contact">Contact</a>
        <a
          href="https://twitter.com/kikaoHQ"
          target="_blank"
          rel="noopener noreferrer"
          class=""
        >
          <span class="inline">Follow </span>
          <Twitter class="inline w-5 h-5 mx-3"
        /></a>
      </div>
    </div>
  </footer>
</template>
