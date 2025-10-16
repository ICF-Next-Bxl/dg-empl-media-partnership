/**
 * App Store (Pinia) for managing the quiz application state.
 *
 * Responsibilities:
 * - Load bulk quiz data
 * - Track current submission, questions, and answers
 * - Manage quiz flow (current question / slide)
 * - Handle submission answers and check completion
 */

import type {
  Choice,
  Question,
  Submission,
  SubmissionAnswer,
} from "~/models/quizz";

export const useAppStore = defineStore("appStore", () => {
  // Strapi API composable functions
  const {
    fetchBulkData,
    createSubmission,
    createSubmissionAnswer,
    updateSubmissionAnswer,
    checkSubmissionComplete,
  } = useStrapi();

  /** ================== STATE ================== */
  const isLoading = ref(false); // True while bulk data is loading
  const isLoaded = ref(false); // True after bulk data has been successfully loaded
  const questions = ref<Array<Question>>([]); // All quiz questions
  const answers = ref<Record<number, SubmissionAnswer>>({}); // Answers keyed by question ID
  const question = ref<Question>(); // Current active question
  const submission = ref<Submission | undefined>(undefined); // Current submission

  /** ================== COMPUTED ================== */
  // Maximum slide (number of questions)
  const maxSlide = computed(() => questions.value.length);

  // Current slide index
  const currentSlide = ref<number>(0);

  /** ================== ACTIONS ================== */

  /**
   * Load bulk quiz data from Strapi.
   * Sorts questions by order and sets the first question as active.
   */
  const loadBulkData = async () => {
    if (!isLoaded.value && !isLoading.value) {
      isLoading.value = true;
      const data = await fetchBulkData();
      if (data) {
        questions.value = data.questions.toSorted((a, b) => a.order - b.order);
        question.value = questions.value.find((q) => q.order === 1);
        isLoaded.value = true;
      }
      isLoading.value = false;
    }
    return isLoaded.value;
  };

  /**
   * Start a new submission with the given email.
   * Resets the quiz flow to the first question.
   */
  const startSubmission = async (
    email: string
  ): Promise<Question | undefined> => {
    submission.value = await createSubmission(email);
    return reset();
  };

  /**
   * Move to the next question in the quiz flow.
   */
  const _nextQuestion = () => {
    if (question.value) {
      question.value = questions.value.find(
        (q) => q.order > question.value!.order
      );
    }
    return question.value;
  };

  /**
   * Record an answer for the current question.
   * Updates existing answer or creates a new one if needed.
   * Returns the next question.
   */
  const addSubmissionAnswer = async (
    choice: Choice
  ): Promise<Question | undefined> => {
    if (
      question.value &&
      submission.value &&
      question.value.choices.map((c) => c.id).includes(choice.id)
    ) {
      let submissionAnswer: SubmissionAnswer | undefined;
      const existingAnswer = answers.value[question.value.id];

      if (existingAnswer !== undefined) {
        // Update existing answer
        submissionAnswer = await updateSubmissionAnswer(existingAnswer, choice);
      } else {
        // Create new answer
        submissionAnswer = await createSubmissionAnswer(
          submission.value,
          question.value,
          choice
        );
      }

      if (submissionAnswer) {
        answers.value[question.value.id] = submissionAnswer;
        return _nextQuestion();
      }
    }
  };

  /**
   * Checks if the current submission is complete and updates the submission state.
   */
  const checkSubmissionIsComplete = async (): Promise<boolean> => {
    if (submission.value) {
      const _submission = await checkSubmissionComplete(submission.value);
      if (_submission) {
        submission.value = _submission;
      }
      return submission.value.is_complete;
    }
    return false;
  };

  /**
   * Reset the quiz flow to the first question and clear answers.
   */
  const reset = () => {
    currentSlide.value = 0;
    const q = questions.value.find((q) => q.order === 1);
    answers.value = {};
    if (q) question.value = q;
    return question.value;
  };

  /** ================== RETURNED STORE ================== */
  return {
    // State
    isLoaded,
    isLoading,
    questions,
    question,
    submission,

    // Computed
    maxSlide,
    currentSlide,

    // Actions
    loadBulkData,
    reset,
    startSubmission,
    addSubmissionAnswer,
    checkSubmissionIsComplete,
  };
});
