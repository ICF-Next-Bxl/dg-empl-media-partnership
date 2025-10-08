<script lang="ts" setup>
import * as z from "zod";
import type { /*FormSubmitEvent,*/ RadioGroupItem } from "@nuxt/ui";
import type { Question } from "~/models/questions";

const route = useRoute();
const question = ref<Question>();
const items = ref<RadioGroupItem[]>();
const store = useAppStore();

watchEffect(() => {
  const q = store.questions.find((q) => q.slug == route.params.slug);
  if (q) {
    question.value = q;
    items.value = q.answers;
  }
});

const schema = z.object({
  answer: z.int(),
});
type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  answer: undefined,
});

async function onSubmit(/*event: FormSubmitEvent<Schema>*/) {
  if (state.answer) {
    const next = store.addAnswer(state.answer);
    if (next) {
      navigateTo(`/q/${next.slug}`);
    } else {
      navigateTo("/outcome");
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
      <URadioGroup v-model="state.answer" :items="items" />
      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>
