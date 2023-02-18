<script setup lang="ts">
import { formatDate } from "@/helpers/helpers";
import { ref, defineProps, withDefaults } from "vue";
import { userPublisher } from "@/temp/types";

const open = ref(false);

const prop = withDefaults(
  defineProps<{
    profile: userPublisher;
  }>(),
  {}
);
</script>
<template>
  <section
    class="flex flex-col justify-center antialiased text-gray-600 h-auto p-4"
  >
    <!-- Card -->
    <div class="max-w-[800px] mx-auto">
      <div class="flex flex-col h-full">
        <!-- Card top -->
        <div class="flex-grow p-5">
          <div class="flex justify-between items-start">
            <!-- Image + name -->
            <header>
              <div class="flex my-3 lg:gap-20">
                <div class="items-start mr-5">
                  <img
                    class="rounded-full w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-cover object-cover shadow transition-opacity"
                    src="https://images.pexels.com/photos/2755167/pexels-photo-2755167.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="kikao dashboard user avatar image"
                    loading="lazy"
                  />
                </div>
                <div class="mt-1 pr-1">
                  <a
                    class="inline-flex text-gray-800 hover:text-gray-900"
                    href="#0"
                  >
                    <h2
                      class="text-xl leading-snug justify-center font-semibold"
                    >
                      {{ prop.profile.username }}
                    </h2>
                  </a>
                  <!-- Bio -->
                  <div class="mt-2">
                    <div class="text-gray-400">{{ prop.profile.email }}</div>
                  </div>
                  <div class="mt-2">
                    <div class="text-sm">
                      {{
                        prop.profile.kikaoType === "Landlord"
                          ? "Landlord"
                          : "Tenant"
                      }}
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="text-sm">
                      {{ formatDate(prop.profile.date) }}
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
