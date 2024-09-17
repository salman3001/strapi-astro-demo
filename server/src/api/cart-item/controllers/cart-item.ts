import {} from "@strapi/strapi";
/**
 * cart-item controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cart-item.cart-item",
  ({ strapi }) => ({
    async increment(ctx) {
      const { id } = ctx?.request?.params;

      try {
        const cartItem = await strapi.db
          .query("api::cart-item.cart-item")
          .findOne({ where: { id } });

        if (cartItem) {
          await strapi.db.query("api::cart-item.cart-item").update({
            where: { id },
            data: { qty: (cartItem.qty as number) + 1 },
          });
        }

        ctx.body = "ok";
      } catch (error) {
        console.log(error);

        ctx.body = error;
      }
    },

    async decrement(ctx) {
      const { id } = ctx?.request?.params;
      try {
        const cartItem = await strapi.db
          .query("api::cart-item.cart-item")
          .findOne({ where: { id } });

        if (cartItem && cartItem.qty > 1) {
          await strapi.db.query("api::cart-item.cart-item").update({
            where: { id },
            data: { qty: (cartItem.qty as number) - 1 },
          });
        }

        ctx.body = "ok";
      } catch (error) {
        ctx.body = error;
      }
    },
  })
);
