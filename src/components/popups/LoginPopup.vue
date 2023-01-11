<script setup lang="ts">
import XIcon from "@/components/icons/XIcon.vue";
import { useRootStore } from "@/store";

const store = useRootStore();

function close() {
  store.toggleLogin;
}
</script>

<template>
  <!-- Photo popup -->
  <div
    class="popup bg-gray-600 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="close"
  >
    <button
      class="bg-gray-300 dark:bg-gray5 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
      @click="close"
    >
      <XIcon class="w-6 h-6" />
    </button>
    <div>
      <h1 class="text7xl text-center">LoginForm here to login user</h1>
    </div>
  </div>
</template>
