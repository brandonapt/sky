<script setup>
let user = useState("user");

async function checkLogin() {
  const response = await fetch("/api/auth/avatar");
    if (response.status === 404) {
      navigateTo("/api/auth/login");
    }
}

async function fetchUser() {
  const response = await fetch("/api/auth/who");
  const data = await response.json();
  user.value = data;
}

function goto(path) {
  navigateTo(path);
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img
      src="https://sky.br4x.com/api/auth/avatar"
      class="rounded-full w-24 h-24 mb-4"
    />
    <h1 class="text-4xl font-bold mb-5">welcome, {{ user?.username }}</h1>
    <UButton @click="goto('/explorer')" color="gray">explorer</UButton>
  </div>
</template>
