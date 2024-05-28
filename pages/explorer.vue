<script setup>
const currentDirectory = useState("directory");
const currentFile = useState("file");
const currentFileName = useState("filename");
const choosable = ref([]);
const loading = ref(true);
const filePopup = ref(false);

async function navigateDirectory(directory) {
  loading.value = true;
  if (directory === "..") {
    if (currentDirectory.value === "skyapp") return (loading.value = false);
    directory = currentDirectory.value.split("/").slice(0, -1).join("/");
    loading.value = true;
  }
  currentDirectory.value = directory;
  const response = await fetch(`/api/dir/${directory}`);
  const data = await response.json();
  choosable.value = data;
  loading.value = false;
}

async function chooseFile(file) {
  loading.value = true;
  currentFile.value = file;
  const response = await fetch(`/api/dir/${currentDirectory.value}/${file}`);
  const data = await response.text();
  filePopup.value = true;
  currentFileName.value = file;
  currentFile.value = data;
  loading.value = false;
}

async function deduce(name) {
  // deduce if file or folder and run the appropriate function
  if (name.includes(".")) {
    chooseFile(name);
  } else {
    let path = currentDirectory.value + "/" + name;
    navigateDirectory(path);
  }
}

function getFormatted() {
  let links = [];
  let path = "";
  for (let part of currentDirectory.value.split("/")) {
    path += part + "/";
    links.push({ label: part });
  }
  return links;
}

navigateDirectory("skyapp");
</script>

<template>
  <div>
    <UCard class="mx-auto my-auto w-3/4 mt-[30vh]">
      <template #header>
        <div class="flex">
          <h1 class="font-bold">File Explorer</h1>
          <UBreadcrumb class="ml-7" :links="getFormatted()"></UBreadcrumb>
        </div>
      </template>
      <UButton
        block
        color="gray"
        variant="ghost"
        class="text-left"
        @click="navigateDirectory('..')"
        >..</UButton
      >
      <UButton
        block
        color="gray"
        variant="ghost"
        class="text-left"
        @click="deduce(folder)"
        v-for="folder in choosable"
        :key="folder"
        >{{ folder }}</UButton
      >
    </UCard>

    <file-modal :filePopup="filePopup" :currentFile="currentFile" :currentFileName="currentFileName" @close="filePopup = false" :fileUrl="'https://sky.br4x.com/api/dir/' + currentDirectory + '/' + currentFileName" />
    <loading-modal :loading="loading" />
  </div>
</template>
