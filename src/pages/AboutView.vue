<script setup lang="ts">
import { useHead } from "unhead";

useHead({
  title: "Kikao | About",
});
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="w-full mx-auto lg:w-2/5">
      <h1 class="text-4xl text-center font-bold py-10">About Kikao</h1>
      <div class="text-lg pb-10">
        <p class="">
          Welcome to Kikao, the ultimate online platform for finding your next
          rental home, stays or attractions. Whether you're a student looking
          for a cozy apartment, a family searching for a spacious house, or a
          professional looking for a place to call your own, we've got you
          covered. Our website is designed to make your search as easy and
          stress-free as possible, with a wide variety of listings to choose
          from, all sourced from locations all across the country.
        </p>
        <p class="py-2">
          Our listings are more than just pictures and addresses, we offer
          detailed information about the properties, including the number of
          bedrooms and bathrooms, square footage, amenities and more.
          Additionally, we also include high-resolution photos that showcase the
          beauty and potential of each property, providing you with a clear
          visual of what to expect when you visit.
        </p>
        <p class="py-2">
          At Kikao, our goal is to provide you with the best rental home search
          experience, so you can find your dream home without any hassle. We
          strive to make the process of finding a new home as easy and enjoyable
          as possible, so you can focus on what really matters: making your new
          place your own. Browse our listings today and start planning your next
          move with Kikao!
        </p>
      </div>
      <figure class="max-w-screen-md mx-auto text-center py-6">
        <svg
          aria-hidden="true"
          class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p class="text-2xl italic font-medium text-gray-900 dark:text-white">
            "Welcome to our listing website! We're excited to help you find the
            perfect tenant for your property. With our platform, you'll have
            access to a wide range of potential renters, and you'll be able to
            showcase your property in the best possible light. So go ahead,
            upload those high-quality images, add all the details, and let's
            make this a stress-free and successful experience for you. Happy
            listing!"
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center mt-6 space-x-3">
          <img
            class="w-6 h-6 rounded-full"
            src="https://johnphilip.dev/_nuxt/johnphilipavatar.d4b3753f.jpeg"
            alt="profile picture"
            loading="lazy"
          />
          <div
            class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
          >
            <cite class="pr-3 font-medium text-gray-900 dark:text-white"
              >John Philip</cite
            >
            <cite
              class="pl-3 text-base font-light text-gray-500 dark:text-gray-400"
              >Founder of Kikao</cite
            >
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
