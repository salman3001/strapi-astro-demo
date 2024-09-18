- username - therodfighter@gmail.com
- password - Salman@123

# Starpi Astro Demo

This Project demonstates integartion of strapi backend with astro frontend. Some features included.

- Signin, Signup, Authorization,
- Products listing and Details
- Add to cart and update cart.
- Realtime events with strapi io plugin
- PWA and service worker inegration for caching.

## Instructions

- clone this repo. And run `npm install` in both frontend and server folder.
- if you face installation error in server. Try switching node version to 18 with NVM. If error is related to better Sqlite then you have to install the node-gyp and its dependencies. check [node-gyp docs](https://github.com/nodejs/node-gyp).
- run below code in respective folders

```typescript
// cd frontend
npm run dev

// cd server
npm run develop
```

- Strapi admin username : therodfighter@gmail.com
- Strapi admin paswsword : Salman@123
- Frontend username : salman@gmail.com
- Frontend password: Salman@123
- For frontend you can signup and create new account also.
- Try adding new products from strapi admin.
- From frontend check the cart functionality.
- Frontend is listening for the cart-item update and create event with socket IO. (for demonstartion only). will trigger alert if an item is added or updated in cart.
- Service worker is added and caching logic is written.
- Most of the get requests are cached. except some api requests to strapi server have been excluded from cache. like "api/cart", "api/auth" etc. check the service worker file.
- A minimum manifest file was added to install the PWA app.

## Notes

pleae note that i have added the minimum functionality as per task assigned to me. UI is very basic. Many features like pagination, searching , sorting filtering were not added. Please let me know if you want to see more features.
