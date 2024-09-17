import { Strapi } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async afterCreate(event) {
        const { result } = event as any;

        // Check if the user has been created successfully
        if (result && result.id) {
          try {
            // Create a new cart for the user
            await strapi.db.query("api::cart.cart").create({
              data: {
                user: result.id,
                publishedAt: Date.now(),
              },
            });

            console.log("Cart created successfully for user:", result?.id);
          } catch (error) {
            console.error("Error creating cart for user:", result?.id, error);
          }
        }
      },
      async afterDelete(event) {
        const { result } = event as any;
        console.log(result);

        // Check if the user has been created successfully
        if (result && result.id) {
          try {
            // delet  cart for the user
            //logic here

            console.log("Cart deleted successfully for user:", result?.id);
          } catch (error) {
            console.error("Error deleted cart for user:", result?.id, error);
          }
        }
      },
    });
  },
};
