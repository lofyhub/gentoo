<script setup lang="ts">
import XIcon from "@/components/icons/XIcon.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import LockIcon from "@/components/icons/LockIcon.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import { toastError, toastSuccess, toastWarning } from "@/plugins/toast";

import { ref } from "vue";
import { useRootStore } from "@/store/index";
import { useSessionStore } from "@/store/session";
import regex from "@/config/regex";
import axios from "axios";
import router from "@/router";
import { env } from "@/env";

const store = useRootStore();
const sessionStore = useSessionStore();
// refs
const email = ref(``);
const password = ref(``);
const loading = ref(false);

// methods

function close() {
  store.toggleLogin();
}

async function signIn() {
  if (!email.value || !password.value) {
    toastWarning(`Please enter email and password`);
    return;
  }

  if (!regex.emailRegex.test(email.value)) {
    toastWarning(`Please enter a valid email address`);
    return;
  }
  try {
    loading.value = true;
    const bodyData = {
      email: email.value,
      password: password.value,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`${env}/signin`, bodyData, config);
    const data = await res.data;
    sessionStore.setSessionData(data.user);
    // TODO: Find a beter way of storing the token i.e HTTPONLY coockie -- security concerns --
    localStorage.setItem("kikao-token", `${data.token}`);
    if (res.status === 200) {
      toastSuccess(`Login successful! Welcome back 👋`);
      store.toggleLogin();
      router.push("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toastWarning(error.response.data.message);
    } else {
      toastError(error as string);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <!-- Photo popup -->
  <div
    class="popup bg-gray-600 modal-animation transition-all transform fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="close"
  >
    <button
      class="bg-gray-300 dark:bg-gray5 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
      @click="close"
    >
      <XIcon class="w-6 h-6" />
    </button>
    <!-- start of form -->
    <div class="rounded-sm overflow-hidden">
      <div
        class="flex flex-col w-full lg:w-96 mx-auto h-auto items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-white border-t-4 border-indigo-500"
      >
        <div class="w-full max-w-md space-y-8">
          <div>
            <LogoIcon class="w-12 h-12 mx-auto w-auto" />
            <h1 class="text-3xl text-slate-800 font-semibold mt-3 text-center">
              Welcome back! ✨
            </h1>
          </div>
          <div class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  v-model="email"
                  autocomplete="email"
                  required
                  class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model="password"
                  autocomplete="current-password"
                  required
                  class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                  >Remember me</label
                >
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >Forgot your password?</a
                >
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="signIn"
              >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon />
                </span>
                <SpinnerIcon v-if="loading" />
                <p v-else>Sign in</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center bg-indigo-50 py-6 text-gray-600">
        <p class="inline">Don't have an account?</p>
        <a
          class="ml-3 text-indigo-600 font-semibold cursor-pointer underline underline-offset-8"
          @click="store.toggleLogin(), router.push('/signup')"
          >Sign Up</a
        >
      </div>
    </div>

    <!-- end of form -->
  </div>
</template>
