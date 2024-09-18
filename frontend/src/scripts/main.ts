if ("serviceWorker" in navigator) {
  const swScriptPath = import.meta.env.DEV
    ? `service-worker.js?${Date.now()}`
    : `service-worker.js`;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(swScriptPath, { scope: "/" })
      .then(() => {
        console.log("service worker regitsered");
      })
      .catch((err) => {
        console.log("error creating service worker", err);
      });
  });
}
