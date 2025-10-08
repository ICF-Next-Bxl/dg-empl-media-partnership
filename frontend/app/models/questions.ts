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

export type Outcome = {
  title: string;
  text: string;
  proof: string;
  path: Array<number>;
};
