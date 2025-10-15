/**
 * Strapi Lifecycle for the Submission Answer content type.
 *
 * This lifecycle automatically generates and updates the `related_title` field
 * for `submission-answer` entries based on their associated question and choice.
 *
 * It ensures consistent naming of submission anwser in the form:
 *   `${question.slug} - [${choice.label}]`
 *
 * This occurs on both `beforeCreate` and `beforeUpdate` events.
 *
 * It calculates and updates the completion of a submission when answers are created or updated.
 * If an outcome matching the whole Submission's submission_anwsers is found, the submission is marked as complete, and the outcome is linked.
 *
 * This occurs on both `afterCreate` and `afterUpdate` events.
 *
 * @module lifecycle/submission-answer
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

/**
 * Fetches the label of a Choice by its ID.
 *
 * @async
 * @param {number} id - The ID of the choice to look up.
 * @returns {Promise<string>} - The label of the choice, or an empty string if not found.
 */
const getChoiceLabel = async (id: number): Promise<string> => {
  const o = await strapi.documents("api::choice.choice").findFirst({
    filters: {
      id: { $eq: id },
    },
  });

  // Return the label or an empty string if choice is missing
  return o?.label ?? "";
};

const checkAndUpdateSubmission = async (submissionId: number) => {
  if (!submissionId) return;
  // 1. fetch the submission with all answer
  const submission = await strapi
    .documents("api::submission.submission")
    .findFirst({
      filters: { id: { $eq: submissionId } },
      populate: {
        submission_answers: {
          populate: ["question", "choice"],
        },
      },
    });

  if (!submission) return;

  // 2. Fetch all outcomes with their paths
  const outcomes = await strapi.documents("api::outcome.outcome").findMany({
    populate: {
      outcome_paths: {
        populate: ["question", "choice"],
      },
    },
  });

  // 3.For each outcom, check if all its paths are matched by the submission answers
  for (const outcome of outcomes) {
    if (!outcome.outcome_paths || outcome.outcome_paths.length === 0) continue;

    const allPathsMatched = outcome.outcome_paths.every((path: any) => {
      // Trouver si une réponse correspond à ce path
      return submission.submission_answers.some((answer: any) => {
        return answer.choice?.id === path.choice?.id;
      });
    });

    // 4. If all paths are matched, mark submission as complete and link the outcome
    if (allPathsMatched) {
      await strapi.documents("api::submission.submission").update({
        documentId: submission.documentId,
        data: {
          is_complete: true,
          outcome: outcome.id,
        },
      });

      console.log(
        `✅ Submission ${submission.id} completed with outcome: ${outcome.title}`
      );
      return; // Stop at first outcome matched
    }
  }

  console.log(`⏳ Submission ${submission.id} not yet complete.`);
};

export default {
  /**
   * Lifecycle hook: Runs before an Submission Answer is created.
   *
   * Automatically populates the `related_title` field based on the connected
   * question’s slug and the choice's label.
   *
   * Format example:
   *   "question-slug - choice A"
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
      const questionId = data.question?.set?.[0]?.id ?? data.question?.id;

      // Fetch slug and build related_title
      if (questionId) {
        const slug = await getQuestionSlug(questionId);
        if (slug) {
          data.related_title = `${slug} - `;
        }
      }

      const choiceId = data.choice?.set?.[0]?.id ?? data.choice?.id;

      if (choiceId) {
        const label = await getChoiceLabel(choiceId);
        if (label) {
          data.related_title += label;
        }
      }
    }
  },

  /**
   * Lifecycle hook: Runs after an Submission Answer is created.
   *
   * Automatically populates the related Submission if an Outcome is matched based on the current set of answers.
   *
   * @async
   * @param {object} event - Strapi lifecycle event context.
   * @param {object} event.result - Event parameters, including the data to be created.
   * @returns {Promise<void>}
   */
  async afterCreate(event: any): Promise<void> {
    const { data } = event.params;
    if (data.submission?.set.length > 0 && data.submission.set[0]?.id) {
      await checkAndUpdateSubmission(data.submission.set[0]?.id);
    }
  },

  /**
   * Lifecycle hook: Runs before an Submission Answer is updated.
   *
   * Rebuilds the `related_title` to reflect any updated question or choice relationships changes.
   * This ensures data consistency between question slugs, choices label and related submission answers.
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
      populate: ["question", "choice"],
    });

    // Reconstruct related_title with the associated question's slug
    if (existing.question) {
      data.related_title = `${existing.question.slug} - `;
    }
    // Append the the choice label part

    if (existing.choice) {
      data.related_title += existing.choice.label;
    }
  },

  /**
   * Lifecycle hook: Runs after an Submission Answer is updated.
   *
   * Automatically populates the related Submission if an Outcome is matched based on the current set of answers.
   *
   * @async
   * @param {object} event - Strapi lifecycle event context.
   * @param {object} event.result - Event parameters, including the data to be created.
   * @returns {Promise<void>}
   */
  async afterUpdate(event: any): Promise<void> {
    const { data } = event.params;
    if (data.submission?.set.length > 0 && data.submission.set[0]?.id) {
      await checkAndUpdateSubmission(data.submission.set[0]?.id);
    }
  },
};
