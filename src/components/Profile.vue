<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import Map from "@/components/icons/MapPin.vue";
import Email from "./icons/Email.vue";
import { formatDate } from "@/helpers/helpers";
import PencilIcon from "@/components/icons/Pencil.vue";
const store = useSessionStore();
// method
function handleImage() {
  //TODO: Handle profile editing here
  return;
}
</script>
<template>
  <div class="w-full grid place-items-center py-6">
    <button
      class="focus:outline-none relative h-24 w-24 rounded-full"
      @click="handleImage"
    >
      <span class="absolute inline-flex w-24 h-24 rounded-full top-0 left-0">
        <img
          alt="..."
          src="https://pbs.twimg.com/profile_images/1508979883728424968/exEWXj7I_400x400.png"
          class="shadow-xl rounded-full h-24 w-24 border-none"
        />
      </span>
      <span
        class="bg-gray-900 text-white absolute inline-flex h-24 w-24 rounded-full top-0 left-0 items-center justify-center rounded-lg bg-opacity-25"
      >
        <PencilIcon class="h-5 w-5 fill-current" />
      </span>
    </button>
    <h2 class="text-2xl font-semibold leading-normal my-1 text-gray-700">
      {{ store.$state.username }}
    </h2>
    <div>
      <Email class="my-2 w-5 h-5 text-lg text-gray-500 inline mr-2" />
      {{ store.$state.email }}
    </div>
    <div class="leading-normal mb-2 uppercase">
      <Map class="mr-1 text-lg text-gray-500 inline" />
      Nairobi, Kenya
    </div>
    <p>{{ store.$state.kikaotype }}</p>
    <p>
      <span class="text-gray-500">Joined :</span>
      {{ formatDate(store.$state.regDate) }}
    </p>
  </div>
</template>
