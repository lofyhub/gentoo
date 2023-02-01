<script setup lang="ts">
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
</script>

<template>
  <div class="lg:w-[1200px] w-full mx-auto font-normal pt-8 pb-20">
    <h2 class="h2 text-center py-3">Why Choose Kikao</h2>
    <!-- Why choose kikao -->
    <div
      class="flex flex-wrap flex-col lg:flex-row justify-center items-center text-justify ml-6 lg:ml-0 pt-4"
    >
      <div class="w-4/5 lg:w-2/5 mr-6 h-auto py-4">
        <div class="text-xl py-3 flex lg:text-left text-center">
          <CheckCircleIcon class="fill-indigo-50 mx-3 w-7 h-7" />
          <p
            class="text-[19px] font-extrabold leading-7 tracking-wider mb-[8px] font-normal text-gray-700 capitalize dark:text-white"
          >
            Comprehensive listings
          </p>
        </div>
        <p class="text-[16px] font-normal leading-[26px]">
          Kikao offers a wide range of houses for renting and sale, including
          apartments, townhouses, busineess shops and single-family homes. This
          makes it easy for you to find the perfect property that meets your
          needs and preferences.
        </p>
      </div>
      <div class="w-4/5 lg:w-2/5 h-auto my-2">
        <div class="text-xl py-3 flex">
          <CheckCircleIcon class="fill-indigo-50 mx-3 w-7 h-7" />
          <p
            class="text-[19px] font-extrabold leading-7 tracking-wider mb-[8px] font-normal text-gray-700 capitalize dark:text-white"
          >
            User-friendly interface
          </p>
        </div>
        <p class="text-[16px] font-normal leading-[26px]">
          Kikao's website is designed with user experience in mind, making it
          easy for you to search for properties, save your favorite listings,
          and schedule property tours.
        </p>
      </div>
      <div class="w-4/5 lg:w-2/5 mr-6 h-auto py-2">
        <div class="text-xl py-3 flex">
          <CheckCircleIcon class="fill-indigo-50 mx-3 w-7 h-7" />
          <p
            class="text-[19px] font-extrabold leading-7 tracking-wider mb-[8px] font-normal text-gray-700 capitalize dark:text-white"
          >
            Up-to-date information
          </p>
        </div>

        <p class="text-[16px] font-normal leading-[26px]">
          Kikao's listings are constantly updated, providing potential tenant
          and buyers with the most current information on properties, such as
          pricing, availability, and photos.
        </p>
      </div>
      <div class="w-4/5 lg:w-2/5 h-auto py-2">
        <div class="text-xl py-3 flex">
          <CheckCircleIcon class="fill-indigo-50 mx-3 w-7 h-7" />
          <p
            class="text-[19px] font-extrabold leading-7 tracking-wider mb-[8px] font-normal text-gray-700 capitalize dark:text-white"
          >
            Advanced search filters
          </p>
        </div>
        <p class="text-[16px] font-normal leading-[26px]">
          Kikao's advanced search filters allow you to narrow down your search
          based on specific criteria such as location, price range, number of
          bedrooms, and more.
        </p>
      </div>
    </div>
  </div>
</template>
