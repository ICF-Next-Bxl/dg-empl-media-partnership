export default {
  routes: [
    {
      method: "GET",
      path: "/bulk/all-data",
      handler: "bulk.getAllData",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
