/**
 * cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::cart.cart", ({}) => ({
  async addToCart(ctx) {
    try {
      const { productId } = ctx.request.body;
      const user = ctx?.state?.user;
      console.log(productId);

      if (!productId) {
        throw new Error("Product id is required");
      }

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

      let existingCartItem = null;
      cart?.cart_items?.some((item: any) => {
        if (item?.product?.id === +productId) {
          existingCartItem = item;
          return true;
        } else {
          false;
        }
      });

      if (existingCartItem) {
        await strapi.db.query("api::cart-item.cart-item").update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            qty: existingCartItem.qty + 1,
          },
        });
      } else {
        const item = await strapi.db.query("api::cart-item.cart-item").create({
          data: {
            qty: 1,
            product: productId,
            publishedAt: Date.now(),
          },
        });

        if (item) {
          await strapi.db.query("api::cart.cart").update({
            where: {
              id: cart.id,
            },
            data: {
              cart_items: {
                connect: [item?.id],
              },
            },
          });
        }
      }

      console.log(existingCartItem);
      ctx.body = "ok";
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return ctx.badRequest("Could not add item to cart", { error });
    }
  },
}));
