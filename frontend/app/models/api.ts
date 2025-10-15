import type { Question } from "./quizz";

export type BulkData = {
  questions: Array<Question>;
};

export interface StrapiBulkResponse {
  data: BulkData;
}
