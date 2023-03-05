<script setup lang="ts">
import HeartIcon from "@/components/icons/heartIcon.vue";
import HeartIconDark from "@/components/icons/HeartIconDark.vue";
import ShareIcon from "@/components/icons/shareIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import BedroomIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import HouseIcon from "@/components/icons/HouseIcon.vue";
import BrushIcon from "@/components/icons/BrushIcon.vue";
import ActiveIcon from "@/components/icons/CheckCircleIcon.vue";
import GlobeIcon from "@/components/icons/GlobeIcon.vue";
import Bleep from "@/components/icons/Bleep.vue";
import BleepRed from "@/components/icons/BleepRed.vue";
import ImagePopup from "@/components/popups/ImagePopup.vue";
import BackButton from "@/components/BackButton.vue";
import SharePopup from "@/components/popups/SharePopup.vue";
import Listing from "@/components/Listing.vue";
import MapPin from "@/components/icons/MapPin.vue";
import ClockIcon from "@/components/icons/Clock.vue";
import LeftIcon from "@/components/icons/LeftIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import WifiIcon from "@/components/icons/WifiIcon.vue";
import ShieldIcon from "@/components/icons/ShieldIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import RoomBooking from "@/components/popups/RoomBooking.vue";
import Loading from "@/components/icons/Loading.vue";
import XIcon from "@/components/icons/Xcircle.vue";
import StarEmpty from "@/components/icons/StarEmpty.vue";

import { ref, computed, onBeforeMount } from "vue";

import {
  file,
  formatDate,
  maskNumber,
  stringToHslColor,
} from "@/helpers/helpers";
import { toastError, toastWarning } from "@/plugins/toast";
import { convertBuffer } from "@/helpers/helpers";
import { uselistingStore } from "@/store/listing";
import { useSessionStore } from "@/store/session";
import { useRootStore } from "@/store";
import { useRoute } from "vue-router";

