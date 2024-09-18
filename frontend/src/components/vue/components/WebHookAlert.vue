<template><div></div></template>
<script setup lang="ts">
import { io } from "socket.io-client";
import { config } from "../../../utils/config";
import { useAuth } from "../composables/useAuth";

const SERVER_URL = config.strapiUrl;
const { token } = useAuth();

// connect the socket
const socket = io(SERVER_URL, {
  auth: {
    strategy: "jwt",
    token: token,
  },
});

//  wait until socket connects before adding event listeners
socket.on("connect", () => {
  socket.on("cart-item:create", (data: any) => {
    alert("Item Added to cart");
  });
  socket.on("cart-item:update", (data: any) => {
    alert("Item updated");
  });
});
</script>
