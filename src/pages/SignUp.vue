<script setup lang="ts">
import { useSessionStore } from "@/store/session";
import LeftIcon from "@/components/icons/LeftIcon.vue";
import ArrowLeft from "@/components/icons/ArrowLeft.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import EyeIconClose from "@/components/icons/EyeIconClose.vue";

import regex from "@/config/regex";
import axios from "axios";
import { ref } from "vue";

import { useRootStore } from "@/store/index";
import {
  toastError,
  toastMessage,
  toastSuccess,
  toastWarning,
} from "@/plugins/toast";
import { env } from "@/env";

const store = useRootStore();
const session = useSessionStore();
const step = ref(0);
const name = ref(``);
const email = ref(``);
const password = ref(``);
const password2 = ref(``);
const kikaotype = ref(``);
const city = ref(``);
const businessType = ref<`individual` | `organization` | ``>(``);
const businesname = ref(``);
const location = ref(``);
const loading = ref(false);
const phone = ref<number>();
const showPass = ref(false);

// methods

async function submitForm(): Promise<void> {
  if (!name.value || !email.value || !password.value || !kikaotype.value) {
    toastWarning(`Please enter all field details`);
    return;
  }
  if (!regex.emailRegex.test(email.value)) {
    toastMessage(`Enter a valid email address`);
    return;
  }

  if (password.value !== password2.value) {
    toastMessage(`Password mismatch`);
    return;
  }

  const bodyData = {
    email: email.value.trim(),
    password: password.value.trim(),
    username: name.value.trim(),
    kikaotype: kikaotype.value.trim(),
    businesname: businesname.value.trim(),
    location: location.value.trim(),
    phone: phone.value,
    businessType: businessType.value.trim(),
    city: city.value.trim(),
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    loading.value = true;
    await axios.post(`${env}/signup`, bodyData, config);
    // reset values here
    toastSuccess("Sucessfully created your account");
    (email.value = ``),
      (password.value = ``),
      (kikaotype.value = ``),
      (businesname.value = ``),
      (location.value = ``),
      (phone.value = 0),
      (businessType.value = ``),
      (city.value = ``);
    step.value = 3;
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
function nextStep(): void {
  if (!kikaotype.value) {
    toastMessage("Please select either tenant or landlord");
    return;
  }
  if (kikaotype.value === `tenant` && step.value === 1) {
    submitForm();
    return;
  } else if (kikaotype.value === `landlord` && step.value === 3) {
    submitForm();
    return;
  }

  if (
    step.value === 1 &&
    kikaotype.value === `landlord` &&
    !businessType.value
  ) {
    toastMessage("Please select your business type");
    return;
  }
  if (step.value === 2 && kikaotype.value === `landlord`) {
    submitForm();
    return;
  }
  step.value = step.value += 1;
}
function stepBack(): void {
  step.value = step.value -= 1;
}

function updateKikaotype(type: string): void {
  kikaotype.value = type;
}
function updateBusinesstype(type: "individual" | "organization"): void {
  businessType.value = type;
}
</script>

<template>
  <div class="bg-white pt-20 min-h-screen" v-if="!session.$state.userId">
    <div class="w-3/4 lg:w-1/3 mx-auto relative bg-white py-[50px]">
      <div class="relative">
        <div
          class="left-0 w-full absolute bg-slate-200 h-0.5 mt-[-1px] top-3/4"
          aria-hidden="true"
        ></div>
        <ul class="flex w-full list-none justify-between pt-6 relative">
          <li>
            <a
              class="flex items-center justify-center rounded-full font-semibold text-xs text-white w-6 h-6"
              :style="
                step > -1
                  ? `background-color: rgb(99 102 241)`
                  : `background-color: rgb(241 245 249)`
              "
              >1</a
            >
          </li>
          <li>
            <a
              class="flex items-center justify-center rounded-full font-semibold text-xs text-white w-6 h-6 text-slate-500"
              :style="
                step > 0
                  ? `background-color: rgb(99 102 241) ; color: rgb(255 255 255);`
                  : `background-color: rgb(241 245 249)`
              "
              >2</a
            >
          </li>
          <li>
            <a
              class="flex items-center justify-center rounded-full font-semibold text-xs text-white w-6 h-6 text-slate-500"
              :style="
                step > 1
                  ? `background-color: rgb(99 102 241); color: rgb(255 255 255);`
                  : `background-color: rgb(241 245 249)`
              "
              >3</a
            >
          </li>
          <li>
            <a
              class="flex items-center justify-center rounded-full font-semibold text-xs text-white w-6 h-6 text-slate-500"
              :style="
                step > 2
                  ? `background-color: rgb(99 102 241); color: rgb(255 255 255);`
                  : `background-color: rgb(241 245 249)`
              "
              >4</a
            >
          </li>
        </ul>
      </div>

      <!-- start of step one -->
      <div v-if="step === 0" class="transition-all transform pt-20">
        <h1 class="text-3xl text-slate-800 font-bold py-[48px]">
          Tell us what’s your situation ✨
        </h1>
        <div class="flex flex-col">
          <div
            class="flex items-center bg-white gap-6 transition-all transform text-sm cursor-pointer p-4 my-4 text-slate-800 dw rounded border hover--border-slate-300"
            :class="
              kikaotype === `landlord`
                ? `border-indigo-500`
                : `border-slate-200`
            "
            @click="updateKikaotype(`landlord`)"
          >
            <svg
              class="fill-current h-6 h-6 block mx-4 align-middle"
              viewBox="0 0 24 24"
            >
              <path
                class="text-indigo-500"
                d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
              ></path>
              <path
                class="text-indigo-300"
                d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
              ></path>
              <path
                class="text-indigo-200"
                d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z"
              ></path>
            </svg>
            <div>
              <h2 class="text-xl font-normal">I am a Landlord</h2>
              <p class="text-gray-500 text-sm py-1">
                I am here to list a property
              </p>
            </div>
          </div>
          <div
            class="flex items-center transition-all transform gap-6 bg-white text-sm cursor-pointer p-4 my-4 text-slate-800 dw rounded border hover--border-slate-300"
            :class="
              kikaotype === `tenant` ? `border-indigo-500` : `border-slate-200`
            "
            @click="updateKikaotype(`tenant`)"
          >
            <svg
              class="fill-current h-6 h-6 block mx-4 align-middle"
              viewBox="0 0 24 24"
            >
              <path
                class="text-indigo-500"
                d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
              ></path>
            </svg>
            <div>
              <h2 class="text-xl font-normal">I am a Tenant</h2>
              <p class="text-gray-500 text-sm py-1">
                I am searching for a house
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 1" class="pt-20">
        <div v-if="kikaotype === `landlord`">
          <h1 class="text-3xl text-slate-800 font-bold py-[48px]">
            Tell us about your business ✨
          </h1>
          <div class="flex py-8">
            <div
              class="w-52 h-48 bg-white rounded text-center py-6 px-4 border mr-6 cursor-pointer transition ease-in-out"
              :class="
                businessType === `individual`
                  ? `border-indigo-500`
                  : `border-slate-200`
              "
              @click="updateBusinesstype(`individual`)"
            >
              <svg
                class="inline-flex fill-current w-10 h-10 mb-2 align-middle"
                viewBox="0 0 40 40"
              >
                <circle class="text-indigo-100" cx="20" cy="20" r="20"></circle>
                <path
                  class="text-indigo-500"
                  d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
                ></path>
              </svg>
              <p class="text-slate-800 font-semibold mb-1">Individual</p>
              <span>You run your business on your own</span>
            </div>
            <div
              class="w-52 h-48 bg-white rounded-sm text-center py-6 px-4 border cursor-pointer transition-all transform"
              :class="
                businessType === `organization`
                  ? `border-indigo-500`
                  : `border-slate-200`
              "
              @click="updateBusinesstype(`organization`)"
            >
              <svg
                class="inline-flex fill-current w-10 h-10 mb-2 align-middle"
                viewBox="0 0 40 40"
              >
                <circle class="text-indigo-100" cx="20" cy="20" r="20"></circle>
                <path
                  class="text-indigo-500"
                  d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
                ></path>
                <circle class="text-indigo-100" cx="20" cy="20" r="20"></circle>
                <path
                  class="text-indigo-300"
                  d="m30.377 22.749-3.709-1.5a1 1 0 0 1-.623-.926v-.878A3.989 3.989 0 0 0 28.027 16v-1.828c.047-2.257-1.728-4.124-3.964-4.172-2.236.048-4.011 1.915-3.964 4.172V16a3.989 3.989 0 0 0 1.982 3.445v.878a1 1 0 0 1-.623.928c-.906.266-1.626.557-2.159.872-.533.315-1.3 1.272-2.299 2.872 1.131.453 6.075-.546 6.072.682V28a2.99 2.99 0 0 1-.182 1h7.119A.996.996 0 0 0 31 28v-4.323a1 1 0 0 0-.623-.928Z"
                ></path>
                <path
                  class="text-indigo-500"
                  d="m22.371 24.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 20 18v-1.828A4.087 4.087 0 0 0 16 12a4.087 4.087 0 0 0-4 4.172V18a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V28a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
                ></path>
              </svg>
              <p class="text-slate-800 font-semibold mb-1">Organization</p>
              <span>Business is run as part of an agency</span>
            </div>
          </div>
        </div>
        <div v-if="kikaotype === `tenant`" class="transition-all transform">
          <h1 class="text-3xl text-slate-800 font-bold py-[48px]">
            Create your profile Account ✨
          </h1>
          <div class="flex flex-col pt-4">
            <input
              type="text"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="name"
              placeholder="Full Name"
            />
            <input
              type="text"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="email"
              placeholder="Email"
            />
            <div class="relative">
              <input
                :type="showPass ? `text` : `password`"
                class="block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                v-model="password"
                placeholder="Password"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer transition ease-in-out"
                @click="showPass = !showPass"
              >
                <EyeIconClose v-if="showPass" />
                <EyeIcon v-else />
              </div>
            </div>
            <input
              type="password"
              class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="password2"
              placeholder="Confirm Password"
            />
          </div>

          <div class="flex -space-x-4 py-4 justify-center">
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
              src="https://images.pexels.com/photos/4450080/pexels-photo-4450080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <img
              class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="https://images.pexels.com/photos/5990737/pexels-photo-5990737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <img
              class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="https://images.pexels.com/photos/3250357/pexels-photo-3250357.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <a
              class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#"
              >+99</a
            >
            <p class="pl-6 mt-2 text-base text-grey-dark">
              Join others on Kikao
            </p>
          </div>

          <div class="text-center text-base text-grey-dark mt-2">
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
      <div v-if="step === 2" class="transition-all transform pt-20">
        <h1 class="text-3xl text-slate-800 font-bold py-[48px]">
          Create your profile Account ✨
        </h1>
        <div class="flex flex-col pt-4">
          <input
            type="text"
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="name"
            placeholder="Full Name"
          />
          <input
            type="text"
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="email"
            placeholder="Email"
          />
          <input
            type="number"
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="phone"
            placeholder="Telephone number"
          />
          <div class="relative">
            <input
              :type="showPass ? `text` : `password`"
              class="block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              v-model="password"
              placeholder="Password"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer transition ease-in-out"
              @click="showPass = !showPass"
            >
              <EyeIconClose v-if="showPass" />
              <EyeIcon v-else />
            </div>
          </div>
          <input
            type="password"
            class="relative block w-full appearance-none my-2 rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            v-model="password2"
            placeholder="Confirm Password"
          />
        </div>

        <div class="flex -space-x-4 py-4 justify-center">
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
            src="https://images.pexels.com/photos/4450080/pexels-photo-4450080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <img
            class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://images.pexels.com/photos/5990737/pexels-photo-5990737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <img
            class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src="https://images.pexels.com/photos/3250357/pexels-photo-3250357.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <a
            class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            href="#"
            >+99</a
          >
          <p class="pl-6 mt-2 text-base text-grey-dark">Join others on Kikao</p>
        </div>

        <div class="text-center text-base text-grey-dark mt-2">
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
      <div v-if="step === 3" class="pt-20">
        <div class="text-center items-center justify-center py-[48px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-indigo-500 inline-flex fill-current w-20 h-20 align-middle"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>

          <h1 class="text-2xl text-slate-800 font-normal py-[48px]">
            Nice to have you {{ name }} on Kikao Inc 🙌
          </h1>
          <button
            class="bg-indigo-500 text-white rounded-sm py-2.5 px-10 text-center mt-4 hover:bg-indigo-600 opacity-100"
            type="button"
            @click="store.toggleLogin()"
          >
            Log In
          </button>
        </div>
      </div>
      <!-- end of step one -->
      <div
        v-show="step !== 4"
        class="flex items-center justify-between py-8 text-sm transition-all transform"
      >
        <div class="underline underline-offset-8 text-sm">
          <button
            class="text-gray-600 rounded py-2.5 px-6 flex underline underline-offset-8"
            type="button"
            @click="stepBack"
            v-if="step > 0 && step !== 3"
          >
            <ArrowLeft class="w-3 h-3 mt-1.5 mx-1" />Back
          </button>
        </div>
        <button
          class="bg-indigo-500 opacity-100 text-white text-sm rounded py-2.5 px-6 flex"
          type="button"
          @click="nextStep()"
          v-if="step < 3"
        >
          <SpinnerIcon v-if="loading" />
          <p v-else class="flex">
            {{
              step === 1 && kikaotype === `tenant`
                ? `Create account`
                : step === 2
                ? `Create account`
                : `Next Step`
            }}
            <LeftIcon />
          </p>
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white pt-20 min-h-screen" v-else>
    <div class="text-center font-normal h-80">
      <p class="text-2xl font-medium">You have recently signed up</p>
      <p class="text-base py-8 font-normal">See popular listings</p>
      <div class="flex justify-center">
        <router-link
          to="/listings"
          class="py-2 px-6 border flex border-indigo-500 opacity-100 rounded text-base text-gray-900 hover:bg-indigo-500 hover:text-white shadow transition transform"
        >
          <span>Go to listings</span>
          <LeftIcon
        /></router-link>
      </div>
    </div>
  </div>
</template>
<style>
.multiselect {
  margin-top: 0.5rem; /* 8px */
  margin-bottom: 0.5rem; /* 8px */
}
.multiselect__tags {
  padding: 0.5rem; /* 16px */
}

li::after,
::before {
  --tw-content: "";
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}
</style>
