<script setup lang="ts">
import { env } from "@/env";
import { onBeforeMount, ref } from "vue";
import { useSessionStore } from "@/store/session";
import { toastWarning, toastError } from "@/plugins/toast";
import axios from "axios";

const session = useSessionStore();
const bookings = ref([]);
console.log("this run fast");

onBeforeMount(async () => {
  await getBookings();
});

async function getBookings() {
  try {
    const id = session.$state.userId;
    const token = localStorage.getItem("kikao-token");
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    const res = await axios.post(
      `${env}/user/bookings`,
      { id: id },
      { headers: headers }
    );
    const { bookings } = res.data;
    bookings.value = [...bookings];
    console.log(bookings.value);
    console.log("this also run fast");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toastWarning(error.response.data.error);
    } else {
      toastError(error as string);
    }
  }
}
</script>

<template>
  <div>
    <div v-for="booking in bookings" :key="booking">
      <p class="text-gray-500">{{ booking }}</p>
    </div>
  </div>

  <!-- <div v-else class="text-center font-normal h-80 mt-20">
    <p class="text-2xl font-medium">No current Bookings available now</p>
    <p class="text-base py-3 font-normal">Your bookings will appear here</p>
  </div> -->
</template>
