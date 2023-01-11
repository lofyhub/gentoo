<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import { houseSchema } from "@/temp/housestemp";

import { formatDate } from "@/helpers/helpers";

import HeartIcon from "@/components/icons/heartIcon.vue";
import ShareIcon from "@/components/icons/shareIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import BedroomIcon from "@/components/icons/BedIcon.vue";
import BathtabIcon from "@/components/icons/BathtabIcon.vue";
import HouseIcon from "@/components/icons/HouseIcon.vue";
import BrushIcon from "@/components/icons/BrushIcon.vue";
import ActiveIcon from "@/components/icons/CheckCircleIcon.vue";
import GlobeIcon from "@/components/icons/GlobeIcon.vue";
import AvailabbilityIcon from "./icons/AvailabbilityIcon.vue";
import ImagePopup from "@/components/popups/ImagePopup.vue";
import { toastSuccess, toastWarning } from "@/plugins/toast";

withDefaults(
  defineProps<{
    listing: houseSchema;
  }>(),
  {}
);

const sideImages = [
  "https://images.pexels.com/photos/4857757/pexels-photo-4857757.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/6903149/pexels-photo-6903149.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

const showImagePopup = ref(false);
const dateSelected = ref(``);
const inPerson = ref(false);
const virtual = ref(false);

// methods

function handleTour() {
  if (virtual.value == false && inPerson.value == false) {
    toastWarning("Please select home tour option");
    return;
  } else if (!dateSelected.value) {
    toastWarning("Select home tour date");
    return;
  }

  // send tht data to backend
  console.log(dateSelected.value);
  console.log(typeof dateSelected.value);
}

function socialShare() {
  toastSuccess("Clicked social share");
}

function addFavourite() {
  toastSuccess("Listing added to your favourites");
}
</script>

<template>
  <div class="pt-8" v-if="listing">
    <div>
      <h1 class="text-4xl font-bold">{{ listing.name }}</h1>
    </div>
    <div class="py-4 flex justify-between">
      <div>
        <p class="text-gray-500 text-xl">{{ listing.location }}</p>
      </div>
      <div>
        <button
          class="app-text border-2 border-gray-200 py-1.5 px-5 rounded-md bg-indigo-50"
          @click="socialShare"
        >
          <ShareIcon class="inline h-4 w-4" />
          <span class="text-base ml-2">Share</span>
        </button>
        <button
          class="app-text border-2 border-gray-200 py-1.5 px-5 rounded-md bg-indigo-50 ml-3"
          @click="addFavourite"
        >
          <span class="bg-none bg-transparent">
            <HeartIcon class="inline h-4 w-4" />
          </span>
          <span class="text-base ml-2">Favourite</span>
        </button>
        <button
          class="app-text border-2 border-gray-200 py-1.5 px-5 rounded-md bg-indigo-50 ml-3"
        >
          <SearchIcon class="inline h-4 w-4" />
          <span class="text-base ml-2">Browse nearby listings</span>
        </button>
      </div>
    </div>
    <!-- start listing details -->
    <div class="flex">
      <div class="w-[800px]">
        <!-- listing image section -->
        <div class="my-6">
          <img
            :src="listing.images[listing.images.length - 1]"
            alt=""
            srcset=""
            class="object-cover object-center overflow-hidden w-full h-[450px]"
            @click="showImagePopup = true"
          />
        </div>
        <div>
          <!-- Room details section bathrooms, washrooms e.t.c -->
          <div class="my-8 border-2 border-gray-200 rounded h-[100px]">
            <div class="flex justify-around h-32">
              <!-- bedrooms -->
              <div class="w-32 py-5 ml-4">
                <p>
                  {{
                    listing.compartments.bedrooms > 1 ? `Bedrooms` : `Bedroom`
                  }}
                </p>
                <div class="pt-2">
                  <BedroomIcon class="w-5 h-5 inline fill-indigo-500" />
                  <span class="font-bold mt-4 ml-2 truncate"
                    >{{ listing.compartments.bedrooms }}
                    {{
                      listing.compartments.bedrooms > 1 ? `Beds` : `Bed`
                    }}</span
                  >
                </div>
              </div>
              <!-- bathtabs -->
              <div class="w-32 py-5 ml-2">
                <p>
                  {{
                    listing.compartments.washRooms > 1
                      ? `Washrooms`
                      : `Washroom`
                  }}
                </p>
                <div class="pt-2">
                  <BathtabIcon class="w-5 h-5 inline fill-indigo-500" />
                  <span class="font-bold ml-2 truncate"
                    >{{ listing.compartments.washRooms }}
                    {{
                      listing.compartments.washRooms > 1
                        ? `Bathtabs`
                        : `Bathtab`
                    }}</span
                  >
                </div>
              </div>
              <!-- square area -->
              <div class="w-32 py-5 ml-2">
                <p>Square Area</p>
                <div class="pt-2">
                  <HouseIcon class="w-5 h-5 inline" />
                  <span class="font-bold ml-2">{{ listing.size }}</span>
                </div>
              </div>
              <!-- repair quality -->
              <div class="w-32 py-5 ml-2">
                <p>Repair Quality</p>
                <div class="pt-2">
                  <BrushIcon class="w-5 h-5 inline" />
                  <span class="font-bold ml-2">Modern Loft</span>
                </div>
              </div>
              <!-- Rooms booking status-->
              <div class="w-32 py-5 ml-2">
                <p>Status</p>
                <div class="pt-2">
                  <ActiveIcon class="w-5 h-5 inline" />
                  <span class="font-bold ml-2">Active</span>
                </div>
              </div>
            </div>
          </div>
          <!-- about this home -->
          <div>
            <div>
              <h2 class="text-3xl font-bold">About this home</h2>
              <p class="py-3">
                The "About this Home" section in a rental apartment listing is
                typically a summary of the key features and characteristics of
                the apartment. It may include information about the size of the
                apartment, the number of bedrooms and bathrooms, the type of
                flooring or finishes, and any special amenities or features such
                as a balcony or in-unit laundry. <br />
                <br />
                It may also include details about the location of the apartment,
                such as the neighborhood it is located in and any nearby public
                transportation options. This section is intended to provide a
                general overview of the apartment and help prospective renters
                get a sense of what the unit is like before they schedule a
                showing or visit in person.
              </p>
            </div>
          </div>
          <!-- end of about this home -->
          <!-- listed by property owner -->
          <div class="my-10 border-2 border-gray-300 rounded bg-indigo-50">
            <div class="py-4 mx-4">
              <p class="text-lg font-semibold">Listed by property owner</p>
            </div>
            <div class="flex justify-between mx-4 mb-6">
              <div class="flex">
                <img
                  src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Headshot photo og Thyrone Paas from Pexels"
                  srcset=""
                  class="w-14 h-14 rounded-full inline object-cover bg-cover"
                />
                <div class="ml-4 p-0 b-0">
                  <h3 class="font-extrabold p-0 m-0">John Philip</h3>
                  <p>Rich Capital Properties LLC</p>
                </div>
              </div>
              <div>
                <button
                  class="text-indigo-500 border-2 border-gray-200 py-1.5 px-5 rounded-md bg-indigo-50"
                >
                  Ask a question
                </button>
                <button
                  class="text-indigo-500 border-2 border-gray-200 py-1.5 px-5 rounded-md bg-indigo-50 ml-2"
                >
                  <GlobeIcon class="inline w-5 h-5" />
                  Get more info
                </button>
              </div>
            </div>
          </div>
          <!-- end of listed by property owner -->
          <hr class="py-4" />
          <!-- start rentail features -->
          <div>
            <h4 class="font-extrabold text-3xl">Rental features</h4>
            <div class="flex justify-between py-4 text-base">
              <div>
                <div class="flex justify-between my-2">
                  <p>Listed on</p>
                  <span class="font-bold ml-16 ml-16">
                    {{ formatDate(`2022-12-25`) }}</span
                  >
                </div>
                <div class="flex justify-between my-2">
                  <p>Availability</p>
                  <div class="ml-16 flex justify-center">
                    <AvailabbilityIcon :available="true" class="mt-2" />
                    <span class="font-bold">Yes</span>
                  </div>
                </div>
                <div class="flex justify-between my-2">
                  <p>Type</p>
                  <span class="font-bold ml-16">Home</span>
                </div>
                <div class="flex justify-between my-2">
                  <p>Laundry</p>
                  <span class="font-bold ml-16">in unit</span>
                </div>
                <div class="flex justify-between my-2">
                  <p>Cooling</p>
                  <span class="font-bold ml-16">Air conditioner</span>
                </div>
              </div>
              <!-- 2nd part -->
              <div>
                <div class="flex justify-between my-2">
                  <p>City</p>
                  <span class="font-bold ml-16">Miami</span>
                </div>
                <div class="flex justify-between my-2">
                  <p>Year built</p>
                  <span class="font-bold ml-16">2018</span>
                </div>
                <div class="flex justify-between my-2">
                  <p>Size</p>
                  <span class="font-bold ml-16">2,173 sqft</span>
                </div>
                <div class="flex justify-between">
                  <p>Land Size</p>
                  <span class="font-bold ml-16">9,060 sqft</span>
                </div>
                <div class="flex justify-between my-2">
                  <p>Parking Area</p>
                  <span class="font-bold ml-16">Yes</span>
                </div>
              </div>
            </div>
          </div>
          <!-- end of rental features -->
        </div>
      </div>
      <!-- apply contact setion -->
      <div class="border-2 border-gray-200 h-[400px] ml-6 rounded w-[300px]">
        <div class="my-4 ml-4">
          <p class="text-lg my-1 font-extrabold">Rent Price</p>
          <div class="my-1">
            <span class="text-xl font-bold app-text"
              >{{ listing.rate.price.toLocaleString() }}
              {{ listing.rate.countryCode }}</span
            >/<span class="">{{ listing.rate.duration }}</span>
          </div>
          <button
            class="py-2 px-16 bg-indigo-500 text-white text-base rounded my-2"
          >
            <GlobeIcon class="inline w-5 h-5" :color="`#ffffff`" /> Apply now
          </button>
          <hr class="my-3" />
        </div>
        <div class="ml-4">
          <p class="font-extrabold text-lg">Request a home tour</p>
          <div class="my-3 flex">
            <button
              class="py-1 px-6 border-2 border-gray-200 rounded"
              @click="inPerson = !inPerson"
            >
              InPerson
            </button>
            <button
              class="py-1 px-6 border-2 border-indigo-500 bg-indigo-50 app-text rounded ml-2"
              @click="virtual = !virtual"
            >
              Virtual
            </button>
          </div>
          <div>
            <input
              type="date"
              name=""
              id=""
              v-model="dateSelected"
              class="py-1 px-12 border-2 border-gray-200 my-2 rounded"
            />
            <button
              class="py-2.5 px-16 rounded bg-indigo-500 text-white my-2"
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
  <Teleport to="body">
    <ImagePopup
      v-if="showImagePopup"
      :image="listing.images[listing.images.length - 1]"
      @close="showImagePopup = false"
    />
  </Teleport>
</template>