const sideImages = [
  "https://images.pexels.com/photos/4857757/pexels-photo-4857757.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/6903149/pexels-photo-6903149.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

const store = useSessionStore();
const listingStore = uselistingStore();
const rootStore = useRootStore();
const route = useRoute();
const showImagePopup = ref(false);
const dateSelected = ref(``);
const inPerson = ref(false);
const virtual = ref(false);
const showShare = ref(false);
const showBookingPopup = ref(false);
const id = computed(() => {
  if (typeof route.params.id === "string") {
    return route.params.id;
  }

  throw new Error("Id should be a string!");
});

const similarListings = computed(() => rootStore.$state.listings.slice(0, 6));
const listing = computed(() => listingStore.getListingDetails(id.value));
const listingAuthor = computed(() =>
  listingStore.getProfile(listing.value.userId)
);
const bookmarked = computed(
  () =>
    listingStore.$state.bookmarks.findIndex(
      (elem) => elem === listing.value._id
    ) !== -1
);
const imageIndex = ref(0);
const displayImage = computed(() => listing.value.images[imageIndex.value]);
const image = computed(() => listing.value.images[imageIndex.value]);
const backgroundColor = stringToHslColor(listingAuthor.value.username);
const selected = ref<number>(0);
const review = ref<string>(``);
const showPrevNext = ref<boolean>(listing.value.images.length > 1);

onBeforeMount(() => {
  listingStore.fetchListing(id.value);
});

// TODO: Better way to handle this
if (listing.value) {
  listingStore.getListingAuthor(listing.value.userId);
}

// methods
function handleStars(index: number) {
  selected.value = index;
}

function handleReviews() {
  if (!selected.value) {
    toastError("Please give a start rating");
    return;
  }

  if (!review.value) {
    toastError("Please write a review");
    return;
  }

  rootStore.handleReviewPosting(
    selected.value,
    review.value,
    store.$state.userId,
    id.value,
    listingAuthor.value.userId,
    store.$state.username
  );
  selected.value = 0;
  review.value = ``;
}

function handleTour() {
  if (virtual.value == false && inPerson.value == false) {
    return toastWarning("Please select home tour option");
  } else if (!dateSelected.value) {
    return toastWarning("Select home tour date");
  }

  // send tht data to backend
}

function socialShare() {
  showShare.value = !showShare.value;
}

function addFavourite() {
  if (!store.$state.userId) {
    return rootStore.toggleLogin();
  } else if (bookmarked.value) {
    return listingStore.deleteBookmark(listing.value._id);
  } else {
    return listingStore.addBookmark(listing.value._id);
  }
}

function handleBooking() {
  if (!store.$state._id) {
    return rootStore.toggleLogin();
  }
  showBookingPopup.value = !showBookingPopup.value;
}

function handleNextImage() {
  if (imageIndex.value < listing.value.images.length - 1) {
    imageIndex.value++;
  }
}

function handlePreviousImage() {
  if (imageIndex.value > 0) {
    imageIndex.value--;
  }
}
</script>

<template>
  <div
    v-if="!listing._id"
    class="flex justify-center items-center text-center lg:h-[860px] h-96"
  >
    <Loading />
  </div>
  <div v-else>
    <div class="pt-6 px-4 lg:px-0">
      <BackButton class="my-3" />
    </div>
    <div v-if="listing" class="pb-10">
      <div class="px-4 lg:px-0">
        <h1 class="text-xl text-gray-500 font-normal py-2">
          {{ listing.name }}
        </h1>
        <div class="flex flex-col py-3 lg:flex-row justify-between">
          <div class="lg:text-3xl text-xl font-normal flex gap-3">
            <MapPin class="inline w-8 h-8" />
            <span>{{ listing.location }}</span>
          </div>
          <div class="flex pt-5 lg:pt-0 font-medium">
            <button
              class="app-text border border-gray-200 py-1.5 px-10 lg:px-5 rounded bg-indigo-50 transition-all transform"
              @click="socialShare"
            >
              <ShareIcon class="inline h-3.5 w-3.5" />
              <span class="text-base ml-2 hidden lg:inline-block">Share</span>
            </button>
            <button
              class="app-text border border-gray-200 py-1.5 px-10 lg:px-5 rounded bg-indigo-50 ml-3 transition-all transform"
              @click="addFavourite"
            >
              <span class="bg-none bg-transparent">
                <HeartIconDark v-if="bookmarked" class="inline h-3.5 w-3.5" />
                <HeartIcon v-else class="inline h-3.5 w-3.5" />
              </span>
              <span class="text-base ml-2 hidden lg:inline-block"
                >Bookmark</span
              >
            </button>
            <button
              class="app-text border border-gray-200 py-1.5 px-10 lg:px-5 rounded bg-indigo-50 ml-3"
            >
              <SearchIcon class="inline h-3.5 w-3.5" />
              <span class="text-base ml-2 hidden lg:inline-block"
                >Browse nearby listings</span
              >
            </button>
          </div>
        </div>
        <div class="text-gray-400 flex gap-4 text-base font-normal">
          <ClockIcon class="w-4 h-4" />
          <span>{{ formatDate(listing.createdAt) }}</span>
        </div>
      </div>
      <!-- start listing details -->
      <div class="flex">
        <div class="lg:w-[900px] w-full">
          <!-- listing image section -->
          <div class="mt-6 mb-[48px]">
            <div id="default-carousel" class="relative" data-carousel="static">
              <!-- Carousel wrapper -->
              <img
                :src="convertBuffer(displayImage as unknown as file) 
            "
                alt=""
                srcset=""
                loading="lazy"
                class="object-cover object-center cursor-pointer overflow-hidden h-[300px] lg:h-[450px] w-full"
                @click="showImagePopup = true"
              />

              <!-- Slider indicators -->
              <div
                v-if="listing.images.length > 1"
                class="absolute z-10 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
              >
                <button
                  v-for="but in listing.images"
                  :key="but"
                  type="button"
                  class="w-3 h-3 rounded-full bg-gray-200"
                  aria-current="false"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
              </div>
              <!-- Slider controls -->
              <button
                type="button"
                v-if="showPrevNext"
                class="absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                @click="handlePreviousImage"
              >
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/70 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                class="absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                v-if="showPrevNext"
                @click="handleNextImage"
              >
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/70 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
          <div>
            <!-- Room details section bathrooms, washrooms e.t.c -->
            <div
              class="mb-[48px] border-2 border-gray-200 rounded lg:h-[110px] h-auto"
            >
              <div class="flex justify-around h-auto mt-2">
                <!-- bedrooms -->
                <div class="w-32 py-5 ml-4">
                  <p class="text-base font-semibold">
                    {{
                      listing.compartments.bedrooms > 1 ? `Bedrooms` : `Bedroom`
                    }}
                  </p>
                  <div class="pt-3">
                    <BedroomIcon class="w-5 h-5 inline fill-indigo-500" />
                    <span class="font-bold mt-4 ml-2 truncate"
                      >{{ listing.compartments.bedrooms }}
                    </span>
                    <span class="lg:inline-block hidden text-gray-500 ml-1">
                      {{
                        listing.compartments.bedrooms > 1 ? `Beds` : `Bed`
                      }}</span
                    >
                  </div>
                </div>
                <!-- bathtabs -->
                <div class="w-32 py-5 ml-2">
                  <p class="text-base font-semibold">
                    {{
                      listing.compartments.washRooms > 1
                        ? `Washrooms`
                        : `Washroom`
                    }}
                  </p>
                  <div class="pt-3">
                    <BathtabIcon class="w-5 h-5 inline fill-indigo-500" />
                    <span class="font-bold ml-2 truncate"
                      >{{ listing.compartments.washRooms }}
                    </span>
                    <span class="lg:inline-block hidden ml-1 text-gray-500">
                      {{
                        listing.compartments.washRooms > 1
                          ? `Bathtabs`
                          : `Bathtab`
                      }}</span
                    >
                  </div>
                </div>
                <!-- square area -->
                <div class="w-32 py-5 ml-2 lg:block hidden">
                  <p class="text-base font-semibold">Square Area</p>
                  <div class="pt-3">
                    <HouseIcon class="w-5 h-5 inline" />
                    <span class="font-bold ml-2">{{ listing.size }}</span>
                    <span class="text-gray-500 ml-1">sqft</span>
                  </div>
                </div>
                <!-- repair quality -->
                <div class="w-32 py-5 ml-2 lg:block hidden">
                  <p class="text-base font-semibold">Repair Quality</p>
                  <div class="pt-3">
                    <BrushIcon class="w-5 h-5 inline" />

                    <span class="ml-2 text-gray-500">Modern Loft</span>
                  </div>
                </div>
                <!-- Rooms booking status-->
                <div class="w-32 py-5 ml-2">
                  <p class="text-base font-semibold">Status</p>
                  <div class="pt-3">
                    <ActiveIcon class="w-5 h-5 inline" />
                    <span class="lg:text-gray-500 ml-2 font-bold lg:font-normal"
                      >Active</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- about this home -->
            <div class="lg:mx-0 mx-4 mb-[48px]">
              <h2 class="text-2xl font-medium text-indigo-500 mb-[14px]">
                About this home
              </h2>
              <p class="py-3 text-justify">
                {{ listing.description }}
              </p>
            </div>

            <!-- end of about this home -->
            <!-- listed by property owner -->
            <div
              class="border-2 border-gray-200 rounded mx-3 lg:mx-0 mb-[48px]"
            >
              <div class="py-4 mx-4">
                <p class="text-lg font-semibold">Listed by</p>
              </div>
              <div class="flex justify-between px-4 pb-6">
                <div class="flex">
                  <router-link
                    :to="'/' + listing.userId + '/reviews/'"
                    class="w-14 h-14 rounded-full text-center flex justify-center items-center uppercase text-white text-base"
                    :style="{ backgroundColor: backgroundColor }"
                  >
                    <span>{{ listingAuthor.username.slice(0, 2) }}</span>
                  </router-link>
                  <div class="ml-4 p-0 b-0">
                    <h3 class="font-extrabold p-0 m-0">
                      {{ listingAuthor.username }}
                    </h3>
                    <p>Housing Agency</p>
                  </div>
                </div>
                <div
                  class="flex flex-col lg:flex-row justify-between font-medium"
                >
                  <button class="text-indigo-500 py-1 px-5 font-medium">
                    {{ maskNumber(listingAuthor.business.phone, 3, 3) }}
                  </button>
                  <button
                    class="text-indigo-500 border-2 border-gray-200 py-1 px-5 rounded-md bg-white lg:ml-2 pt-2 lg:pt-0 text-center items-center flex justify-center"
                  >
                    <GlobeIcon class="inline w-5 h-5 lg:mr-2 mr-0" />
                    Get more info
                  </button>
                </div>
              </div>
            </div>
            <!-- start facilities -->
            <div class="px-4 lg:px-0">
              <h4 class="font-normal text-2xl text-gray-500">
                Rental facilities
              </h4>
              <div
                class="flex justify-between flex-col mx-4 lg:mx-0 lg:flex-row py-8 text-base"
              >
                <div class="flex my-2">
                  <CheckCircleIcon
                    v-if="listing.compartments.roomNumber"
                    class="text-indigo-500 mr-8 lg:mr-2 w-6 h-6"
                  />
                  <XIcon v-else class="text-red-500 w-6 h-6 mr-8 lg:mr-2" />

                  <span class="font-bold">Room Number</span>
                </div>

                <div class="flex my-2">
                  <WifiIcon
                    v-if="listing.compartments.WIFI"
                    class="text-indigo-500 mr-8 lg:mr-2 w-6 h-6"
                  />
                  <XIcon v-else class="text-red-500 w-6 h-6 mr-8 lg:mr-2" />
                  <span class="font-bold">WIFI</span>
                </div>
                <div class="flex my-2">
                  <ShieldIcon
                    v-if="listing.compartments.security"
                    class="text-indigo-500 mr-8 lg:mr-2 w-6 h-6"
                  />
                  <XIcon v-else class="text-red-500 w-6 h-6 mr-8 lg:mr-2" />
                  <span class="font-bold">Security</span>
                </div>
                <div class="flex my-2">
                  <TrashIcon
                    v-if="listing.compartments.garbageCollection"
                    class="text-indigo-500 mr-8 lg:mr-2 w-6 h-6"
                  />
                  <XIcon v-else class="text-red-500 w-6 h-6 mr-8 lg:mr-2" />
                  <span class="font-bold">Garbage Collection</span>
                </div>
              </div>
            </div>
            <!-- end facilities -->
            <!-- end of listed by property owner -->
            <hr class="mt-4" />
            <!-- start rentail features -->
            <div class="px-4 lg:px-0 pt-8">
              <h4 class="font-normal text-2xl text-gray-500">
                Rental features
              </h4>
              <div
                class="flex justify-between flex-col mx-4 lg:mx-0 lg:flex-row py-[24px] text-base"
              >
                <div>
                  <div class="flex justify-between my-4">
                    <p>Listed on</p>
                    <span class="font-bold ml-16 ml-16">
                      {{ formatDate(listing.createdAt) }}</span
                    >
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Availability</p>
                    <div class="ml-16 flex justify-center">
                      <Bleep
                        v-if="listing.status === `active`"
                        class="mr-8 mt-1.5"
                      />
                      <BleepRed v-else class="mr-8 mt-1.5" />
                      <span class="font-bold">{{
                        listing.status === "active" ? `Yes` : `No`
                      }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between my-4">
                    <p>Type</p>
                    <span class="font-bold ml-16">{{
                      listing.compartments.bedrooms === 0 ||
                      listing.compartments.bedrooms === 1
                        ? `Studio Apartment`
                        : `${listing.compartments.bedrooms} Bedrooms`
                    }}</span>
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Laundry</p>
                    <span class="font-bold ml-16">
                      {{
                        listing.compartments.washRooms ? `in unit` : `off site`
                      }}</span
                    >
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Cooling</p>
                    <span class="font-bold ml-16">Air conditioner</span>
                  </div>
                </div>
                <!-- 2nd part -->
                <div>
                  <div class="flex justify-between my-4">
                    <p>City</p>
                    <span class="font-bold ml-16">{{ listing.location }}</span>
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Year built</p>
                    <span class="font-bold ml-16">{{
                      listing.yearbuilt ? listing.yearbuilt : `2019`
                    }}</span>
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Size</p>
                    <span class="font-bold ml-16">{{ listing.size }} sqft</span>
                  </div>
                  <div class="flex justify-between">
                    <p>Land Size</p>
                    <span class="font-bold ml-16">{{ listing.size }} sqft</span>
                  </div>
                  <div class="flex justify-between my-4">
                    <p>Parking Area</p>
                    <span class="font-bold ml-16">{{
                      listing.compartments.parking ? `Yes` : `No`
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of rental features -->
            <hr class="my" />
            <!-- start safety -->
            <div class="px-4 lg:px-0 pt-8">
              <h4 class="font-normal text-2xl text-gray-500">Safety tips</h4>
              <div
                class="flex justify-between flex-col mx-2 lg:flex-row pt-3 text-base"
              >
                <ul class="my-3 text-base text-gray-800">
                  <li class="flex py-1">
                    <CheckIcon />
                    <p class="ml-2">Don't pay before inspecting the property</p>
                  </li>
                  <li class="flex py-1">
                    <CheckIcon />
                    <p class="ml-2">
                      Inspect the property thoroughly before committing to a
                      lease
                    </p>
                  </li>

                  <li class="flex py-1">
                    <CheckIcon />
                    <p class="ml-2">
                      Only pay when satisfied with the property
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- end of safety -->
          </div>
        </div>
        <div class="ml-5 my-6 hidden lg:block">
          <!-- start side images section -->
          <div>
            <div
              v-for="image in sideImages"
              :key="image"
              class="border-2 border-indigo-500 mb-6 rounded"
            >
              <img
                :src="image"
                class="w-[250px] h-[210px] p-1 rounded overflow-hidden bg-img bg-cover"
                alt="apartment image here"
                loading="lazy"
                srcset=""
              />
            </div>
          </div>
          <!-- end side-images section  -->
          <!-- apply contact setion -->
          <div class="border-2 border-gray-200 h- rounded w-[250px] mt-[46px]">
            <div class="my-4 ml-4">
              <p class="text-lg my-3 font-extrabold">Rent Price</p>
              <div class="my-1">
                <span class="text-lg font-bold app-text"
                  >{{ (listing.rate.price * 1).toLocaleString("en") }}
                  {{ listing.rate.countryCode }}</span
                >/<span class="font-medium text-gray-500 font-normal">{{
                  listing.rate.duration.toLowerCase()
                }}</span>
              </div>
              <div class="py-[10px]">
                <button
                  class="py-2 px-14 bg-indigo-500 text-white text-base rounded my-2 flex"
                  @click="handleBooking()"
                >
                  <span>Book now</span>
                  <LeftIcon class="w-4 h-4" />
                </button>
              </div>
              <hr class="my-3" />
            </div>
            <div class="ml-4">
              <p class="text-lg font-normal text-gray-500">
                Request a home tour
              </p>
              <div class="my-3 flex">
                <button
                  class="py-1 px-5 border-2 border-gray-200 rounded"
                  @click="inPerson = !inPerson"
                >
                  InPerson
                </button>
                <button
                  class="py-1 px-5 border-2 border-indigo-500 bg-indigo-50 app-text rounded ml-2"
                  @click="virtual = !virtual"
                >
                  Virtual
                </button>
              </div>
              <div class="w-full my-[30px]">
                <input
                  type="date"
                  name=""
                  id=""
                  v-model="dateSelected"
                  class="py-1 px-9 border-2 border-gray-200 my-2 rounded"
                />
                <button
                  class="py-2.5 px-14 rounded border bg-indigo-50 text-indigo-800 font-normal my-[10px] flex"
                  @click="handleTour"
                >
                  Request a tour
                </button>
              </div>
            </div>
          </div>
          <!-- end of apply/contact sections -->
        </div>
      </div>
      <!-- comment section -->
      <div>
        <!-- component -->
        <!-- comment form -->
        <div
          v-if="store.$state.userId && store.$state.userId !== listing.userId"
          class="mt-4 lg:w-[600px] w-full"
        >
          <div>
            <p class="font-normal text-xl text-gray-900 dark:text-white">
              Give star rating
            </p>
            <div class="flex mt-4">
              <StarEmpty
                v-for="i in 5"
                :key="i"
                class="w-10 h-10 cursor-pointer"
                :class="i <= selected ? 'fill-yellow-400' : ' '"
                @click="handleStars(i)"
              />
            </div>
            <div class="sm:col-span-2 mt-4">
              <label
                for="description"
                class="block mb-2 text-xl font-normal text-gray-900 dark:text-white"
                >Write your review</label
              >
              <textarea
                id="description"
                rows="5"
                class="block p-2.5 w-full text-base text-gray-900 mt-4 bg-gray-50 rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your review description here"
                v-model="review"
              ></textarea>
            </div>
            <div class="flex flex-row-reverse mt-5">
              <button
                class="py-2 px-8 border border-indigo-500 rounded bg-white hover:bg-indigo-50 text-indigo-500"
                type="submit"
                @click="handleReviews"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- start similar listings section -->
      <div class="w-full px-4 lg:px-0 pt-5">
        <h2
          class="text-indigo-500 text-2xl font-medium pb-4 lg:text-start text-center"
        >
          Similar Listings
        </h2>
        <div class="flex flex-wrap mt-0 pt-0 lg:justify-start justify-center">
          <Listing
            v-for="listing in similarListings"
            :key="listing._id"
            :listing="listing"
          />
        </div>
      </div>

      <!--  end of similar listing section-->
    </div>
  </div>

  <Teleport to="body">
    <ImagePopup
      v-if="showImagePopup"
      :image="convertBuffer(image as unknown as file)"
      @close="showImagePopup = false"
    />
    <SharePopup
      v-if="showShare"
      :listing="listing"
      @close="showShare = false"
    />
    <RoomBooking
      v-if="showBookingPopup"
      :listing="listing"
      :listing-author="listingAuthor"
      @close="showBookingPopup = false"
    />
  </Teleport>
</template>
