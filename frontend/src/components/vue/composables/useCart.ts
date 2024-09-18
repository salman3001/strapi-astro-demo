import { computed, onMounted, ref } from "vue";
import { useAuth } from "./useAuth";
import QueryString from "qs";
import { stripeApi } from "../../../utils/stripeApi";
import type { AxiosError } from "axios";
import { getCartCount } from "../store/cartCount";

export const useCart = () => {
  const { user, token } = useAuth();
  const authToken = `Bearer ${token}`;
  let err = ref();
  let cart = ref();

  const query = QueryString.stringify({
    where: {
      user: user?.value?.id,
    },
    populate: {
      cart_items: {
        populate: {
          product: {
            fields: ["title", "price"],
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
        },
      },
    },
  });

  const cartItems = computed<any>(() =>
    cart ? cart?.value?.attributes?.cart_items : null,
  );

  const cartTotal = computed(() => {
    if (cartItems.value) {
      let total = 0;

      cartItems?.value?.data?.forEach((cartItem: any) => {
        const quantity = cartItem?.attributes?.qty || 0;
        const price =
          cartItem?.attributes?.product?.data?.attributes?.price || 0;
        total += quantity * price;
      });

      return total;
    }
    return 0;
  });

  const getCart = async () => {
    try {
      const res = await stripeApi.get("/api/carts" + "?" + query, {
        headers: {
          Authorization: authToken,
        },
      });

      if (res.data?.data?.length && res.data?.data?.length > 0) {
        cart.value = res.data.data[0];
      }
    } catch (error: any) {
      err.value = error?.message;
    }
  };

  const incrementItem = async (itemId: number) => {
    try {
      const res = await stripeApi.post(
        "/api/cart-items/increment/" + itemId,
        undefined,
        {
          headers: {
            Authorization: authToken,
          },
        },
      );

      await getCartCount();
      await getCart();
    } catch (err: any) {
      const error = err as AxiosError<any>;

      alert("Error incrementing the item:- " + error?.message);
    }
  };

  const decrementItem = async (itemId: number) => {
    try {
      const res = await stripeApi.post(
        "/api/cart-items/decrement/" + itemId,
        undefined,
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      await getCartCount();
      await getCart();
    } catch (err: any) {
      const error = err as AxiosError<any>;

      alert("Error incrementing the item:- " + error?.message);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      await stripeApi.delete("/api/cart-items/" + itemId, {
        headers: {
          Authorization: authToken,
        },
      });
      await getCartCount();
      await getCart();
    } catch (err: any) {
      const error = err as AxiosError<any>;

      alert("Error incrementing the item:- " + error?.message);
    }
  };

  onMounted(async () => {
    await getCart();
  });

  return {
    err,
    cartItems,
    getCart,
    incrementItem,
    decrementItem,
    deleteItem,
    cartTotal,
  };
};
