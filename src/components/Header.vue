<!-- eslint-disable vue/valid-v-on -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import BrandedButton from "@/components/BrandedButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import Question from "@/components/icons/Question.vue";
import Avatar from "@/components/icons/Avatar.vue";
import SignOut from "@/components/icons/SignOut.vue";
import MacOptions from "@/components/icons/Mac.vue";
import DropdownIcon from "@/components/icons/Dropdown.vue";
import Bars from "@/components/icons/Bars.vue";

import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";
import router from "@/router";

const session = useSessionStore();
const store = useRootStore();
const route = useRoute();
const isOpen = ref(false);
const isDropdown = ref(false);
const userData = computed(() => session.$state);

// methods
function logOut() {
  session.$reset();
  sessionStorage.removeItem("x-access-token");
}

function handleListing() {
  if (session.$state._id) {
    router.push(`/dashboard`);
    return;
  }

  store.toggleLogin();
}
</script>

<template>
  <nav
    x-data="{ isOpen: false }"
    class="relative shadow dark:bg-gray-800 sticky top-0 left-0 w-full bg-white"
  >
    <div class="container md:px-10 px-6 py-3 mx-auto">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex items-center justify-between">
          <a
            class="text-2xl flex transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
            href="/"
          >
            <LogoIcon class="w-6 h-6 inline" />
            <span
              v-if="route.name === `Dashboard`"
              class="text-2xl font-normal ml-2 mt-3"
              >Dashboard</span
            >
            <span v-else class="ml-2 mt-3">Kikao</span></a
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
              <Bars class="w-8 h-8" />
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
          class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center"
        >
          <div
            class="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 text-1xl"
          >
            <a
              href="/listings"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Rent
            </a>
            <a
              href="/listings"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Buy</a
            >
            <a
              href="/listings"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Sell</a
            >
            <div
              @click="handleListing"
              class="px-4 py-2 mx-3 mt-2 cursor-pointer transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              Add listing
            </div>
          </div>
          <div class="flex items-center mt-4 lg:mt-0">
            <div v-if="userData._id">
              <!-- start avatar seciton -->
              <div x-data="{ isOpen: true }" class="relative inline-block">
                <!-- Dropdown toggle button -->
                <button
                  @click.stop="isDropdown = !isDropdown"
                  class="relative z-10 flex items-center text-sm text-gray-600 border border-transparent rounded-md hover:bg-indigo-50 focus:outline-none"
                >
                  <div
                    class="flex items-center text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <img
                      v-if="session.$state.image"
                      class="flex-shrink-0 object-cover mx-1 rounded-full w-12 h-12"
                      src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="kikao avatar profile image"
                    />
                    <div v-else class="flex">
                      <Avatar
                        class="h-6 w-6 flex-shrink-0 object-cover mx-1 rounded-full"
                      />
                      <p>{{ session.$state.username }}</p>
                    </div>
                  </div>
                  <DropdownIcon />
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
                  class="absolute right-0 z-20 w-56 mt-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                >
                  <div class="flex text-1xl">
                    <div
                      class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300"
                    >
                      <img
                        v-if="session.$state.image"
                        class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                        src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="kikao avatar image"
                      />
                      <Avatar
                        v-else
                        class="h-8 w-8 flex-shrink-0 object-cover mx-1 rounded-full"
                      />
                    </div>
                    <div class="mx-1">
                      <h1
                        class="text-sm font-semibold text-gray-700 dark:text-gray-200"
                      >
                        {{ userData.username }}
                      </h1>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ userData.email }}
                      </p>
                    </div>
                  </div>
                  <hr class="border-gray-200 dark:border-gray-700" />
                  <a
                    href="/dashboard"
                    class="flex items-center p-3 text-base capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <Avatar class="h-8 w-8" />
                    <span class="mx-1"> view profile </span>
                  </a>
                  <a
                    href="/dashboard"
                    class="flex items-center p-3 text-base text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <MacOptions />
                    <span class="mx-1"> Dashboard</span>
                  </a>
                  <hr class="border-gray-200 dark:border-gray-700" />
                  <a
                    href="/faq"
                    class="flex items-center p-3 text-base text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <Question />
                    <span class="mx-1"> Help </span>
                  </a>
                  <a
                    @click="logOut"
                    class="flex font-bold items-center cursor-pointer hover:text-white p-3 text-base text-red-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <SignOut class="text-red-500" />
                    <span class="mx-1 font-extrabold ml-3"> Sign Out </span>
                  </a>
                </div>
              </div>
              <!-- end of avatar section -->
            </div>
            <div v-else>
              <BrandedButton
                :text="`Login`"
                :action="store.toggleLogin"
                class="mr-4 bg-indigo-50 hover:text-white font-normal"
              />
              <BrandedButton
                :text="`Sign up`"
                :action="store.toggleSignup"
                class="font-normal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
