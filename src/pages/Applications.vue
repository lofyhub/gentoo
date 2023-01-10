<script setup lang="ts">
import { onMounted } from "vue";
import ClipboardIcon from "@/components/icons/ClipboardIcon.vue";
import { toastSuccess } from "@/plugins/toast";
onMounted(async () => {
  toastSuccess("Component loaded successfully");
});
</script>
<template>
  <div class="flex bg-white py-10">
    <!-- sidebar start -->
    <div class="w-3/12"></div>
    <!-- sidebar end -->
    <!-- All applicaaion -->
    <div class="w-5/12"></div>
    <!-- end all application -->
    <!-- start user profile -->
    <div class="w-3/12">
      <div class="flex justify-around">
        <h2 class="font-bold text-base">Rental Application</h2>
        <div>
          <button class="py-1 px-3 bg-indigo-500 text-white text-sm rounded">
            <ClipboardIcon class="inline w-4 h-4" /> Export as PDF
          </button>
        </div>
      </div>
      <!-- start profile -->
      <div class="border-2 border-gray-200 my-4 mx-8 bg-white rounded">
        <div class="text-center my-10">
          <img
            src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Headshot photo og Thyrone Paas from Pexels"
            srcset=""
            class="w-20 h-20 rounded-full inline object-cover bg-cover"
          />
          <h3 class="font-bold text-xl pt-2">John Philip</h3>
          <p class="text-gray-500">Houston, TX</p>
          <div class="mx-8 pt-3">
            <h5 class="py-2 px-4 bg-indigo-50 text-indigo-500 rounded text-sm">
              518 ・・・ ・・・ Show SSN
            </h5>
          </div>
        </div>
        <!-- profile details start -->
        <div class="mx-8">
          <hr />
          <div class="flex justify-between my-3">
            <h4>Date of birth</h4>
            <span class="font-semibold">09-05-1985</span>
          </div>
          <hr />
          <div class="flex justify-between my-3">
            <h4>Age</h4>
            <span class="font-semibold">36 years old</span>
          </div>
          <hr />
          <div class="flex justify-between my-3">
            <h4>Email</h4>
            <span class="font-semibold">johnphilip@gmail.com</span>
          </div>
          <hr />
          <div class="flex justify-between my-3">
            <h4>Phone Number</h4>
            <span class="font-semibold">202-555-0159</span>
          </div>
          <hr />
        </div>
        <!-- profile details end -->
      </div>
    </div>
    <!-- end user profile -->
  </div>
</template>
