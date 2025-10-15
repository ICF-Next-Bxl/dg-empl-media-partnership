export type CollectionItem = {
  id: number;
  documentId: string;
};

export type Choice = CollectionItem & {
  order: number;
  label: string;
  value: number;
};

export type Question = CollectionItem & {
  order: number;
  slug: string;
  text: string;
  choices: Array<Choice>;
};

export type Outcome = CollectionItem & {
  title: string;
  text: string;
  proof: string;
};

export type Submission = CollectionItem & {
  email: string;
  is_complete: boolean;
  outcome?: Outcome;
};

export type SubmissionAnswer = CollectionItem & {
  submission: Submission;
  question: Question;
  choice: Choice;
};
