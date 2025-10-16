/**
 * Base type representing an item in a collection.
 */
export type CollectionItem = {
  /** Unique numeric ID of the item */
  id: number;
  /** Unique document identifier (string) */
  documentId: string;
};

/**
 * Represents a selectable choice for a quiz question.
 */
export type Choice = CollectionItem & {
  /** Order of the choice within the question */
  order: number;
  /** Label displayed to the user */
  label: string;
  /** Value associated with the choice (used for submission) */
  value: number;
};

/**
 * Represents a quiz question.
 */
export type Question = CollectionItem & {
  /** Order of the question within the quiz */
  order: number;
  /** Unique slug used for routing and identification */
  slug: string;
  /** The question text displayed to the user */
  text: string;
  /** List of choices available for the question */
  choices: Array<Choice>;
};

/**
 * Represents the outcome/result of a completed quiz.
 */
export type Outcome = CollectionItem & {
  /** Title of the outcome/result */
  title: string;
  /** Description or explanation of the outcome */
  text: string;
  /** Supporting proof or example for the outcome */
  proof: string;
};

/**
 * Represents a user's quiz submission.
 */
export type Submission = CollectionItem & {
  /** Email of the user who submitted the quiz */
  email: string;
  /** Indicates if the submission is complete */
  is_complete: boolean;
  /** Optional outcome if the submission is complete */
  outcome?: Outcome;
};

/**
 * Represents an answer submitted for a particular question in a submission.
 */
export type SubmissionAnswer = CollectionItem & {
  /** The submission to which this answer belongs */
  submission: Submission;
  /** The question being answered */
  question: Question;
  /** The selected choice for this question */
  choice: Choice;
};
