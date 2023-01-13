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
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";

const session = useSessionStore();
const store = useRootStore();
const route = useRoute();
const isOpen = ref(false);
const userData = computed(() => session.$state);
// methods
function logOut() {
  session.$reset();
  sessionStorage.removeItem("x-access-token");
}
</script>

<template>
  <nav
    x-data="{ isOpen: false }"
    class="relative shadow dark:bg-gray-800 sticky top-0 left-0 w-full bg-white"
  >
    <div class="container px-32 py-3 mx-auto">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-gray-700">
            <a
              class="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
              href="/"
            >
              <LogoIcon class="w-7 h-7 inline" />
              <span
                v-if="route.name === `Applications`"
                class="text-2xl font-extrabold ml-2"
                >Add Listings</span
              >
              <span v-else class="text-2xl font-extrabold ml-2">Kikao</span></a
            >
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              x-cloak
              @click="isOpen = !isOpen"
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg
                x-show="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>

              <svg
                x-show="isOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
            class="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 font-black text-base"
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
            <a
              href="/addlistings"
              class="px-4 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              >Add listing</a
            >
          </div>
          <div class="flex items-center mt-4 lg:mt-0">
            <div v-if="userData._id">
              <!-- start avatar seciton -->
              <div x-data="{ isOpen: true }" class="relative inline-block">
                <!-- Dropdown toggle button -->
                <button
                  @click="isOpen = !isOpen"
                  class="relative z-10 flex items-center text-sm text-gray-600 border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
                >
                  <a
                    href="#"
                    class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <img
                      class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                      src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                      alt="jane avatar"
                    />
                    <div class="mx-1">
                      <h1
                        class="text-sm font-semibold text-gray-700 dark:text-gray-200"
                      >
                        {{ userData.username }}
                      </h1>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{
                          userData.email.slice(0, 2) +
                          "xxx" +
                          userData.email.slice(5)
                        }}
                      </p>
                    </div>
                  </a>
                  <DropdownIcon />
                </button>

                <!-- Dropdown menu -->
                <div
                  v-show="isOpen"
                  @mouseleave="isOpen = false"
                  x-transition:enter="transition ease-out duration-100"
                  x-transition:enter-start="opacity-0 scale-90"
                  x-transition:enter-end="opacity-100 scale-100"
                  x-transition:leave="transition ease-in duration-100"
                  x-transition:leave-start="opacity-100 scale-100"
                  x-transition:leave-end="opacity-0 scale-90"
                  class="absolute right-0 z-20 w-56 mt-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                >
                  <a
                    href="#"
                    class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <Avatar />
                    <span class="mx-1"> view profile </span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <MacOptions />
                    <span class="mx-1"> Dashboard</span>
                  </a>
                  <hr class="border-gray-200 dark:border-gray-700" />
                  <a
                    href="/faq"
                    class="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <Question />
                    <span class="mx-1"> Help </span>
                  </a>
                  <a
                    @click="logOut"
                    class="flex items-center p-3 text-sm text-red-500 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <SignOut class="text-red-500 hover:text-white" />
                    <span class="mx-1 font-extrabold hover:text-white ml-3">
                      Sign Out
                    </span>
                  </a>
                </div>
              </div>
              <!-- end of avatar section -->
            </div>
            <div v-else>
              <BrandedButton
                :text="`Login`"
                :action="store.toggleLogin"
                class="mr-4 bg-indigo-50 hover:text-white"
              />
              <BrandedButton :text="`Sign up`" :action="store.toggleSignup" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
