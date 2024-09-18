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
    async getCount(ctx) {
      let count = 0;
      try {
        const user = ctx?.state?.user;

        if (!user) {
          throw new Error("Login Required");
        }

        const cart = await strapi.db.query("api::cart.cart").findOne({
          where: {
            user: user?.id,
          },
          populate: {
            cart_items: {
              populate: {
                product: {
                  fields: ["id"],
                },
              },
            },
          },
        });

        if (cart?.cart_items) {
          count = cart?.cart_items?.length || 0;
        }

        ctx.body = {
          data: {
            count,
          },
        };
      } catch (error) {
        console.error("Error getting cart count", error);
        return ctx.badRequest("Error getting cart count", { error });
      }
    },
  })
);
