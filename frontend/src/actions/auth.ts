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
  logout: defineAction({
    accept: "form",
    handler: async (_input, _c) => {
      _c.cookies.set("user", "", { path: "/" });
      _c.cookies.set("token", "", { path: "/" });

      return {};
    },
  }),
};
