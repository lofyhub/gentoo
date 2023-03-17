<script setup lang="ts">
import Team from "@/components/Team/TeamMember.vue";
import { TeamSchema } from "../temp/types";
import { useHead } from "unhead";

useHead({
  title: "Kikao | Team",
});

const teamMembers: TeamSchema[] = [
  {
    name: "Your name here",
    twitter: "https://twitter.com/kikaohq",
    avatar: "https://mkpusa.org/wp-content/uploads/2015/04/YourFace.jpg",
    github: "",
    role: "Your role here",
  },
];
</script>

<template>
  <section class="bg-white dark:bg-gray-900 min-h-screen">
    <div class="container px-6 pt-20 pb-10 mx-auto">
      <h1
        class="text-center h2 dark:text-white lg:text-4xl text-3xl font-medium"
      >
        <span class="text-black mx-2">Our</span>Team
      </h1>

      <p
        class="max-w-2xl text-base py-3 lg:text-xl mx-auto my-[16px] text-center text-gray-500 dark:text-gray-300"
      >
        Meet the team behind Kikao
      </p>
      <div class="flex flex-wrap justify-center w-4/5 mx-auto gap-6">
        <Team
          v-for="(member, index) in teamMembers"
          :key="index"
          :profile="member"
        />
      </div>
      <div
        class="text-center w-full lg:w-[700px] mx-auto mt-8 text-base lg:text-lg"
      >
        <p>
          If you believe in this project, are a team player, ready to roll up
          your sleeves and help drive the project forward and bring our vision
          to life, then I would love to hear from you! Please reach out by email
          at
          <a
            class="text-indigo-600"
            href="mailto:developerphilo@gmail.com?subject=Kikao&body=Lets%20Build%20Kikao"
            >contactkikao@gmail.com</a
          >. Together, we can build something truly special and make a real
          impact in the Kenyan real estate market.
        </p>
      </div>
    </div>
  </section>
</template>
