<script setup lang="ts">
import { useSessionStore } from "@/store/session";
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
  <div class="w-full grid place-items-center pt-8">
    <button
      class="focus:outline-none relative h-28 w-28 rounded-full"
      @click="handleImage"
    >
      <span
        class="absolute inline-flex w-28 h-28 rounded-full top-0 left-0 object-cover"
      >
        <img
          alt="default profile avatar image"
          src="https://pbs.twimg.com/profile_images/1508979883728424968/exEWXj7I_400x400.png"
          class="shadow-xl rounded-full h-28 w-28 border-none object-cover"
        />
      </span>
      <span
        class="bg-gray-900 text-white absolute inline-flex h-28 w-28 object-cover rounded-full top-0 left-0 items-center justify-center rounded-lg bg-opacity-25"
      >
        <PencilIcon class="h-5 w-5 fill-current" />
      </span>
    </button>
    <h2 class="text-xl font-bold leading-normal my-2 text-gray-700">
      {{ store.$state.username }}
    </h2>
    <div
      class="flex flex-col justify-center items-center text-center text-base"
    >
      <div>
        {{ store.$state.email }}
      </div>
      <div class="py-1">Nairobi, Kenya</div>
      <p>{{ store.$state.kikaotype }}</p>
      <div>
        {{ formatDate(store.$state.regDate) }}
      </div>
    </div>
  </div>
</template>
