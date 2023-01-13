<script setup lang="ts">
import { defineEmits } from "vue";

import XIcon from "@/components/icons/XIcon.vue";
import Twitter from "@/components/icons/socials/Twitter.vue";
import Facebook from "@/components/icons/socials/Facebook.vue";
import Linkedin from "@/components/icons/socials/Linkedin.vue";
import Whatsapp from "@/components/icons/socials/Whatsapp.vue";
import Reddit from "@/components/icons/socials/Reddit.vue";
import Email from "@/components/icons/socials/Email.vue";

defineEmits(["close"]);
</script>
<template>
  <div
    class="popup bg-gray-600 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="$emit(`close`)"
  >
    <button
      class="bg-gray-300 dark:bg-gray5 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
      @click="$emit(`close`)"
    >
      <XIcon class="w-6 h-6" />
    </button>
    <div
      class="flex w-96 mx-auto items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded"
    ></div>
  </div>
</template>
