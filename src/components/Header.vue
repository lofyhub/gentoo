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
const userData = session.$state;
const dashRoute = computed(() => route.matched[0]?.name);

// methods
function logOut() {
  session.$reset();
  listingStore.clearBookmarks();
  localStorage.removeItem("kikao_token");
  router.push("/");
}

function handleListing() {
  isOpen.value = false;
  if (session.$state.id) {
    store.toggleShowListing();
    return;
  }

  store.toggleLogin();
}

function toggleDropdown() {
  isDropdown.value = !isDropdown.value;
}
</script>

<template>
  <nav class="sticky top-0 left-0 z-30 w-full bg-white shadow dark:bg-gray-800">
    <div class="container p-0 mx-auto md:px-10">
      <div class="lg:flex lg:items-center lg:justify-around">
        <div class="flex items-center justify-between py-2 mx-6">
          <a
            class="flex ml-2 text-xl font-medium text-black transition-colors duration-300 transform lg:ml-20 dark:text-white lg:text-1xl"
            href="/"
          >
            <LogoIcon class="w-7 h-7 inline mt-2.5" />
            <span v-if="dashRoute === `Dashboard`" class="ml-2 mt-3.5">{{
              session.$state.userId ? `Dashboard` : `Profile`
            }}</span>
            <span v-else class="mt-3 ml-2">Kikao</span></a
          >

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              x-cloak
              @click="isOpen = !isOpen"
              type="button"
              class="text-black focus:outline-none"
              aria-label="toggle menu"
            >
              <XIcon v-if="isOpen" class="w-8 h-8 transition-all transform" />
              <Bars v-else class="w-11 h-11" />
            </button>
          </div>
        </div>
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
            class="flex flex-col text-[15px] font-medium lg:flex-row lg:items-center"
          >
            <router-link
              to="/listings"
              @click="isOpen = false"
              class="px-4 py-5 mx-3 mt-2 transition-all duration-300 transform rounded-sm hover:border-b-2 hover:border-indigo-500 lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              :class="
                route.name === `Rent`
                  ? `font-bold border-b-2 border-indigo-500`
                  : `text-gray-800`
              "
              >Rent
            </router-link>
            <router-link
              to="/listings"
              @click="isOpen = false"
              class="px-4 py-5 mx-3 mt-2 transition-all duration-300 transform rounded-sm hover:border-b-2 hover:border-indigo-500 lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Stays</router-link
            >
            <router-link
              to="/listings"
              @click="isOpen = false"
              class="px-4 py-5 mx-3 mt-2 transition-colors duration-300 transform rounded-sm hover:border-b-2 hover:border-indigo-500 lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Attractions</router-link
            >

            <a
              @click="handleListing"
              v-if="session.$state.userId"
              class="px-3 py-5 mx-4 mt-2 transition-colors duration-300 transform rounded-sm cursor-pointer hover:border-b-2 hover:border-indigo-500 hover:bg-indigo-50 lg:mt-0 dark:text-gray-200"
              :class="
                route.name === `Dashboard` ||
                route.name === `Listings` ||
                route.name === `addlisting` ||
                route.name === `Guidelines`
                  ? `border-b-2 border-indigo-500 font-bold`
                  : `text-gray-800`
              "
            >
              Create Listing
            </a>

            <div class="flex items-center mx-6 mt-4 lg:mt-0">
              <!-- start avatar seciton -->
              <div
                x-data="{ isOpen: true }"
                v-if="userData.id"
                class="relative inline-block"
              >
                <!-- Dropdown toggle button -->
                <button
                  @click="toggleDropdown"
                  class="flex text-gray-900 rounded-full gap-x-2 items-centerfont-medium hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                >
                  <div class="flex">
                    <img
                      v-if="session.$state.id"
                      class="object-cover w-10 h-10 rounded-full"
                      :src="userData.image"
                      alt="profile image"
                      title="avatar image"
                      loading="eager"
                    />
                  </div>
                  <svg
                    class="w-5 h-5 my-auto"
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
                  v-if="isDropdown"
                  @mouseleave="isDropdown = false"
                  x-transition:enter="transition ease-out duration-100"
                  x-transition:enter-start="opacity-0 scale-90"
                  x-transition:enter-end="opacity-100 scale-100"
                  x-transition:leave="transition ease-in duration-100"
                  x-transition:leave-start="opacity-100 scale-100"
                  x-transition:leave-end="opacity-0 scale-90"
                  class="absolute right-0 z-20 w-56 mt-4 overflow-hidden origin-top-right bg-white rounded-md shadow-xl left-4 lg:left-0 dark:bg-gray-800"
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
                  <hr class="mt-2 border-gray-200 dark:border-gray-700" />
                  <div class="text-sm font-semibold">
                    <router-link
                      :to="'/' + session.$state.userId"
                      @click="isDropdown = !isDropdown"
                      class="flex items-center p-3 text-sm text-gray-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <Avatar class="w-6 h-6" />
                      <span class="mx-2 text-base font-normal">
                        Edit profile
                      </span>
                    </router-link>

                    <router-link
                      :to="'/' + session.$state.userId"
                      @click="isDropdown = !isDropdown"
                      class="flex items-center p-3 text-sm text-gray-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <MacOptions />
                      <span class="mx-2 text-base font-normal"> Dashboard</span>
                    </router-link>
                    <hr class="border-gray-200 dark:border-gray-700" />
                    <a
                      href="/faq"
                      @click="isDropdown = !isDropdown"
                      class="flex items-center p-3 text-sm text-gray-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <Question />
                      <span class="mx-2 text-base font-normal"> Help </span>
                    </a>
                    <button
                      type="button"
                      @click="logOut"
                      class="flex items-center w-full p-3 text-base font-bold text-red-500 capitalize transition-colors duration-300 transform cursor-pointer hover:text-white dark:text-gray-300 hover:bg-red-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <SignOut class="text-red-500 hover:text-white" />
                      <span class="mx-1 ml-3 font-extrabold"> Sign Out </span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- end of avatar section -->

              <div v-else class="flex mr-8 font-semibold">
                <button
                  @click="store.toggleLogin(), (isOpen = false)"
                  class="mr-4 border border-indigp-100 opacity-100 py-1.8 px-6 rounded transition-all ease-in hover:bg-indigo-50"
                >
                  Log In
                </button>
                <RouterLink
                  :to="`/signup`"
                  @click="isOpen = false"
                  class="mr-4 bg-indigo-500 opacity-100 text-white hover:bg-indigo-700 py-2.5 px-5 rounded flex transition-all ease-in"
                >
                  Sign Up <LeftIcon class="mx-2 animate-bounce"
                /></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
