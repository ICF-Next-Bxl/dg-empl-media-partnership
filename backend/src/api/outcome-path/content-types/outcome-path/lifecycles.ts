/**
 * Strapi Lifecycle for the Outcome Path content type.
 *
 * This lifecycle automatically generates and updates the `related_title` field
 * for `outcome-path` entries based on their associated question and value.
 *
 * It ensures consistent naming of outcome paths in the form:
 *   `${question.slug} - [${value}]`
 *
 * The hook handles both `beforeCreate` and `beforeUpdate` events.
 *
 * @module lifecycle/outcome-path
 */

/**
 * Fetches the slug of a Question by its ID.
 *
 * @async
 * @param {number} id - The ID of the question to look up.
 * @returns {Promise<string>} - The slug of the question, or an empty string if not found.
 */
const getQuestionSlug = async (id: number): Promise<string> => {
  const o = await strapi.documents("api::question.question").findFirst({
    filters: {
      id: { $eq: id },
    },
  });

  // Return the slug or an empty string if question is missing
  return o?.slug ?? "";
};

export default {
  /**
   * Lifecycle hook: Runs before an Outcome Path is created.
   *
   * Automatically populates the `related_title` field based on the connected
   * question’s slug and the current path value.
   *
   * Format example:
   *   "question-slug - [3]"
   *
   * @async
   * @param {object} event - Strapi lifecycle event context.
   * @param {object} event.params - Event parameters, including the data to be created.
   * @returns {Promise<void>}
   */
  async beforeCreate(event: any): Promise<void> {
    const { data } = event.params;

    // Skip if related_title is already set manually
    if (!data.related_title) {
      // Try to extract question ID from either a connected relationship or direct ID
      const questionId = data.question?.connect?.[0]?.id ?? data.question?.id;

      // Fetch slug and build related_title
      if (questionId) {
        const slug = await getQuestionSlug(questionId);
        if (slug) {
          data.related_title = `${slug} - `;
        }
      }

      // Always append the [value] part, even if slug is missing
      data.related_title += `[${data.value ?? ""}]`;
    }
  },

  /**
   * Lifecycle hook: Runs before an Outcome Path is updated.
   *
   * Rebuilds the `related_title` to reflect any updated question relationships or value changes.
   * This ensures data consistency between question slugs and related outcome paths.
   *
   * @async
   * @param {object} event - Strapi lifecycle event context.
   * @param {object} event.params - Event parameters, including update data and model information.
   * @returns {Promise<void>}
   */
  async beforeUpdate(event: any): Promise<void> {
    const { data } = event.params;

    // Reset related_title before reconstruction
    data.related_title = "";

    // Retrieve the existing document to access its related question
    const existing = await strapi.documents(event.model.uid).findOne({
      documentId: data.documentId,
      populate: ["question"],
    });

    // Reconstruct related_title with the associated question's slug
    if (existing.question) {
      data.related_title = `${existing.question.slug} - `;
    }

    // Append the current [value] part
    data.related_title += `[${data.value ?? ""}]`;
  },
};
