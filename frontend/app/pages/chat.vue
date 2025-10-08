<script lang="ts" setup>
import * as z from "zod";
import type { Question } from "~/models/questions";
import type { RadioGroupItem } from "@nuxt/ui";
const store = useAppStore();
const question = ref<Question | undefined>();
const messages = ref<Array<{ text: string; answer?: string }>>([]);
const leadCTA = ref<boolean>(false);
const chatMessage = ref<string>("");
const text = computed(() => chatMessage.value.split(" ").map((w) => w + " "));

const items = ref<RadioGroupItem[]>();
const schema = z.object({
  answer: z.int(),
});
type Schema = z.output<typeof schema>;
const state = reactive<Partial<Schema>>({
  answer: undefined,
});

const showAnswers = (): Promise<void> => {
  return new Promise((resolve) => {
    nextTick(() => {
      if (question.value) {
        items.value = question.value?.answers;
        setTimeout(resolve, 200);
      } else {
        resolve();
      }
    });
  });
};

onMounted(async () => {
  const q = store.questions.find((item) => item.order == 1);
  if (q) {
    question.value = q;
    await addChatMessage(q.text);
    await showAnswers();
  }
});

const addChatMessage = async (txt: string): Promise<void> => {
  return new Promise((resolve) => {
    chatMessage.value = txt;
    nextTick(() => {
      setTimeout(() => {
        resolve();
      }, text.value.length * 200);
    });
  });
};

const addHistoryMessage = async (message: {
  text: string;
  answer?: string;
}): Promise<void> => {
  return new Promise((resolve) => {
    messages.value.push(message);
    setTimeout(resolve, 200);
  });
};

const showOutcome = async () => {
  const outcomes = [
    "Thank you for completing the quiz! You will receive the results in your email",
    "Now that you have explored a range of media partnership ideas tailored to your project, let’s take the next step—together. Our team of experts is here to help you shape a strategy that’s not only aligned with your goals and audiences, but also creative and impactful.",
  ];
  for (const outcome of outcomes) {
    await addChatMessage(outcome);
    chatMessage.value = "";
    await addHistoryMessage({ text: outcome });
  }
  leadCTA.value = true;
};

async function onChange(/*event: FormSubmitEvent<Schema>*/) {
  const next = store.questions.find(
    (q) => q.order > (question.value?.order ?? 0)
  );

  const message: { text: string; answer: string } = {
    text: question.value?.text ?? "",
    answer:
      question.value?.answers.find((a) => a.value == state.answer)?.label ?? "",
  };

  question.value = undefined;
  chatMessage.value = "";
  items.value = [];
  state.answer = undefined;

  await addHistoryMessage(message);

  if (next) {
    question.value = next;
    await addChatMessage(question.value.text);
    await showAnswers();
  } else {
    await showOutcome();
  }
}
</script>
<template>
  <div id="chat" class="min-h-[50svh] mb-64 overflow-y-scroll px-8">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="min-h-12 w-128 bg-secondary-900/50 rounded-2xl p-4 mb-4"
    >
      <p>{{ message?.text }}</p>
      <p class="text-right">{{ message?.answer }}</p>
    </div>
    <div
      v-if="text.length > 1"
      class="min-h-36 w-128 bg-secondary-900/50 rounded-2xl p-4"
    >
      <span
        v-for="(word, index) in text"
        :key="index"
        class="stagger-word"
        :style="{ '--delay': `${index * 0.2}s` }"
        >{{ word }}
      </span>
      <UForm
        v-if="question"
        :schema="schema"
        :state="state"
        class="space-y-4 mt-4"
      >
        <URadioGroup
          v-model="state.answer"
          :class="[
            (items?.length ?? 0) > 0 ? 'opacity-100' : 'opacity-0',
            'transition-opacity',
            'answers',
          ]"
          :items="items"
          @change="onChange"
        />
      </UForm>
    </div>
    <div
      :class="[
        'flex flex-row justify-center mt-8 w-128 transition-opacity duration-1000',
        leadCTA ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <UButton size="xl"
        >Book a call with our experts and let’s co-create a media partnership
        that truly makes a difference.</UButton
      >
    </div>
  </div>
</template>
<style scoped>
.stagger-container {
  /* Facultatif : pour que les mots restent sur une ligne ou se comportent comme du texte */
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px; /* espace entre les mots */
}

.stagger-word {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s forwards;
  animation-delay: var(--delay, 0s);
}

.answers {
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
