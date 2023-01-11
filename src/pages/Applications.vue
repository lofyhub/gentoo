<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "@/store/session";

const store = useSessionStore();

// refs
const showAddListing = ref(false);
</script>
<template>
  <div class="div" v-if="store.$state.id">
    <!-- form to upload images -->
    <div>
      <button
        class="py-2 px-6 bg-indigo-50 border font-semibold rounded"
        @click="showAddListing = true"
      >
        Add listing
      </button>
    </div>
  </div>
</template>
