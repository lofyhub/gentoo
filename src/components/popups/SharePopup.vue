<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";
import { houseSchema } from "@/temp/housestemp";
import { convertBuffer, file } from "@/helpers/helpers";

import XIcon from "@/components/icons/XIcon.vue";
import Twitter from "@/components/icons/socials/Twitter.vue";
import Facebook from "@/components/icons/socials/Facebook.vue";
import Linkedin from "@/components/icons/socials/Linkedin.vue";
import Whatsapp from "@/components/icons/socials/Whatsapp.vue";
import Reddit from "@/components/icons/socials/Reddit.vue";
import Email from "@/components/icons/socials/Email.vue";

const prop = withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);
const isBinary = typeof prop.listing.images[0] === "string" ? false : true;

defineEmits(["close"]);

const baseurl = ref(window.location.origin + `/listing/${prop.listing._id}`);
// methods

function twitterShare() {
  window.open(
    `https://twitter.com/share?url=${encodeURIComponent(
      baseurl.value.toString()
    )}&hashtags=@kikaoHq&text=${prop.listing.name} by ${prop.listing.location}`
  );
}
function facebookShare() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${baseurl.value}`);
}
function redditShare() {
  window.open(
    `https://reddit.com/submit?url=${baseurl.value}&title=${prop.listing.name}`
  );
}
function linkedinShare() {
  window.open(
    `https://www.linkedin.com/shareArticle?url=${baseurl.value}&title=${prop.listing.name}&summary=${prop.listing.location}`
  );
}
function mailShare() {
  window.open(
    `mailto:?subject=${prop.listing.name}&body=${prop.listing.location}%0D%0A%0D%0A${baseurl.value}`
  );
}
function whatsappShare() {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(
      `${prop.listing.name}\n\n${baseurl.value}`
    )}`
  );
}
</script>
<template>
  <div
    class="popup bg-gray-600 modal-animation fixed top-0 bottom-0 left-0 right-0 z-30 h-screen w-full flex flex-col justify-center items-center py-16 bg-opacity-50 dark:bg-opacity-50"
    @click.self="$emit(`close`)"
  >
    <div class="bg-white rounded py-12 px-5 font-normal lg:w-[600px] w-auto">
      <div class="flex justify-between pb-6">
        <h2 class="text-2xl text-center font-normal">Share this listing</h2>
        <button
          class="bg-gray-300 dark:bg-gray5 focus:outline-none mb-5 rounded-full p-1 w-8 h-8"
          @click="$emit(`close`)"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="flex bg-gray-100 p-4 rounded">
        <img
          :src="
            !isBinary
              ? prop.listing.images[prop.listing.images.length - 1]
              : convertBuffer(prop.listing.images[0] as unknown as file)
          "
          alt="social share image from kikao"
          class="h-32 w-32 lg:w-48 rounded bg-cover bg-img object-cover bg-cover"
        />
        <div class="flex items-center justify-center h-auto">
          <div class="flex flex-col ml-6">
            <p class="text-gray-400 font-normal text-sm">kikao.co.ke</p>
            <h3 class="text-xl font-normal">{{ prop.listing.name }}</h3>
            <p class="text-base text-gray-500 font-normal">
              {{ prop.listing.location }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex flex-wrap pt-10 gap-2 lg:gap-4 items-center flex justify-center"
      >
        <button
          type="button"
          @click="twitterShare()"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full"
        >
          <Twitter class="h-6 w-6" />
        </button>
        <button
          @click="facebookShare()"
          type="button"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full"
        >
          <Facebook class="h-6 w-6" />
        </button>
        <button
          @click="linkedinShare()"
          type="button"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full"
        >
          <Linkedin class="h-5 w-5" />
        </button>
        <button
          @click="whatsappShare()"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full"
        >
          <Whatsapp class="h-6 w-6" />
        </button>
        <button
          type="button"
          @click="redditShare()"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full"
        >
          <Reddit class="h-6 w-6 fill-indigo-400" />
        </button>
        <button
          type="button"
          @click="mailShare()"
          class="w-12 h-12 bg-indigo-50 text-center items-center flex justify-center rounded-full mr-4"
        >
          <Email class="h-6 w-6 fill-indigo-400" />
        </button>
      </div>
    </div>
  </div>
</template>
