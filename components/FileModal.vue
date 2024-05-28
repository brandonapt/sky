<script setup>
const props = defineProps([
  "filePopup",
  "currentFile",
  "currentFileName",
  "fileUrl",
]);
const notImplemented = ref(false);
const fileType = computed(() => {
  const ext = props.currentFileName.split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
    return "image";
  } else if (ext === "mp4" || ext === "webm" || ext === "mov") {
    return "video";
  } else if (
    ext === "pdf" ||
    ext === "doc" ||
    ext === "docx" ||
    ext === "txt" ||
    ext === "md" ||
    ext === "json" ||
    ext === "py"
  ) {
    return "text";
  } else {
    notImplemented.value = true;
  }
});

console.log(props.fileUrl);
</script>

<template>
  <UModal v-model="props.filePopup">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="font-bold">{{ props.currentFileName }}</h1>
      </template>

      <pre v-if="fileType == 'text'">{{ props.currentFile }}</pre>
      <img v-else-if="fileType == 'image'" :src="props.fileUrl" />
      <p v-if="notImplemented">File type not implemented</p>
    </UCard>
  </UModal>
</template>
