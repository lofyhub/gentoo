<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// methods

function handlLandlords() {
  // go to daashboards
  router.push(`/applications`);
}
</script>

<template>
  <div class="bg-white py-16">
    <div class="flex w-3/5 mx-auto">
      <div class="w-2/5 mr-20">
        <img
          src="https://images.pexels.com/photos/10142101/pexels-photo-10142101.jpeg"
          alt="cover image of a house"
          class="w-full h-96 inline object-cover bg-cover rounded-sm"
        />
      </div>
      <div class="w-2/5 py-8">
        <div class="my-4">
          <button
            class="py-2 px-6 bg-white app-text rounded-sm bg-indigo-50 hover:shadow-md ml-2 font-bold border-2"
          >
            For Tenants
          </button>
          <button
            class="py-2 px-6 bg-white app-text ml-2 rounded-sm bg-indigo-50 font-bold border-2"
          >
            For Landlords
          </button>
        </div>

        <div>
          <h2 class="text-4xl font-extrabold py-2">
            Effortlessy easy for tenants and landlords
          </h2>
          <div>
            <div class="pb-1.5">
              <p class="text-base pt-2">
                Find your dream home with us today! Detailed listings and
                high-quality photos make it easy to find the perfect fit for
                landlords and tenants.
              </p>
            </div>
            <button
              class="py-2 px-24 my-4 text-indigo-500 bg-indigo-50 border-2 rounded-sm font-bold transition duration-500 ease-in-out hover:bg-indigo-100"
              type="submit"
              @click="handlLandlords"
            >
              Add listing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
