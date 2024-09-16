import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { stripeApi } from "../utils/stripeApi";
import type { AxiosError } from "axios";

export const auth = {
  login: defineAction({
    accept: "form",
    input: z.object({
      identifier: z.string().min(1),
      password: z.string().min(8).max(50),
    }),
    handler: async (input, _c) => {
      // _c.cookies.get('')
      try {
        const res = await stripeApi.post("api/auth/local", input);
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
  register: defineAction({
    accept: "form",
    input: z.object({
      username: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async (input, _c) => {
      // _c.cookies.get('')
      try {
        const res = await stripeApi.post("api/auth/local/register", input);
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
};
