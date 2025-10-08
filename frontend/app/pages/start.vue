<script lang="ts" setup>
import * as z from "zod";
/*import type { FormSubmitEvent } from "@nuxt/ui";*/
const store = useAppStore();
const schema = z.object({
  email: z.email("Invalid email"),
});
type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  email: undefined,
});

async function onSubmit(/*event: FormSubmitEvent<Schema>*/) {
  const q = store.questions.find((q) => q.order == 1);
  if (q) {
    navigateTo(`/q/${q.slug}`);
  }
}
</script>
<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h2>Receive the results of this quiz in your email</h2>
    <p>
      Want to keep track of your progress and receive your results? Just drop
      your email below – we’ll handle the rest!
    </p>
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UButton type="submit"> start the quizz </UButton>
  </UForm>
</template>
