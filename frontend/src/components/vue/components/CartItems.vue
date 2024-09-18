<template>
  <CartCard
    v-if="cartItems?.data"
    v-for="item in cartItems?.data"
    :id="item?.id"
    :productId="item?.attributes?.product?.data?.id"
    :title="item?.attributes?.product?.data?.attributes?.title"
    :image="
      item?.attributes?.product?.data?.attributes?.image?.data?.attributes?.url
    "
    :qty="item?.attributes?.qty"
    :price="item?.attributes?.product?.data?.attributes?.price"
    :incrementItem="incrementItem"
    :decrementItem="decrementItem"
    :deleteItem="deleteItem"
  />
  <div class="flex justify-center items-center py-10" v-else>
    <div class="loading loading-lg">loading..</div>
  </div>
  <div
    class="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto"
  >
    <h5
      class="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4"
    >
      Subtotal
    </h5>

    <div class="flex items-center justify-between gap-5">
      <h6
        class="font-manrope font-bold text-3xl lead-10 text-indigo-600 text-nowrap"
      >
        {{ cartTotal }} {{ config.currency }}
      </h6>
    </div>
  </div>
  <div class="max-lg:max-w-lg max-lg:mx-auto">
    <p
      class="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6"
    >
      Shipping taxes, and discounts calculated at checkout
    </p>
    <button class="btn btn-primary w-full">Checkout</button>
  </div>
</template>
<script setup lang="ts">
import { config } from "../../../utils/config";
import { useCart } from "../composables/useCart";
import CartCard from "./CartCard.vue";

const { cartItems, cartTotal, decrementItem, deleteItem, incrementItem } =
  useCart();
</script>
