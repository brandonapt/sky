<script setup>
const props = defineProps(["loading"]);
</script>

<template>
  <UModal v-model="props.loading">
    <UCard>
      <template #header>
        <h1 class="font-bold">Loading...</h1>
      </template>
      <div class="flex justify-center">
        <UProgress animation="carousel" />
      </div>
    </UCard>
  </UModal>
</template>
