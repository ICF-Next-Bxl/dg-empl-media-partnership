<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent, RadioGroupItem } from "@nuxt/ui";
import type { Question } from "~/models/quizz";

definePageMeta({
  middleware: "require-submission",
});

const route = useRoute();
const question = ref<Question>();
const items = ref<RadioGroupItem[]>();
const store = useAppStore();
const isCheckingOutcome = ref(false);

watchEffect(() => {
  const q = store.questions.find((q) => q.slug == route.params.slug);
  if (q) {
    question.value = q;
    items.value = q.choices;
  }
});

// TODO: hasPreviousQuestion
// TODO: hasNextQuestion
// TODO: current "step", total step (+1 for outcome)

const schema = z.object({
  choice: z.int(),
});
type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  choice: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data.choice && question.value) {
    const selectedChoice = question.value.choices.find(
      (c) => c.value === event.data.choice
    );
    if (selectedChoice) {
      const nextQuestion = await store.addSubmissionAnswer(selectedChoice);
      if (nextQuestion) {
        navigateTo(`/q/${nextQuestion.slug}`);
      } else {
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
              clearInterval(interval);
              isCheckingOutcome.value = false;
              createError({
                statusCode: 500,
                statusMessage: "Cannot determine outcome",
              });
            }
          } catch {
            clearInterval(interval);
          }
        }, 250);
      }
    }
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-auto max-w-5xl mt-12 rounded-2xl bg-secondary-800/70 p-4 border-2 border-secondary-400"
  >
    <UForm
      v-if="question"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <p>{{ question?.text }}</p>
      <URadioGroup v-model="state.choice" :items="items" />
      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>
