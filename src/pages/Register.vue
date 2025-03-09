<script setup lang="ts">
const googleLogin = () => {
  const authUrl = "http://localhost:9000/api/v1/oauth/google";
  window.location.href = authUrl;
};
</script>

<template>
  <div class="min-h-screen pt-8 bg-white">
    <div class="w-3/4 lg:w-1/3 mx-auto relative bg-white py-[20px]">
      <button @click="googleLogin()" class="btn">Sign in With Google</button>
    </div>
  </div>
</template>
<style></style>
