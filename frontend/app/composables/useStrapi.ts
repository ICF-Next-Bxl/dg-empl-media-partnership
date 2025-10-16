/**
 * Composable for interacting with Strapi API endpoints related to the quiz.
 *
 * Provides functions to:
 * - Fetch all bulk quiz data
 * - Create a submission
 * - Create and update submission answers
 * - Check if a submission is complete
 */

import type { BulkData } from "~/models/api";
import type {
  Choice,
  Question,
  Submission,
  SubmissionAnswer,
} from "~/models/quizz";

export const useStrapi = () => {
  const config = useRuntimeConfig();

  /**
   * Fetches all bulk quiz data from the Strapi API.
   * This includes questions, choices, and outcomes.
   */
  const fetchBulkData = async () => {
    const { data, error } = await useFetch<{ data: BulkData }>(
      "/api/bulk/all-data",
      {
        baseURL: config.public.strapiUrl,
        key: "strapi-bulk-data",
      }
    );

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode || 500,
        message: "Cannot load Bulk Data from API",
      });
    }

    return data.value?.data;
  };

  /**
   * Creates a new quiz submission for a given email.
   * @param email - The email of the user submitting the quiz
   */
  const createSubmission = async (email: string) => {
    try {
      const { data } = await $fetch<{ data: Submission }>("/api/submissions", {
        baseURL: config.public.strapiUrl,
        method: "POST",
        body: {
          data: { email },
        },
      });
      return data;
    } catch {
      throw createError({
        statusCode: 500,
        message: "Cannot create Submission",
      });
    }
  };

  /**
   * Creates a new submission answer linking a submission, question, and selected choice.
   */
  const createSubmissionAnswer = async (
    submission: Submission,
    question: Question,
    choice: Choice
  ): Promise<SubmissionAnswer | undefined> => {
    try {
      const { data } = await $fetch<{ data: SubmissionAnswer }>(
        "/api/submission-answers",
        {
          baseURL: config.public.strapiUrl,
          method: "POST",
          body: {
            data: {
              submission: submission.id,
              question: question.id,
              choice: choice.id,
            },
          },
        }
      );
      return data;
    } catch {
      throw createError({
        statusCode: 500,
        message: "Cannot create Submission Answer",
      });
    }
  };

  /**
   * Updates an existing submission answer with a new choice.
   */
  const updateSubmissionAnswer = async (
    submissionAnswer: SubmissionAnswer,
    choice: Choice
  ): Promise<SubmissionAnswer | undefined> => {
    const { data, error } = await useFetch<{ data: SubmissionAnswer }>(
      `/api/submission-answers/${submissionAnswer.id}`,
      {
        baseURL: config.public.strapiUrl,
        method: "PUT",
        body: {
          data: { choice: choice.id },
        },
      }
    );

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode || 500,
        message: "Cannot update Submission Answer",
      });
    }

    return data.value?.data;
  };

  /**
   * Checks if a submission is complete and fetches the associated outcome if available.
   */
  const checkSubmissionComplete = async (
    submission: Submission
  ): Promise<Submission | undefined> => {
    try {
      const { data } = await $fetch<{ data: Submission }>(
        `/api/submissions/${submission.documentId}`,
        {
          baseURL: config.public.strapiUrl,
          method: "GET",
          query: { populate: "outcome" },
        }
      );
      return data;
    } catch {
      throw createError({
        statusCode: 500,
        message: "Cannot check Submission status",
      });
    }
  };

  return {
    fetchBulkData,
    createSubmission,
    createSubmissionAnswer,
    updateSubmissionAnswer,
    checkSubmissionComplete,
  };
};
