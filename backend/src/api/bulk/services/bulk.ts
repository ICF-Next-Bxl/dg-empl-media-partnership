export default {
  async getAllData() {
    try {
      const [questions, outcomes] = await Promise.all([
        strapi.documents("api::question.question").findMany({
          populate: "choices",
        }),
        strapi.documents("api::outcome.outcome").findMany({
          populate: "outcome_paths",
        }),
      ]);

      return {
        questions,
        outcomes,
      };
    } catch (error) {
      throw error;
    }
  },
};
