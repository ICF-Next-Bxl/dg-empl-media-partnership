/**
 * Import the `Question` type from the quiz model.
 */
import type { Question } from "./quizz";

/**
 * BulkData represents a collection of quiz questions.
 */
export type BulkData = {
  /**
   * Array of quiz questions.
   */
  questions: Array<Question>;
};

/**
 * Represents the structure of a response from Strapi when fetching multiple quiz items.
 */
export interface StrapiBulkResponse {
  /**
   * The payload containing the bulk data.
   */
  data: BulkData;
}
