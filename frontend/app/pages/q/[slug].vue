<script lang="ts" setup>
/**
 * Quiz Question Page
 *
 * This page displays a single quiz question and its associated choices.
 * Users select an answer, which is validated and submitted.
 * Navigation proceeds to the next question or the outcome page.
 */

import * as z from "zod";
import type { RadioGroupItem } from "@nuxt/ui";
import type { Question } from "~/models/quizz";

definePageMeta({
  /**
   * Middleware ensures that the user has an active quiz submission.
   * Redirects to the start page if no submission exists.
   */
  middleware: "require-submission",
});

const route = useRoute();

/**
 * Reactive reference to the current quiz question.
 */
const question = ref<Question>();

/**
 * Reactive reference to the list of choices formatted for URadioGroup.
 */
const items = ref<RadioGroupItem[]>();

/**
 * Access global store for quiz state and submissions.
 */
const store = useAppStore();

/**
 * Indicates if the app is currently checking for quiz outcome.
 * Used to show loading state or prevent duplicate navigation.
 */
const isCheckingOutcome = ref(false);

/**
 * Watches the current route slug and updates the question and items accordingly.
 */
watchEffect(() => {
  const q = store.questions.find((q) => q.slug == route.params.slug);
  if (q) {
    question.value = q;
    items.value = q.choices;
    store.currentSlide += 1;
  }
});

/**
 * Zod schema to validate user choice input.
 * - choice: must be an integer representing the selected option.
 */
const schema = z.object({
  choice: z.int(),
});
type Schema = z.output<typeof schema>;

/**
 * Reactive state holding the current user's choice.
 */
const state = reactive<Partial<Schema>>({
  choice: undefined,
});

/**
 * Triggered when the user changes their choice.
 * Validates the input and submits the answer if valid.
 */
async function onChoiceChange() {
  const validation = schema.safeParse(state);
  if (validation.success) {
    await submitAnswer(validation.data);
  }
}

/**
 * Submits the selected answer to the store.
 * Handles navigation to next question or outcome page.
 *
 * @param formData - validated choice from the form
 */
async function submitAnswer(formData: Schema) {
  if (formData.choice && question.value) {
    // Find the selected choice object
    const selectedChoice = question.value.choices.find(
      (c) => c.value === formData.choice
    );
    if (selectedChoice) {
      // Add answer to submission in store
      const nextQuestion = await store.addSubmissionAnswer(selectedChoice);

      if (nextQuestion) {
        // Navigate to next question if available
        navigateTo(`/q/${nextQuestion.slug}`);
      } else {
        // Otherwise, check for outcome completion
        isCheckingOutcome.value = true;
        let counter = 0;

        const interval = setInterval(async () => {
          counter++;
          try {
            await store.checkSubmissionIsComplete();

            if (store.submission?.is_complete && store.submission?.outcome) {
              clearInterval(interval);
              navigateTo("/outcome");
            } else if (counter >= 10) {
              // If outcome cannot be determined after multiple checks
              clearInterval(interval);
              isCheckingOutcome.value = false;
              createError({
                statusCode: 500,
                statusMessage: "Cannot determine outcome",
              });
            }
          } catch {
            // Stop interval if an error occurs
            clearInterval(interval);
          }
        }, 250); // Poll every 250ms
      }
    }
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <!--
      Container for the question display and answer selection.
      Centers the content vertically and horizontally.
    -->
    <ActionSection>
      <!-- Leading slot: displays the question text -->
      <template #leading>
        <h1 class="text-2xl md:text-3xl pb-4 md:pb-0">
          {{ question?.text }}
        </h1>
      </template>

      <!-- Default slot: displays the choices in a radio group -->
      <template #default>
        <UForm v-if="question" :schema="schema" :state="state">
          <URadioGroup
            v-model="state.choice"
            :items="items"
            class="flex-1"
            :ui="{
              item: 'text-xl items-center space-x-4',
              fieldset: 'gap-y-4',
              base: 'ring-white w-6 h-6 ring-2',
            }"
            @change="onChoiceChange"
          />
        </UForm>
      </template>
    </ActionSection>
    <p class="mt-[10dvh] text-4xl">
      {{ store.currentSlide }} / {{ store.maxSlide }}
    </p>
  </div>
</template>
