import type { BulkData } from "~/models/api";
import type {
  Choice,
  Question,
  Submission,
  SubmissionAnswer,
} from "~/models/quizz";

export const useStrapi = () => {
  const config = useRuntimeConfig();
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

  const createSubmission = async (email: string) => {
    try {
      const { data } = await $fetch<{ data: Submission }>("/api/submissions", {
        baseURL: config.public.strapiUrl,
        method: "POST",
        body: {
          data: {
            email,
          },
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
          data: {
            choice: choice.id,
          },
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

  const checkSubmissionComplete = async (
    submission: Submission
  ): Promise<Submission | undefined> => {
    try {
      const { data } = await $fetch<{ data: Submission }>(
        `/api/submissions/${submission.documentId}`,
        {
          baseURL: config.public.strapiUrl,
          method: "GET",
          query: {
            populate: "outcome",
          },
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
