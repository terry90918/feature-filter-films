module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/app-voicetube/" : "/",
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js"
    }
  }
};
