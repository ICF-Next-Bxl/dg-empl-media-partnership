export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  proxy: {
    // https://github.com/strapi/strapi/issues/24452
    enabled: env.bool("APP_PROXY", false),
    koa: {
      proxy: true,
      proxyIpHeader: "X-Forwarded-For",
      maxIps: 1,
    },
  },
});
