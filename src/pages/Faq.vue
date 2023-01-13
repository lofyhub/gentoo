<script setup lang="ts">
import { ref } from "vue";

const openFaq1 = ref(false);
const openFaq2 = ref(false);
const openFaq3 = ref(false);
const openFaq4 = ref(false);
const openFaq5 = ref(false);
const openFaq6 = ref(false);
</script>

<template>
  <!-- ====== FAQ Section Start -->
  <section
    x-data="
   {
   openFaq1, 
   openFaq2, 
   openFaq3, 
   openFaq4, 
   openFaq5, 
   openFaq6
   }
   "
    class="overflow-hidden bg-white pt-4 pb-12 lg:pt-[30px] lg:pb-[90px]"
  >
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
            <span class="mb-2 block text-lg font-semibold text-primary">
              FAQ
            </span>
            <h2
              class="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]"
            >
              Any Questions? Look Here
            </h2>
            <p class="text-base text-body-color">
              Get answers to your questions about our policies and procedures
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 lg:w-1/2">
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq1 = !openFaq1"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: How do I list my house on the website?
                </h4>
              </div>
            </button>
            <div x-show="openFaq1" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: To list your house on the website, you will need to create an
                account and then follow the prompts to add a listing. You will
                be asked to provide information about your property, including
                its location, size, and features. You will also need to upload
                at least one photograph of your house.
              </p>
            </div>
          </div>
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq2 = !openFaq2"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: Is there a fee to list my house on the website?
                </h4>
              </div>
            </button>
            <div x-show="openFaq2" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: There may be a fee to list your house on the website,
                depending on the specific terms of the service. It is important
                to review the pricing and billing policies before you create a
                listing.
              </p>
            </div>
          </div>
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq3 = !openFaq3"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: How long does my listing stay active?
                </h4>
              </div>
            </button>
            <div x-show="openFaq3" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: The length of time that your listing stays active may vary
                depending on the specific terms of the service. It is important
                to review the listing expiration policies before you create a
                listing.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq4 = !openFaq4"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: How do potential buyers contact me about my listing?
                </h4>
              </div>
            </button>
            <div x-show="openFaq4" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: Potential buyers can contact you through the website by using
                the contact form provided on your listing page. You will receive
                an email notification whenever someone inquires about your
                property.
              </p>
            </div>
          </div>
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq5 = !openFaq5"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: Can I make changes to my listing after it has been
                  published?
                </h4>
              </div>
            </button>
            <div x-show="openFaq5" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: Yes, you should be able to make changes to your listing after
                it has been published. You can usually do this by logging in to
                your account and accessing the listing management area.
              </p>
            </div>
          </div>
          <div
            class="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8"
          >
            <button
              class="faq-btn flex w-full text-left"
              @click="openFaq6 = !openFaq6"
            >
              <div
                class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary"
              >
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  class="icon fill-current"
                >
                  <path
                    d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                    fill="#3056D3"
                    stroke="#3056D3"
                  />
                </svg>
              </div>
              <div class="w-full">
                <h4 class="text-lg font-semibold text-black">
                  Q: Can I delete my listing?
                </h4>
              </div>
            </button>
            <div x-show="openFaq6" class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color">
                A: Yes, you should be able to delete your listing at any time.
                You can usually do this by logging in to your account and
                accessing the listing management area. It is important to review
                the terms of service before you delete your listing, as there
                may be fees or other consequences associated with deleting a
                listing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 right-0 z-[-1]">
      <svg
        width="1440"
        height="886"
        viewBox="0 0 1440 886"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="1308.65"
            y1="1142.58"
            x2="602.827"
            y2="-418.681"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3056D3" stop-opacity="0.36" />
            <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
            <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </section>
  <!-- ====== FAQ Section End -->
</template>
