<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";

import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import { houseSchema } from "@/temp/housestemp";
import { useSessionStore } from "@/store/session";
import { env } from "@/env";
import {
  toastWarning,
  toastError,
  toastSuccess,
  toastMessage,
} from "@/plugins/toast";
import { lAuthor } from "@/store/listing";
import axios from "axios";

const props = withDefaults(
  defineProps<{
    listing: houseSchema;
    listingAuthor: lAuthor;
  }>(),
  {}
);

const store = useSessionStore();
const emit = defineEmits(["close", "confirm"]);
const loading = ref(false);
const telephoneNumber = ref();
const selectedDate = ref(``);
const selectedTime = ref(``);

// methods
async function handleBooking() {
  if (!telephoneNumber.value || !selectedDate.value || !selectedTime.value) {
    toastMessage("Please fill all the details");
    return;
  }
  try {
    loading.value = true;
    const token = localStorage.getItem("kikao-token");
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    const data = {
      userid: store.$state.userId,
      telephone: telephoneNumber.value,
      name: store.$state.username,
      listingId: props.listing.id,
      selectedDate: selectedDate.value,
      selectedTime: selectedTime.value,
      bookingFor: props.listingAuthor.userId,
    };
    await axios.post(`${env}/bookings`, { ...data }, { headers: headers });
    toastSuccess(`Successfully booked ${props.listing.name}`);
    (telephoneNumber.value = ``),
      (selectedDate.value = ``),
      (selectedTime.value = ``);
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
  <div
    class="popup bg-gray-600 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="$emit(`close`)"
  >
    <section>
      <div
        class="w-auto lg:w-600 bg-white dark:bg-darkBGStop card-animation z-10 overflow-y-auto rounded-sm pt-4 shadow-lg font-normal"
      >
        <div class="px-8 py-8">
          <div class="flex justify-between">
            <div>
              <p
                class="text-gray-800 dark:text-black font-normal text-2xl tracking-[1px]"
              >
                Book {{ props.listing.name }}
              </p>
              <span class="text-gray-500 font-normal py-3 text-base">
                Location : {{ props.listing.location }}</span
              >
            </div>
            <button
              class="bg-gray-300 dark:bg-gray-500 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
              @click="$emit(`close`)"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          <!-- start booking form -->
          <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
              <form>
                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="fName"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fName"
                        id="fName"
                        :placeholder="`${store.$state.username}`"
                        class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label
                    for="guest"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Whats your working phone number?
                  </label>
                  <input
                    type="number"
                    name="tel"
                    id="tel"
                    v-model="telephoneNumber"
                    placeholder="phone number here"
                    min="0"
                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="date"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        v-model="selectedDate"
                        id="date"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="time"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        v-model="selectedTime"
                        name="time"
                        id="time"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end booking form -->
        </div>
        <div class="flex flex-row-reverse py-6 bg-gray-100 px-8">
          <button
            class="bg-red-500 text-white opacity-100 hover:bg-red-700 border px-8 py-2.5 border-red-500 focus:outline-none font-medium rounded text-sm text-center ml-2 dark:border-red-500 dark:text-white dark:hover:text-white"
            @click="handleBooking()"
          >
            <SpinnerIcon v-if="loading" class="w-4 h-4 my-1" />
            <p v-else>Confirm booking</p>
          </button>
          <button
            type="button"
            @click="emit(`close`)"
            class="text-gray-900 font-bold px-8 py-2 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-sm text-sm text-center mr-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.dropdownInfoOpen::before {
  content: "";
  position: absolute;
  top: -0.5rem;
  left: 0.95rem;
  transform: rotate(45deg);
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 2px;
  z-index: 1;
}
.dropdownInfoOpenDark::before {
  content: "";
  position: absolute;
  top: -0.5rem;
  left: 0.95rem;
  transform: rotate(45deg);
  width: 1rem;
  height: 1rem;
  background-color: #121212;
  border-radius: 2px;
  z-index: 1;
}
</style>
