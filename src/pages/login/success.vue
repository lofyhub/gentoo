<script setup lang="ts">
import { toastSuccess } from "@/plugins/toast";
import { useSessionStore } from "@/store/session";
import type { Session } from "@/store/session";
import { useRoute } from "vue-router";

const sessionStore = useSessionStore();
const route = useRoute();

// Get query parameters from the route
const token = route.query.token as string | undefined;
const id = route.query.id as string;
const username = route.query.user_name as string | undefined;
const email = route.query.email as string | undefined;
const image = route.query.image as string | undefined;

const userSession: Session = {
  id: id ?? "",
  userId: id,
  username: username ?? "",
  email: email ?? "",
  image: image ?? "",
};

if (id && token && email) {
  sessionStore.setSessionData(userSession);
  window.location.href = "/listings";
  toastSuccess("Thanks for signing in!");
}
</script>

<template>
  <div>
    <h2>Create Listing</h2>
    <h4>ID {{ id }}</h4>
    <h4>Username {{ username }}</h4>
    <h4>Email {{ email }}</h4>
    <h4>image {{ image }}</h4>
  </div>
</template>
