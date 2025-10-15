<script lang="ts" setup>
import * as z from "zod";
import type { RadioGroupItem } from "@nuxt/ui";
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

async function onChoiceChange() {
  const validation = schema.safeParse(state);
  if (validation.success) {
    await submitAnswer(validation.data);
  }
}

async function submitAnswer(formData: Schema) {
  if (formData.choice && question.value) {
    const selectedChoice = question.value.choices.find(
      (c) => c.value === formData.choice
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
  <div class="flex flex-col items-center justify-center">
    <ActionSection>
      <template #leading>
        <h1 class="text-3xl">
          {{ question?.text }}
        </h1>
      </template>
      <template #default>
        <UForm v-if="question" :schema="schema" :state="state">
          <URadioGroup
            v-model="state.choice"
            :items="items"
            class="flex-1"
            @change="onChoiceChange"
          />
        </UForm>
      </template>
    </ActionSection>
  </div>
</template>
