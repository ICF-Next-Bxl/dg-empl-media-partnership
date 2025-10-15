export default {
  async getAllData() {
    const [questions] = await Promise.all([
      strapi.documents("api::question.question").findMany({
        populate: "choices",
      }),
    ]);

    return {
      questions,
    };
  },
};
