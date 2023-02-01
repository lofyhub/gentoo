<!-- eslint-disable vue/valid-v-on -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import Question from "@/components/icons/Question.vue";
import Avatar from "@/components/icons/Avatar.vue";
import SignOut from "@/components/icons/SignOut.vue";
import MacOptions from "@/components/icons/Mac.vue";
import Bars from "@/components/icons/Bars.vue";
import LeftIcon from "@/components/icons/ArrowDown.vue";
import XIcon from "@/components/icons/XIcon.vue";

import { useSessionStore } from "@/store/session";
import { uselistingStore } from "@/store/listing";
import { useRootStore } from "@/store/index";

const session = useSessionStore();
const store = useRootStore();
const listingStore = uselistingStore();
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const isDropdown = ref(false);
const userData = computed(() => session.$state);
const dashRoute = computed(() => route.matched[0]?.name);

// methods
function logOut() {
  session.$reset();
  listingStore.clearBookmarks();
  localStorage.removeItem("kikao-token");
  router.push("/");
}

function handleListing() {
  isOpen.value = false;
  if (session.$state._id) {
    router.push(`/dashboard/addlisting`);
    return;
  }

  store.toggleLogin();
}
</script>

<template>
  <nav class="shadow dark:bg-gray-800 sticky top-0 left-0 w-full bg-white z-20">
    <div class="container md:px-10 px-6 py-2 mx-auto">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex items-center justify-between">
          <a
            class="text-2xl font-medium flex transition-colors duration-300 ml-2 lg:ml-20 transform dark:text-white lg:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
            href="/"
          >
            <LogoIcon class="w-8 h-8 inline mt-2.5" />
            <span v-if="dashRoute === `Dashboard`" class="ml-2 mt-3.5"
              >Dashboard</span
            >
            <span v-else class="ml-2 mt-3.5">Kikao</span></a
          >

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              x-cloak
              @click="isOpen = !isOpen"
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <XIcon v-if="isOpen" class="w-8 h-8 transition-all transform" />
              <Bars v-else class="w-8 h-8" />
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          x-cloak
          :class="[
            isOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full',
          ]"
          class="absolute inset-x-0 z-20 w-full px-6 py-4 mr-6 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-center text-sm font-medium"
          >
            <a
              href="/listings"
              @click="isOpen = false"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Rent
            </a>
            <a
              href="/listings"
              @click="isOpen = false"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Stays</a
            >
            <a
              href="/listings"
              @click="isOpen = false"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Attractions</a
            >
            <div class="hover:bg-indigo-50 dark:hover:bg-gray-700">
              <button
                type="button"
                @click="handleListing"
                class="px-4 py-2 mx-3 mt-2 cursor-pointer transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200"
              >
                Create Listing
              </button>
            </div>
            <div class="flex items-center mt-4 lg:mt-0 mx-6">
              <div v-if="userData._id">
                <!-- start avatar seciton -->
                <div x-data="{ isOpen: true }" class="relative inline-block">
                  <!-- Dropdown toggle button -->
                  <button
                    @click="isDropdown = !isDropdown"
                    class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                  >
                    <img
                      alt="default avatar image kikao"
                      loading="lazy"
                      decoding="async"
                      src="https://pbs.twimg.com/profile_images/1508979883728424968/exEWXj7I_400x400.png"
                      class="w-8 h-8 mr-2 rounded-full bg-img"
                    />
                    {{ userData.username }}
                    <svg
                      class="w-4 h-4 mx-1.5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <!-- Dropdown menu -->
                  <div
                    v-show="isDropdown"
                    @mouseleave="isDropdown = false"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="opacity-0 scale-90"
                    x-transition:enter-end="opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-100"
                    x-transition:leave-start="opacity-100 scale-100"
                    x-transition:leave-end="opacity-0 scale-90"
                    class="absolute right-0 z-20 w-56 mt-2 mt-2 left-4 lg:left-0 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                  >
                    <div class="text-base font-medium">
                      <div class="mx-5">
                        <h1
                          class="text-base font-semibold text-gray-700 dark:text-gray-200"
                        >
                          {{ userData.username }}
                        </h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ userData.email }}
                        </p>
                      </div>
                    </div>
                    <hr class="border-gray-200 dark:border-gray-700 mt-2" />
                    <div class="text-sm font-semibold">
                      <a
                        href="/dashboard"
                        @click="isDropdown = !isDropdown"
                        class="flex items-center p-3 text-sm capitalize transition-colors text-gray-500 duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <Avatar class="h-6 w-6" />
                        <span class="mx-1"> Edit profile </span>
                      </a>
                      <a
                        href="/dashboard"
                        @click="isDropdown = !isDropdown"
                        class="flex items-center p-3 text-sm text-gray-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <MacOptions />
                        <span class="mx-1"> Dashboard</span>
                      </a>
                      <hr class="border-gray-200 dark:border-gray-700" />
                      <a
                        href="/faq"
                        @click="isDropdown = !isDropdown"
                        class="flex items-center p-3 text-sm text-gray-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <Question />
                        <span class="mx-1"> Help </span>
                      </a>
                      <button
                        type="button"
                        @click="logOut"
                        class="flex font-bold items-center w-full cursor-pointer hover:text-white p-3 text-base text-red-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <SignOut class="text-red-500 hover:text-white" />
                        <span class="mx-1 font-extrabold ml-3"> Sign Out </span>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- end of avatar section -->
              </div>
              <div v-else class="mr-8 flex font-semibold">
                <button
                  @click="store.toggleLogin()"
                  class="mr-4 border border-indigp-100 opacity-100 py-1.8 px-6 rounded transition-all ease-in hover:bg-indigo-50"
                >
                  Sign in
                </button>
                <RouterLink
                  :to="`/signup`"
                  class="mr-4 bg-indigo-500 opacity-100 text-white hover:bg-indigo-700 py-2.5 px-5 rounded flex transition-all ease-in"
                >
                  Join Kikao <LeftIcon class="mx-2 animate-bounce"
                /></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
