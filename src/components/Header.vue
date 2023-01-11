<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import BrandedButton from "@/components/BrandedButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store/index";

const session = useSessionStore();
const store = useRootStore();
const route = useRoute();
const isOpen = ref(false);
// methods
</script>

<template>
  <nav x-data="{ isOpen: false }" class="relative shadow dark:bg-gray-800">
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
            <div v-if="session.$state.id">
              <BrandedButton
                :text="`Login`"
                :action="store.toggleLogin"
                class="mr-4 bg-indigo-50 hover:text-white"
              />
              <BrandedButton :text="`Sign up`" :action="store.toggleSignup" />
            </div>
            <div v-else>
              <button
                type="button"
                class="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <div
                  class="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full"
                >
                  <img
                    src="https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    class="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>

                <h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                  Kikao
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
