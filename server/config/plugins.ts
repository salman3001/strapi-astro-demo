export default () => ({
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::product.product"],
      socket: {
        serverOptions: {
          cors: { origin: "http://localhost:4321/", methods: ["GET", "POST"] },
        },
      },
    },
  },
});
