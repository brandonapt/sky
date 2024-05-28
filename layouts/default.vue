<script setup>
const user = useState("user");
const open = ref(false);

async function fetchUser() {
  const response = await fetch("/api/auth/who");
  const data = await response.json();
  user.value = data;
}

fetchUser();

function login() {
  window.location.href = "/api/auth/login";
}

const items = [
    [{
        label: "home",
        click: () => {
            navigateTo("/");
        },
        icon: "i-heroicons-home"
    }],
    [{
        label: "explorer",
        click: () => {
            navigateTo("/explorer");
        },
        icon: "i-heroicons-folder"
    }],
    [{
        label: "logout",
        click: () => {
            window.location.href = "/api/auth/logout";
        },
        icon: "i-heroicons-user-minus"
    }]
];

async function checkLogin() {
  const response = await fetch("/api/auth/who");
  if (response.status === 401) {
    console.log("not logged in");
     window.location.href = "/api/auth/login";
  }
}

checkLogin();
</script>

<template>
  <div class="right-top">
    <UButton v-if="!user?.username" @click="login" color="gray">Login</UButton>
    <UDropdown
      :items="items"
      mode="hover"
      :popper="{ placement: 'bottom-start' }"
    >
      <img
        v-if="user?.username"
        :src="'https://sky.br4x.com/api/auth/avatar'"
        class="hovery rounded-full w-14 h-14 m-5 cursor-pointer"
        @click="open = !open"
      />
    </UDropdown>
  </div>
  <slot />
</template>

<style>
.right-top {
  position: absolute;
  top: 0;
  right: 0;
}

.hovery:hover {
  filter: brightness(0.8);
  transition: 0.2s;
}

.hovery {
  transition: 0.2s;
}
</style>
