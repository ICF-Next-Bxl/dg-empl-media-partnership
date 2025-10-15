/**
 * useImporter composable for initializing Strapi content with predefined data.
 *
 * This module imports initial "questions" and "outcomes" into Strapi's database
 * only if no existing questions are present. It helps seed a new Strapi instance
 * with structured data for applications such as quizzes, decision trees, or surveys.
 *
 * @module useImporter
 */

import type { Core } from "@strapi/strapi";
import { questions, outcomes } from "../data/initial-data";
import type { Question, Answer, Outcome } from "../data/initial-data";

/**
 * Creates and returns a composable that handles importing initial data into Strapi.
 *
 * @param {Core.Strapi} strapi - The Strapi instance used to perform database operations.
 * @returns {{ importData: () => Promise<void> }} - An object exposing the importData method.
 */
export const useImporter = (strapi: Core.Strapi) => {
  /**
   * Checks if the database currently contains any questions.
   *
   * @async
   * @returns {Promise<boolean>} - Returns `true` if no questions exist, otherwise `false`.
   */
  const isEmpty = async (): Promise<boolean> => {
    const exists = await strapi.db.query("api::question.question").findMany({
      limit: 1,
    });
    return exists.length === 0;
  };

  /**
   * Creates a single Choice record in Strapi.
   *
   * @async
   * @param {Answer} answer - The answer (choice) data to create.
   * @returns {Promise<Answer>} - The created choice record.
   */
  const createChoice = async (answer: Answer): Promise<Answer> => {
    const choice = await strapi.db.query("api::choice.choice").create({
      data: {
        order: answer.order,
        label: answer.label,
        value: answer.value,
      },
    });
    return choice;
  };

  /**
   * Creates a Question record along with its related Choices.
   *
   * @async
   * @param {Question} question - The question data containing answers.
   * @returns {Promise<Question>} - The created question record.
   */
  const createQuestion = async (question: Question): Promise<Question> => {
    const choices: number[] = [];

    // Create each choice and collect its ID
    for (const answer of question.answers) {
      const choice = await createChoice(answer);
      choices.push(choice.id);
    }

    // Create the question and connect the choices
    const _question = await strapi.db.query("api::question.question").create({
      data: {
        order: question.order,
        text: question.text,
        slug: question.slug,
        choices: {
          connect: choices,
        },
      },
    });
    return _question;
  };

  /**
   * Creates an OutcomePath record associated with a question and value.
   *
   * @async
   * @param {number} value - The numeric path value.
   * @param {number} questionIndex - Index of the related question in the initial data.
   * @returns {Promise<number>} - The ID of the created outcome path.
   */
  const createOutcomePath = async (
    value: number,
    questionIndex: number
  ): Promise<number> => {
    const question = questions[questionIndex];

    const path = await strapi.db
      .query("api::outcome-path.outcome-path")
      .create({
        data: {
          value: value,
          question: question.id,
          related_title: `${question.slug} - [${value}]`,
        },
      });

    return path.id;
  };

  /**
   * Creates an Outcome record and all of its related OutcomePaths.
   *
   * @async
   * @param {Outcome} outcome - The outcome data including its path sequence.
   * @returns {Promise<void>} - Resolves when the outcome and its paths are created.
   */
  const createOutcome = async (outcome: Outcome): Promise<void> => {
    const outcomePaths: number[] = [];

    // Create each path and collect its ID
    for (let index = 0; index < outcome.path.length; index++) {
      const value = outcome.path[index];
      const pathId = await createOutcomePath(value, index);
      outcomePaths.push(pathId);
    }

    // Create the outcome and connect its paths
    await strapi.db.query("api::outcome.outcome").create({
      data: {
        title: outcome.title,
        text: outcome.text,
        proof: outcome.proof,
        outcome_paths: {
          connect: outcomePaths,
        },
      },
    });
  };

  /**
   * Imports all initial data into Strapi if the database is currently empty.
   *
   * The import process:
   * 1. Checks if any questions exist.
   * 2. If none, creates all questions and stores their IDs.
   * 3. Then creates all outcomes with their related outcome paths.
   *
   * @async
   * @returns {Promise<void>} - Resolves when the import is complete.
   */
  const importData = async (): Promise<void> => {
    if (await isEmpty()) {
      // Step 1: Create questions and update their IDs in memory
      for (const question of questions) {
        const _question = await createQuestion(question);
        question.id = _question.id;
      }

      // Step 2: Create outcomes linked to those questions
      for (const outcome of outcomes) {
        await createOutcome(outcome);
      }
    }
  };

  // Expose the import function
  return { importData };
};
