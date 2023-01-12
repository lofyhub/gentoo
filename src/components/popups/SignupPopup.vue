<script setup lang="ts">
import { useRootStore } from "@/store/index";

import XIcon from "@/components/icons/XIcon.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const store = useRootStore();

function close() {
  store.toggleSignup();
}
</script>

<template>
  <!-- Photo popup -->
  <div
    class="popup bg-gray-600 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="close"
  >
    <button
      class="bg-gray-300 dark:bg-gray5 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
      @click="close"
    >
      <XIcon class="w-6 h-6" />
    </button>
    <div>
      <div class="flex flex-col">
        <div
          class="container w-full mx-auto flex-1 flex flex-col items-center justify-center px-2"
        >
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <LogoIcon class="w-12 h-12 mx-auto w-auto" />
            <h1
              class="my-4 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              Sign up
            </h1>
            <input
              type="text"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="fullname"
              placeholder="Full Name"
            />

            <input
              type="text"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="email"
              placeholder="Email"
            />
            <div class="flex my-3">
              <div class="flex items-center mr-6">
                <input
                  id="inline-2-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-2-checkbox"
                  class="ml-2 text-sm font-medium text-indigo-900 dark:text-indigo-300"
                  >Tenant</label
                >
              </div>
              <div class="flex items-center mr-4">
                <input
                  checked
                  id="inline-checked-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-indigo-600 bg-indigo-100 border-indigo-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-checked-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Landlord</label
                >
              </div>
            </div>
            <input
              type="password"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              name="confirm_password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              class="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Account
            </button>
            <div class="flex -space-x-4 py-2 justify-center">
              <img
                class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://images.pexels.com/photos/3483800/pexels-photo-3483800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <img
                class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://images.pexels.com/photos/14267849/pexels-photo-14267849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <img
                class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://images.pexels.com/photos/14617008/pexels-photo-14617008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <img
                class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://images.pexels.com/photos/7860729/pexels-photo-7860729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <img
                class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <a
                class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                href="#"
                >+99</a
              >
              <P class="pl-6 mt-2 font-semibold">Join others on Kikao</P>
            </div>

            <div class="text-center text-sm text-grey-dark mt-2">
              By signing up, you agree to the
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="/privacy"
              >
                Terms of Service
              </a>
              and
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="/privacy"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
