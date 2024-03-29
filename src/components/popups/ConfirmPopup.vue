<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";

import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import axios from "axios";
import { env } from "@/env";
import { toastError, toastSuccess } from "@/plugins/toast";
import { useRootStore } from "@/store";

const props = withDefaults(
  defineProps<{
    listingId: string;
    userId: string;
  }>(),
  {}
);

const store = useRootStore();
const emit = defineEmits(["close", "confirm"]);
const deleting = ref(false);
// methods

async function handleDeletion() {
  deleting.value = true;
  try {
    const id = props.listingId;
    const accountId = props.userId;
    const token = localStorage.getItem("kikao-token");
    if (!token) throw new Error("Token is not found in localStorage");
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    const data = { _id: id, accountId: accountId };
    const res = await axios.delete(`${env}/user/listings`, {
      data: data,
      headers: headers,
    });
    if (res.status === 200) {
      toastSuccess("Successfully deleted your listing");
      store.removeDeletedListing(props.listingId);
      emit("close");
    }
  } catch (error) {
    toastError(error as string);
  } finally {
    deleting.value = false;
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
            <p
              class="text-gray-800 dark:text-black font-normal text-2xl tracking-[1px]"
            >
              Delete listing
            </p>
            <button
              class="bg-gray-300 dark:bg-gray-500 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
              @click="$emit(`close`)"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          <p class="text-gray-400 dark:text-black font-normal text-lg py-2">
            Are you sure you want to delete this listing? By doing so, you will
            loose all details related to this listing. This action cannot be
            undone.
          </p>
        </div>
        <div class="flex flex-row-reverse py-6 bg-gray-100 px-8">
          <button
            class="bg-red-500 text-white opacity-100 hover:bg-red-700 px-8 opacity-100 py-2.5 focus:outline-none font-medium rounded-md text-sm text-center ml-2"
            @click="handleDeletion"
          >
            <SpinnerIcon v-if="deleting" class="w-4 h-4 my-1" />
            <p v-else>Confirm</p>
          </button>
          <button
            type="button"
            @click="$emit(`close`)"
            class="text-gray-900 font-bold px-8 py-2 focus:ring-4 focus:outline-none font-medium rounded-sm text-sm text-center mr-3 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
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
