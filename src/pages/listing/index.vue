<script setup>
import router from "@/router";

const route = router.params.id;
</script>
<template>
  <p>this is {{ route }}</p>
</template>
