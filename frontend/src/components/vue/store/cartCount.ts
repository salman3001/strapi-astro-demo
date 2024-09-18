// store/users.ts
import { atom } from "nanostores";
import { stripeApi } from "../../../utils/stripeApi";
import { useAuth } from "../composables/useAuth";

export const $cartCount = atom(0);

export async function getCartCount() {
  const { token } = useAuth();
  const authToken = `Bearer ${token}`;

  try {
    const res = await stripeApi.get("/api/cart-items/get-count", {
      headers: {
        Authorization: authToken,
      },
    });

    $cartCount.set(res.data?.data?.count || 0);
  } catch (error: any) {
    console.log("faled to get cart count");
  }
}
