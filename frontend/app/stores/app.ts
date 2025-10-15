import type {
  Choice,
  Question,
  Submission,
  SubmissionAnswer,
} from "~/models/quizz";

export const useAppStore = defineStore("appStore", () => {
  const {
    fetchBulkData,
    createSubmission,
    createSubmissionAnswer,
    updateSubmissionAnswer,
    checkSubmissionComplete,
  } = useStrapi();

  const isLoading = ref(false);
  const isLoaded = ref(false);
  const questions = ref<Array<Question>>([]);
  const answers = ref<Record<number, SubmissionAnswer>>({});
  const question = ref<Question>();
  const submission = ref<Submission | undefined>(undefined);

  const loadBulkData = async () => {
    if (!isLoaded.value && !isLoading.value) {
      isLoading.value = true;
      const data = await fetchBulkData();
      if (data) {
        questions.value = data.questions.sort((a, b) => a.order - b.order);
        question.value = questions.value.find((q) => q.order == 1);
        isLoaded.value = true;
      }
      isLoading.value = false;
    }
    return isLoaded.value;
  };

  const startSubmission = async (
    email: string
  ): Promise<Question | undefined> => {
    submission.value = await createSubmission(email);
    return reset();
  };

  const _nextQuestion = () => {
    if (question.value) {
      question.value = questions.value.find(
        (q) => q.order > question.value!.order
      );
    }
    return question.value;
  };

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
        submissionAnswer = await updateSubmissionAnswer(existingAnswer, choice);
      } else {
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

  const reset = () => {
    const q = questions.value.find((q) => q.order == 1);
    answers.value = {};
    if (q) {
      question.value = q;
    }
    return question.value;
  };

  return {
    isLoaded,
    isLoading,
    questions,
    question,
    submission,
    loadBulkData,
    reset,
    startSubmission,
    addSubmissionAnswer,
    checkSubmissionIsComplete,
  };
});
