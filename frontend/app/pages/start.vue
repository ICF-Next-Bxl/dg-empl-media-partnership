<script lang="ts" setup>
/**
 * This component allows the user to submit their email in order to
 * receive quiz results via email. It uses Zod for validation,
 * and the Nuxt UI Form components for handling the form state.
 */

import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const store = useAppStore();

/**
 * Zod schema defining form validation rules.
 * - `email`: must be a valid email string, otherwise triggers "Invalid email".
 */
const schema = z.object({
  email: z.string().email("Invalid email"),
});

type Schema = z.output<typeof schema>;

/**
 * Reactive form state (email field only).
 * Using `Partial` allows initializing with undefined.
 */
const state = reactive<Partial<Schema>>({
  email: undefined,
});

/**
 * Computed property to check if the form data is valid.
 * Runs `schema.safeParse` to validate the current form state.
 * Returns a boolean indicating overall validity.
 */
const isFormValid = computed(() => {
  const result = schema.safeParse(state);
  return result.success;
});

/**
 * Handles form submission.
 * - Receives the validated form data through `FormSubmitEvent`.
 * - Calls `store.startSubmission` to initiate a submission process.
 * - If successful, redirects the user to the quiz results page.
 */
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
    <!--
      Form section for submitting an email address.
      Uses Nuxt UI components for styling and validation.
    -->

    <!-- Informational section at the top of the form -->
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

      <!-- Email input field -->
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

    <!-- Submit button section -->
    <div class="mt-[10dvh]">
      <UButton type="submit" :disabled="!isFormValid">
        start the quizz
      </UButton>
    </div>
  </UForm>
</template>
