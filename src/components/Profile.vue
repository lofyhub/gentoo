<script setup lang="ts">
import StartFull from "@/components/icons/StartFull.vue";

import { getMonthYear } from "@/helpers/helpers";
import { ref, defineProps, withDefaults, computed, onBeforeMount } from "vue";
import { userPublisher, userReview } from "@/temp/types";

import { stringToHslColor } from "@/helpers/helpers";
import { useSessionStore } from "@/store/session";
import { uselistingStore } from "@/store/listing";

const open = ref(false);
const store = useSessionStore();
const listingStore = uselistingStore();

const prop = withDefaults(
  defineProps<{
    profile: userPublisher;
  }>(),
  {}
);

const backgroundColor = stringToHslColor(prop.profile.username);
const userReviews = computed(() => {
  const reviews = listingStore.getAuthorReviews(prop.profile.id);
  if (reviews) {
    return reviews as userReview[];
  }
  return [] as userReview[];
});

onBeforeMount(() => {
  listingStore.fetchAuthorReviews(prop.profile.id);
});
</script>
<template>
  <section
    class="flex items-center justify-center w-full h-auto p-4 mx-auto antialiased"
  >
    <!-- Card -->
    <div class="w-full mx-auto">
      <div class="flex flex-col h-full">
        <!-- Card top -->
        <div class="flex-grow p-5">
          <div class="flex items-start justify-between">
            <!-- Image + name -->
            <header class="flex items-center justify-center mx-auto">
              <div
                class="flex items-center justify-center my-2 gap-x-5 lg:gap-x-20"
              >
                <div class="items-start mr-5">
                  <img
                    v-if="profile.profileImage"
                    class="rounded-full w-[100px] h-[100px] object-cover"
                    :src="profile.profileImage"
                    :alt="profile.username + ' avatar image'"
                    :title="profile.username + ' avatar image'"
                    loading="eager"
                  />
                  <div
                    v-else
                    class="rounded-full w-[150px] h-[150px] shadow transition-opacity text-center flex justify-center items-center uppercase text-white text-5xl"
                    :style="{ backgroundColor: backgroundColor }"
                  >
                    {{ profile.username.slice(0, 2) }}
                  </div>
                </div>
                <div class="pr-1 text-base lg:mt-4">
                  <h2 class="justify-center text-2xl font-bold leading-snug">
                    {{ prop.profile.username }}
                  </h2>

                  <!-- Bio -->
                  <div
                    class="mt-2"
                    v-if="store.$state.email === prop.profile.email"
                  >
                    <div class="text-gray-400">{{ prop.profile.email }}</div>
                  </div>
                  <div class="flex mt-1 text-lg gap-x-4 flex-col">
                    <p class="text-justified">{{ prop.profile.kikaoType }}</p>
                    <p class="text-sm">
                      Joined {{ getMonthYear(prop.profile.createdAt) }}
                    </p>
                  </div>

                  <div class="mt-1.5 text-lg flex flex-row gap-x-2">
                    <StartFull class="w-3 h-3" />
                    <p v-if="userReviews.length > 0">
                      <span class="text-sm font-bold">
                        {{ userReviews.length }}</span
                      >
                      reviews
                    </p>
                    <p v-else class="text-sm">0 reviews</p>
                  </div>
                </div>
              </div>
            </header>
            <!-- Menu button -->
            <div
              class="relative inline-flex flex-shrink-0"
              x-data="{ open: false }"
              v-if="open"
            >
              <button
                class="text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus-within:ring-2"
                :class="{ 'bg-gray-100 text-gray-600': open }"
                aria-haspopup="true"
                @click.prevent="open = !open"
                :aria-expanded="open"
              >
                <span class="sr-only">Menu</span>
                <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="2" />
                  <circle cx="10" cy="16" r="2" />
                  <circle cx="22" cy="16" r="2" />
                </svg>
              </button>
              <div
                v-if="open"
                class="origin-top-right z-10 absolute top-full right-0 min-w-[9rem] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                @mouseleave="open = false"
                x-show="open"
                x-transition:enter="transition ease-out duration-200 transform"
                x-transition:enter-start="opacity-0 -translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease-out duration-200"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                x-cloak
              >
                <ul>
                  <li>
                    <a
                      class="flex px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
                      href="#0"
                      @click="open = false"
                      @focus="open = true"
                      @focusout="open = false"
                      >Option 1</a
                    >
                  </li>
                  <li>
                    <a
                      class="flex px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
                      href="#0"
                      @click="open = false"
                      @focus="open = true"
                      @focusout="open = false"
                      >Option 2</a
                    >
                  </li>
                  <li>
                    <a
                      class="flex px-3 py-1 text-sm font-medium text-red-500 hover:text-red-600"
                      href="#0"
                      @click="open = false"
                      @focus="open = true"
                      @focusout="open = false"
                      >Remove</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Card footer -->
      </div>
    </div>
  </section>
</template>
