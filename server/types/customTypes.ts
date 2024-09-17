import { RequestContext } from "@strapi/strapi";

export type CustomRoutes = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: string;
  config?: {
    auth?: boolean;
    policies?: (
      | string
      | ((policyContext: any, config: any, Obj: { strapi: any }) => boolean)
      | {
          name: string;
          config: object;
        }
    )[];
    middlewares?: (
      | string
      | { name: string; config: Object }
      | ((ctx: RequestContext, next: () => void) => void)
    )[];
  };
}[];
