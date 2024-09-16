import axios from "axios";

const stripeApi = axios.create({
  baseURL: import.meta.env.PUBLIC_STRAPI_URL,
});

export { stripeApi };
