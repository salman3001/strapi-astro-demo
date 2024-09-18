<template>
  <button type="submit" class="btn btn-primary btn-sm" @click="addToCart">
    Add to cart
  </button>
</template>

<script setup lang="ts">
import type { AxiosError } from "axios";
import { stripeApi } from "../../../utils/stripeApi";
import { useAuth } from "../composables/useAuth";
import { getCartCount } from "../store/cartCount";
import { navigate } from "astro:transitions/client";

const props = defineProps<{ id: number }>();
const { token, user } = useAuth();

const addToCart = async () => {
  if (!user) {
    navigate("/auth/login");
  }
  const authToken = `Bearer ${token}`;

  try {
    await stripeApi.post(
      "/api/carts/add-to-cart",
      { productId: props.id },
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    await getCartCount();
    // alert("Item Added to cart");
  } catch (err: any) {
    const error = err as AxiosError<any>;

    alert("Failed to add to cart: " + error?.message);
  }
};
</script>
