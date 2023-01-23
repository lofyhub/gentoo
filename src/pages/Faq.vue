<script setup lang="ts">
import { useHead } from "unhead";

useHead({
  title: "Kikao | Faq",
});
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col justify-start overflow-hidden bg-gray-50 py-10"
  >
    <div class="absolute inset-0 bg-white"></div>
    <div
      class="relative w-full bg-white px-6 pt-8 pb-8 sm:mx-auto sm:max-w-2xl sm:px-10"
    >
      <div class="mx-auto px-5">
        <div class="flex flex-col items-center">
          <h2
            class="mt-5 text-center text-2xl font-semibold tracking-tight md:text-3xl"
          >
            FAQ
          </h2>
          <p class="mt-3 text-lg text-neutral-500 md:text-xl">
            Frequenty asked questions
          </p>
        </div>
        <div class="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl">
                  Q: How do I list my house on the website?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: To list your house on the website, you will need to create an
                account and then follow the prompts to add a listing. You will
                be asked to provide information about your property, including
                its location, size, and features. You will also need to upload
                at least one photograph of your house.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl">
                  Q: Is there a fee to list my house on the website?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: There may be a fee to list your house on the website,
                depending on the specific terms of the service. It is important
                to review the pricing and billing policies before you create a
                listing.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl">
                  Q: How long does my listing stay active?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: The length of time that your listing stays active may vary
                depending on the specific terms of the service. It is important
                to review the listing expiration policies before you create a
                listing.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl"
                  >Q: How do potential tenants contact me about my
                  listing?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: Potential buyers can contact you through the website by using
                the contact form provided on your listing page. You will receive
                an email notification whenever someone inquires about your
                property.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl">
                  Q: Can I make changes to my listing after it has been
                  published?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: Yes, you should be able to make changes to your listing after
                it has been published. You can usually do this by logging in to
                your account and accessing the listing management area.
              </p>
            </details>
          </div>
          <div class="py-5">
            <details class="group">
              <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
              >
                <span class="font-semibold text-xl">
                  Q: Can I delete my listing?</span
                >
                <span class="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
                A: Yes, you should be able to delete your listing at any time.
                You can usually do this by logging in to your account and
                accessing the listing management area. It is important to review
                the terms of service before you delete your listing, as there
                may be fees or other consequences associated with deleting a
                listing.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
