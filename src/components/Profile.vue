<script setup lang="ts">
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

const backgroundColor = stringToHslColor(prop.profile.business.name);
const userReviews = computed(() => {
  const reviews = listingStore.getAuthorReviews(prop.profile.userId);
  if (reviews) {
    return reviews as userReview[];
  }
  return [] as userReview[];
});

onBeforeMount(() => {
  listingStore.fetchAuthorReviews(prop.profile.userId);
});
</script>
<template>
  <section
    class="w-full flex flex-col justify-center antialiased text-gray-600 h-auto p-4"
  >
    <!-- Card -->
    <div class="w-full lg:max-w-[800px] mx-auto">
      <div class="flex flex-col h-full">
        <!-- Card top -->
        <div class="flex-grow p-5">
          <div class="flex justify-between items-start">
            <!-- Image + name -->
            <header>
              <div class="flex my-2 gap-x-20 lg:gap-x-30">
                <div class="items-start mr-5">
                  <img
                    v-if="profile.profileImage"
                    class="rounded-full w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover"
                    :src="profile.profileImage"
                    :alt="profile.username + ' avatar image'"
                    :title="profile.username + ' avatar image'"
                    loading="eager"
                  />
                  <div
                    v-else
                    class="rounded-full w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] shadow transition-opacity text-center flex justify-center items-center uppercase text-white text-5xl"
                    :style="{ backgroundColor: backgroundColor }"
                  >
                    {{ profile.username.slice(0, 2) }}
                  </div>
                </div>
                <div class="lg:mt-4 pr-1 text-base">
                  <h2 class="text-xl leading-snug justify-center font-bold">
                    {{ prop.profile.username }}
                  </h2>

                  <!-- Bio -->
                  <div
                    class="mt-2"
                    v-if="store.$state.email === prop.profile.email"
                  >
                    <div class="text-gray-400">{{ prop.profile.email }}</div>
                  </div>
                  <div class="mt-1">
                    {{ prop.profile.kikaoType }}
                  </div>
                  <div class="mt-1">
                    Joined {{ getMonthYear(prop.profile.date) }}
                  </div>
                  <div class="mt-1.5 text-lg flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <div v-if="userReviews.length > 0">
                      <span class="mx-2 font-semibold">{{
                        userReviews.length
                      }}</span>
                      reviews
                    </div>
                    <div v-else>
                      <span class="mx-2">no reviews for user</span>
                    </div>
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
                class="text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus-within:ring-2"
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
                      class="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                      href="#0"
                      @click="open = false"
                      @focus="open = true"
                      @focusout="open = false"
                      >Option 1</a
                    >
                  </li>
                  <li>
                    <a
                      class="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                      href="#0"
                      @click="open = false"
                      @focus="open = true"
                      @focusout="open = false"
                      >Option 2</a
                    >
                  </li>
                  <li>
                    <a
                      class="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
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
