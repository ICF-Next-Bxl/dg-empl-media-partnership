<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
const store = useAppStore();

const schema = z.object({
  email: z.email("Invalid email"),
});
type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
});

const isFormValid = computed(() => {
  const result = schema.safeParse(state);
  return result.success;
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const q = await store.startSubmission(event.data.email);
  if (q) {
    navigateTo(`/q/${q.slug}`);
  }
}
</script>
<template>
  <UForm
    :schema="schema"
    :state="state"
    class="flex flex-col items-center justify-center"
    @submit="onSubmit"
  >
    <ActionSection>
      <template #leading>
        <h1 class="text-3xl md:text-4xl mb-4">
          Receive the results of this quiz in your email
        </h1>
        <p>
          Want to keep track of your progress and receive your results? Just
          drop your email below – we’ll handle the rest!
        </p>
      </template>
      <template #default>
        <UInput
          v-model="state.email"
          color="neutral"
          highlight
          variant="ghost"
          placeholder="your email"
          class="min-w-64 w-full md:max-w-64"
        />
      </template>
    </ActionSection>
    <div class="mt-[10dvh]">
      <UButton type="submit" :disabled="!isFormValid">
        start the quizz
      </UButton>
    </div>
  </UForm>
</template>
