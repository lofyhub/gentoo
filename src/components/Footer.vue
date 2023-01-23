<script setup lang="ts">
import Twitter from "@/components/icons/socials/Twitter.vue";

const date = new Date().getFullYear();
</script>

<template>
  <div class="bg-white shadow bottom-0 left-0 w-full">
    <footer
      class="w-4/5 mx-auto p-4 text-base text-gray-600 font-medium rounded-lg md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800"
    >
      <span class="sm:text-center dark:text-gray-400 py-2"
        >Copyright © {{ date }}
        <a
          href="https://kikaoo.co.ke"
          class="hover:underline-offset-8 hover:underline"
          >Kikao Inc</a
        >. All Rights Reserved
      </span>
      <ul class="flex flex-wrap items-center mt-3 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="/about"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >About</a
          >
        </li>
        <li>
          <a
            href="/policy"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >Privacy Policy</a
          >
        </li>
        <li>
          <a
            href="/faq"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >FAQ's</a
          >
        </li>
        <li>
          <a
            href="/contact"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >Contact</a
          >
        </li>
        <li>
          <a
            href="/listings"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >Listings</a
          >
        </li>
        <li>
          <a
            href="/guide"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >Guide</a
          >
        </li>
        <li>
          <a
            href="/team"
            class="mr-4 hover:underline-offset-8 hover:underline md:mr-6"
            >Team</a
          >
        </li>
        <li class="">
          <a
            href="https://twitter.com/kikaoHQ"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline-offset-8 hover:underline hover:fill-indigo-900"
            ><Twitter class="w-5 h-5 fill-current"
          /></a>
        </li>
      </ul>
    </footer>
  </div>
</template>
