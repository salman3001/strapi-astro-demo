<template>
  <a v-if="user" class="btn btn-circle btn-sm" href="/cart">
    <CartItemsCount />
  </a>

  <button
    v-if="user"
    @click.prevent="logout"
    type="submit"
    class="btn btn-primary ml-2 btn-sm"
    id="logout-btn"
  >
    Logout
  </button>

  <a v-else href="/auth/login">
    <button class="btn btn-primary ml-2 btn-sm">Login</button>
  </a>
</template>
<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import CartItemsCount from "./CartItemsCount.vue";
const { user, logout } = useAuth();
</script>
