export default () => ({
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::product.product", "api::cart-item.cart-item"],
      socket: {
        serverOptions: {
          cors: { origin: "*", methods: ["GET", "POST"] },
        },
      },
    },
  },
});
