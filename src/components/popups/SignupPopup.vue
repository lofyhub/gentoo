<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "@/store/index";
import { toastMessage, toastSuccess, toastWarning } from "@/plugins/toast";
import regex from "@/config/regex";
import axios from "axios";

import XIcon from "@/components/icons/XIcon.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const store = useRootStore();
const name = ref(``);
const email = ref(``);
const password = ref(``);
const password2 = ref(``);
const kikaotype = ref(``);
const loading = ref(false);
// methods
function close() {
  store.toggleSignup();
}

async function signUp() {
  if (!name.value || !email.value || !password.value || !kikaotype.value) {
    toastWarning(`Please enter all field details`);
    return;
  }

  if (password.value !== password2.value) {
    toastMessage(`Password mismatch`);
    return;
  }

  if (!regex.emailRegex.test(email.value)) {
    toastMessage(`Enter a valid email address`);
    return;
  }
  const bodyData = {
    email: email.value,
    password: password.value,
    username: name.value,
    kikaotype: kikaotype.value,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  loading.value = true;
  try {
    await axios.post("http://localhost:9000/signup", bodyData, config);
    // close signup poup and trigget login  popup
    store.toggleSignup();
    store.toggleLogin();
    // reset values here
    email.value = ``;
    password.value = ``;
    name.value = ``;
    kikaotype.value = ``;
    toastSuccess("Sucessfully created your account");
  } catch (error) {
    loading.value = false;
    toastWarning(error as string);
  }
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
              v-model="name"
              placeholder="Full Name"
            />
            <input
              type="text"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="email"
              placeholder="Email"
            />
            <div class="flex my-3">
              <div class="flex items-center mr-6">
                <input
                  id="tenant"
                  type="radio"
                  v-model="kikaotype"
                  value="tenant"
                  class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-2-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-indigo-300"
                  >Tenant</label
                >
              </div>
              <div class="flex items-center mr-4">
                <input
                  checked
                  id="landlord"
                  value="landlord"
                  type="radio"
                  v-model="kikaotype"
                  class="w-4 h-4 text-indigo-600 bg-indigo-100 border-indigo-300 rounded dark:bg-gray-700 dark:border-gray-600"
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
              v-model="password"
              placeholder="Password"
            />
            <input
              type="password"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="password2"
              placeholder="Confirm Password"
            />

            <button
              v-show="!loading"
              type="submit"
              class="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="signUp()"
            >
              Create Account
            </button>
            <div class="flex justify-center pt-3">
              <SpinnerIcon v-show="loading" style="padding: 0.1em" />
            </div>

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
                href="/policy"
              >
                Terms of Service
              </a>
              and
              <a
                class="no-underline border-b border-grey-dark text-grey-dark"
                href="/policy"
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
