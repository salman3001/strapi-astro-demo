/**
 * cart-item router
 */

import { CustomRoutes } from "../../../../types/customTypes";

const routes: CustomRoutes = [
  {
    method: "POST",
    path: "/carts/add-to-cart",
    handler: "api::cart.cart.addToCart",
  },
];

export default { routes };
