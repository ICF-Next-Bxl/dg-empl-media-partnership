export default {
  async getAllData(ctx) {
    try {
      const data = await strapi.service("api::bulk.bulk").getAllData();

      ctx.body = {
        data,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
