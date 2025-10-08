export type Answer = {
  id: number;
  order: number;
  label: string;
  value: number;
};

export type Question = {
  id: number;
  order: number;
  slug: string;
  text: string;
  answers: Array<Answer>;
};
