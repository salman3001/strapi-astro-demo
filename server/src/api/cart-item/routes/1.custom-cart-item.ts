/**
 * cart-item router
 */

import { CustomRoutes } from "../../../../types/customTypes";

const routes: CustomRoutes = [
  {
    method: "POST",
    path: "/cart-items/increment/:id",
    handler: "api::cart-item.cart-item.increment",
  },
  {
    method: "POST",
    path: "/cart-items/decrement/:id",
    handler: "api::cart-item.cart-item.decrement",
  },
  {
    method: "GET",
    path: "/cart-items/get-count",
    handler: "api::cart-item.cart-item.getCount",
  },
];

export default { routes };
