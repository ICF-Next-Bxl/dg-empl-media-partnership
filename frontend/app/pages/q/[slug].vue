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
  const next = store.questions.find(
    (q) => q.order > (question.value?.order ?? 0)
  );
  if (next) {
    navigateTo(`/q/${next.slug}`);
  } else {
    navigateTo("/end");
  }
}
</script>
<template>
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
</template>
