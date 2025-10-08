import type { Question } from "~/models/questions";

export const useAppStore = defineStore("appStore", () => {
  const questions = ref<Array<Question>>([
    {
      id: 1,
      order: 1,
      text: "Let's start with your geographical scope: does your project cover one or multiple countries?",
      slug: "geographical-scope",
      answers: [
        {
          id: 1,
          order: 1,
          label: "Single country",
          value: 1,
        },
        {
          id: 2,
          order: 2,
          label: "Multiple countries",
          value: 2,
        },
      ],
    },
    {
      id: 2,
      order: 2,
      text: "Now, let's get a sense of your target audience. Please select the segment that best resonates with your project",
      slug: "target-audience",
      answers: [
        {
          id: 3,
          order: 1,
          label: "General public (all ages)",
          value: 1,
        },
        {
          id: 4,
          order: 2,
          label: "Youth (18-34 years old)",
          value: 2,
        },
        {
          id: 5,
          order: 3,
          label: "Business and Key Opinion Leaders",
          value: 3,
        },
        {
          id: 6,
          order: 4,
          label: "Niche audience (e.g., researchers)",
          value: 4,
        },
      ],
    },
    {
      id: 3,
      order: 3,
      text: "Finally, which of the following objectives best fits your project?",
      slug: "objectives",
      answers: [
        {
          id: 7,
          order: 1,
          label: "Raise awareness on a little-known topic",
          value: 1,
        },
        {
          id: 8,
          order: 2,
          label:
            "Increase participation in event/activity/ applications to an initiative",
          value: 2,
        },
        {
          id: 9,
          order: 3,
          label: "Change the perception of the audience on a specific topic",
          value: 3,
        },
      ],
    },
  ]);

  return {
    questions,
  };
});
