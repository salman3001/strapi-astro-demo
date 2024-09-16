import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const auth = {
  login: defineAction({
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(50),
    }),
    handler: async (input) => {
      const url = import.meta.env.PUBLIC_STRAPI_URL + "/api/auth/local";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
      }).then((response) => response.json());

      return res;
    },
  }),
};
