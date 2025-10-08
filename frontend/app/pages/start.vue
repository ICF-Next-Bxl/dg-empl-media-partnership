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
  const q = store.reset();
  if (q) {
    navigateTo(`/q/${q.slug}`);
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-auto max-w-5xl mt-12 rounded-2xl bg-secondary-800/70 p-4 border-2 border-secondary-400"
  >
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <h2>Receive the results of this quiz in your email</h2>
      <p>
        Want to keep track of your progress and receive your results? Just drop
        your email below – we’ll handle the rest!
      </p>
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" variant="subtle" />
      </UFormField>

      <UButton type="submit"> start the quizz </UButton>
    </UForm>
  </div>
</template>
