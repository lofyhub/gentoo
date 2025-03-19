<script setup lang="ts">
import Profile from "@/components/Profile.vue";
import ChatIcon from "@/components/icons/ChatIcon.vue";

import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { useHead } from "unhead";

import { useSessionStore } from "@/store/session";
import { uselistingStore } from "@/store/listing";
import { computed } from "vue";

const store = useSessionStore();
const listingStore = uselistingStore();
const route = useRoute();
const id = ref(route.params.id as string);
const authorProfile = computed(() => listingStore.getProfile(id.value));

useHead({
  title: authorProfile.value?.id + "'s Profile",
});

onBeforeMount(() => {
  listingStore.getListingAuthor(id.value);
});
// methods
function getStyles(tab: string) {
  let res = ``;
  if (route.name === tab) {
    res += ` text-gray-900 border-t-[2px] border-indigo-500`;
    return res;
  }
  return res;
}
</script>
<template>
  <div class="mb-20">
    <!-- Dashboard to add, delete, edit and view listings -->
    <div class="sticky z-20 bg-white top-10">
      <div v-if="authorProfile">
        <Profile :profile="authorProfile" />
      </div>
      <div class="w-full mx-auto border-t border-gray-200 lg:w-4/5">
        <div class="flex text-base">
          <router-link
            :to="'/profile/' + id"
            class="flex-1 block px-3 font-medium text-center text-gray-600 hover:text-gray-800 group hover:cursor-pointer"
          >
            <div
              class="flex items-center justify-center py-4"
              :class="getStyles('Listings')"
            >
              <svg
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="flex-shrink-0 inline w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>

              <span>{{
                store.$state.userId && store.$state.userId === id
                  ? `Your Listings`
                  : `${authorProfile}'s listings`
              }}</span>
            </div>
          </router-link>
          <router-link
            :to="'/profile/' + id + '/bookings'"
            v-if="store.$state.userId && store.$state.userId === id"
            class="flex-1 px-3 font-medium text-center text-gray-600 hover:text-gray-800 group hover:cursor-pointer"
          >
            <div
              class="flex items-center justify-center py-4"
              :class="getStyles('Bookings')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="flex-shrink-0 w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>

              <span>Bookings</span>
            </div>
          </router-link>
          <router-link
            :to="'/profile/' + id + '/reviews'"
            class="flex-1 block px-3 font-medium text-center text-gray-600 hover:text-gray-800 group hover:cursor-pointer"
          >
            <div
              class="flex items-center justify-center py-4"
              :class="getStyles('reviews')"
            >
              <ChatIcon class="w-6 h-6" />

              <span>Reviews</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="w-full">
      <router-view></router-view>
    </div>
  </div>
</template>
