import { defineAction } from "astro:actions";
import { stripeApi } from "../utils/stripeApi";
import type { AxiosError } from "axios";
import { z } from "astro:content";

export const cart = {
  incrementItem: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async (input, _c) => {
      const token = _c.cookies.get("token") as any;
      const authToken = `Bearer ${token.value}`;
      try {
        const res = await stripeApi.post(
          "/api/cart-items/increment/" + input?.id,
          undefined,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );

        return res.data;
      } catch (err: any) {
        const error = err as AxiosError<any>;

        if (error.response) {
          throw new Error(error.response?.data.error?.message);
        }
        throw error;
      }
    },
  }),
  decrementItem: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async (input, _c) => {
      const token = _c.cookies.get("token") as any;
      const authToken = `Bearer ${token.value}`;
      try {
        const res = await stripeApi.post(
          "/api/cart-items/decrement/" + input?.id,
          undefined,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );

        return res.data;
      } catch (err: any) {
        const error = err as AxiosError<any>;
        console.log(error);

        if (error.response) {
          throw new Error(error.response?.data.error?.message);
        }
        throw error;
      }
    },
  }),

  deleteItem: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async (input, _c) => {
      const token = _c.cookies.get("token") as any;
      const authToken = `Bearer ${token.value}`;
      try {
        const res = await stripeApi.delete("/api/cart-items/" + input?.id, {
          headers: {
            Authorization: authToken,
          },
        });

        return res.data;
      } catch (err: any) {
        const error = err as AxiosError<any>;

        if (error.response) {
          throw new Error(error.response?.data.error?.message);
        }
        throw error;
      }
    },
  }),
  addToCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
    }),
    handler: async (input, _c) => {
      const token = _c.cookies.get("token") as any;
      const authToken = `Bearer ${token.value}`;
      console.log(input);

      try {
        const res = await stripeApi.post("/api/carts/add-to-cart", input, {
          headers: {
            Authorization: authToken,
          },
        });

        return res.data;
      } catch (err: any) {
        const error = err as AxiosError<any>;

        if (error.response) {
          console.log(error.response.data);
          throw new Error(error.response?.data.error?.message);
        }
        throw error;
      }
    },
  }),
};
