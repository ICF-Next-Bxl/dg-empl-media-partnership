export type Answer = {
  id: number;
  order: number;
  label: string;
  value: number;
};

export type Question = {
  id: number;
  order: number;
  text: string;
  slug: string;
  answers: Array<Answer>;
};

export type Outcome = {
  title: string;
  text: string;
  proof: string;
  path: Array<number>;
};

export const questions: Array<Question> = [
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
];

export const outcomes: Array<Outcome> = [
  {
    title: "Storytelling that resonates",
    text: "Bring your message to life through the power of television. By co-creating a TV series with a popular broadcaster, you can craft compelling narratives that simplify complex topics and captivate audiences. This partnership is amplified through a robust promotional campaign across TV spots, digital platforms, and social media, ensuring your story reaches hearts and minds.",
    proof:
      "ICF Next is ready to partner with leading broadcasters like France TV and Deutsche Welle, applying our proven modular methodology to deliver impactful co-productions tailored to diverse audiences.",
    path: [1, 1, 1],
  },
  {
    title: "Call-to-action that converts",
    text: "Drive traffic and action through an integrated advertising campaign with trusted media partners. With a strong call-to-action and a mix of digital formats - banners, podcast and newsletter apps, newsletter and social media ads - we guide audiences seamlessly to your registration or application portal.",
    proof:
      "ICF Next has executed high-performing campaigns with media giants such as Ta Nea (Greece), La Repubblica (Italy), The Irish Times (Ireland), Postimees (Estonia), and Gazeta Wyborcza (Poland), leveraging our adaptable methodology to meet your unique goals.",
    path: [1, 1, 2],
  },
  {
    title: "Voices that build trust",
    text: "Harness the intimacy and depth of podcasts to foster trust and understanding. Ideal for complex topics, podcast partnerships allow for thoughtful exploration and storytelling that resonates with listeners on a personal level.",
    proof:
      "as an example of our work, ICF Next recently collaborated with The Explainer, the podcast from The Journal in Ireland, to deliver insightful content on humanitarian aid. Our flexible approach ensures seamless integration with any media partner’s podcast platform.",
    path: [1, 1, 3],
  },
  /** ========================================================================== **/
  {
    title: "Empower the audience to tell the story",
    text: "Let the audience become the storytellers. By partnering with youth-savvy media outlets like Konbini (France), we translate complex topics into relatable narratives. Adding a creative twist, we can invite young people to co-create content, whether as directors or protagonists, making the message truly theirs.",
    proof:
      "ICF Next’s collaboration with Vice Group led to a youth-driven video competition on humanitarian themes, culminating in an award-winning mini-documentary created by a young filmmaker and distributed across multiple channels.",
    path: [1, 2, 1],
  },
  {
    title:
      "Community spark: a playful nod to social media engagement turning into real-world impact",
    text: "Inspire participation and audience engagement through an activation with Key Opinion Leaders (such as social media influencers). Give-aways and competitions—like winning tickets or coaching sessions with experts to ease application processes —create excitement and drive applications, especially among younger audiences.",
    proof:
      "ICF Next has successfully partnered with influencers to organise ticket give-aways, encouraging audiences to engage with campaign content and boosting visibility through social sharing.",
    path: [1, 2, 2],
  },
  {
    title: "Live and unfiltered",
    text: "Build trust with live-streamed Q&A sessions hosted by influential streamers on platforms like Twitch. These interactive formats allow for open dialogue, immediate feedback, and authentic engagement with your audience.",
    proof:
      "ICF Next has facilitated live-streaming collaborations with Key Opinion Leaders, enabling real-time interaction and fostering transparency and trust with target audiences.",
    path: [1, 2, 3],
  },
  /** ========================================================================== **/
  {
    title: "Your policy insight in print and pixels",
    text: "Collaborate with financial media to co-create special issues or article series that delve into your campaign topics. Whether online or in print, these editorial partnerships offer credibility and depth, reaching informed audiences with tailored content.",
    proof:
      "ICF Next is ready to partner with generalist outlets and business media to deliver branded content that informs and inspires. Our methodology ensures the right media match for every campaign.",
    path: [1, 3, 1],
  },
  {
    title: "Precision advertising that works",
    text: "Launch a targeted digital ad campaign with business media partners to drive traffic and conversions to your platform. With a mix of formats, from banners to apps in newsletters and podcasts, we ensure your message reaches the right audience at the right time.",
    proof:
      "ICF Next’s past collaborations with several media across the EU, and beyond, demonstrate our ability to deliver results through strategic media partnerships and tailored advertising solutions.",
    path: [1, 3, 2],
  },
  {
    title: "Dialogue that drives understanding",
    text: "Host a sponsored debate with a respected media outlet to explore your topic from multiple perspectives. Featuring expert voices and moderated by seasoned journalists, these events foster informed discussion and broaden audience understanding.",
    proof:
      "Media such as ANSA (Italy) or Cinco Dias (Spain) offer these solutions as part of their branded-content offering. Applying our methodology and know-how, ICF Next will find the right partner for your event, regardless of the country or topic of discussion.",
    path: [1, 3, 3],
  },
  /** ========================================================================== **/
  {
    title: "Events that enlighten",
    text: "Co-brand a half-day event with a specialised media outlet to spotlight your topic. With expert panels and journalist moderators, these events offer a platform for deep dives and meaningful dialogue with target audiences. You will benefit from the media partner's reputation and call-out force.",
    proof:
      "Prominent specialised media offer these solutions as part of their branded-content offering. Applying our methodology and know-how, ICF Next will find the right partner for your event, regardless of the country or topic of discussion.",
    path: [1, 4, 1],
  },
  {
    title: "Call-to-action that converts",
    text: "Drive traffic and action through an integrated advertising campaign with trusted media partners. With a strong call-to-action and a mix of digital formats - banners, podcast and newsletter apps, newsletter and social media ads - we guide audiences seamlessly to your registration or application portal.",
    proof:
      "ICF Next has executed high-performing campaigns with both generalist and specialised media, leveraging our adaptable methodology to meet your unique goals.",
    path: [1, 4, 2],
  },
  {
    title: "Build a community",
    text: "Build a vibrant community of journalists and Key Opinion Leaders genuinely interested in your campaign topics who become ambassadors of your message. Through exclusive briefings and tailored content, we equip them to share your story authentically and consistently across their platforms.",
    proof:
      "ICF Next’s Octave Model has proven effective in engaging expert communities, such as those in technology and digital policy or FIMI, fostering long-term advocacy and trust.",
    path: [1, 4, 3],
  },
  /** ========================================================================== **/
  {
    title: "Storytelling that resonates",
    text: "Bring your message to life through the power of television. By co-creating a TV series with a popular broadcaster, you can craft compelling narratives that simplify complex topics and captivate audiences. This partnership is amplified through a robust promotional campaign across TV spots, digital platforms, and social media, ensuring your story reaches hearts and minds.",
    proof:
      "ICF Next is ready to partner with leading international media such as Vox Media or Associated Press, able to produce and distribute audiovisual content across several countries. ICF Next’s modular methodology is ready to be applied to any project needs.",
    path: [2, 1, 1],
  },
  {
    title: "Call-to-action that converts",
    text: "Launch a high-impact digital ad campaign with international media partners to drive awareness and registrations. With a mix of formats – web banners, podcast ads, newsletter banners and social media content - and a compelling call-to-action, we ensure your message resonates across borders.",
    proof:
      "ICF Next has partnered with global media leaders like Vice Group to deliver cross-country campaigns with consistent quality and measurable results.",
    path: [2, 1, 2],
  },
  {
    title: "Voices that build trust",
    text: "Harness the intimacy and depth of podcasts to foster trust and understanding. Ideal for complex topics, podcast partnerships allow for thoughtful exploration and storytelling that resonates with listeners on a personal level.",
    proof:
      "ICF Next has coordinated multi-country podcast campaigns, ensuring consistent messaging and high production standards across diverse partners and countries.",
    path: [2, 1, 3],
  },
  /** ========================================================================== **/
  {
    title: "Empower the audience to tell the story",
    text: "Let the audience become the storytellers. By partnering with youth-savvy international media outlets like Vice Group or Vox Media, we translate complex topics into relatable narratives. Adding a creative twist, we can invite young people to co-create content, whether as directors or protagonists, making the message truly theirs.",
    proof:
      "ICF Next’s collaboration with Vice Group led to a youth-driven video competition in 13 EU Member States on humanitarian themes, culminating in an award-winning mini-documentary created by a young filmmaker and distributed across multiple channels.",
    path: [2, 2, 1],
  },
  {
    title:
      "Community spark: a playful nod to social media engagement turning into real-world impact",
    text: "Inspire participation and audience engagement through an activation with Key Opinion Leaders (such as social media influencers). Give-aways and competitions—like winning tickets or coaching sessions with experts to ease application processes —create excitement and drive applications, especially among younger audiences.",
    proof:
      "ICF Next has successfully partnered with influencers to organise ticket give-aways, encouraging audiences to engage with campaign content and boosting visibility through social sharing.",
    path: [2, 2, 2],
  },
  {
    title: "Live and unfiltered",
    text: "Build trust with live-streamed Q&A sessions hosted by influential streamers on platforms like Twitch. These interactive formats allow for open dialogue, immediate feedback, and authentic engagement with your audience.",
    proof:
      "ICF Next has facilitated live-streaming collaborations with Key Opinion Leaders, enabling real-time interaction and fostering transparency and trust with target audiences.",
    path: [2, 2, 3],
  },
  /** ========================================================================== **/
  {
    title: "Thought leadership in print and pixels",
    text: "Co-create a special issue or web article series with a leading business media to position your message within a trusted editorial context. These formats offer depth, credibility, and long-term visibility.",
    proof:
      "ICF Next has worked on similar offers with international business media such as The Economist and Financial Times. Our modular methodology is ready to be applied to any need.",
    path: [2, 3, 1],
  },
  {
    title: "Targeted reach, tangible results",
    text: "Drive traffic and engagement through a strategic ad campaign with business media. With a variety of formats – web banners, podcast ads, newsletter inserts, social media ads - and a strong call-to-action, we ensure your message reaches the right audience effectively.",
    proof:
      "ICF Next has worked on similar offers with international business media such as The Economist and Financial Times. Our modular methodology is ready to be applied to any need.",
    path: [2, 3, 2],
  },
  {
    title: "Convene the conversation",
    text: "Organise a sponsored debate with a respected business media outlet to explore your topic from multiple perspectives. Featuring expert voices and moderated by seasoned journalists, these events foster informed discussion and broaden audience understanding",
    proof:
      "ICF Next’s extensive network enables us to coordinate impactful events with media partners across countries, ensuring broad reach and meaningful engagement.",
    path: [2, 3, 3],
  },
  /** ========================================================================== **/
  {
    title: "Events that enlighten",
    text: "Partner with niche media (e.g., science magazine) to host a half-day event that dives deep into your topic. With expert panels moderated by journalists, these events offer credibility and clarity on complex issues, as well as a good opportunity for audience engagement.",
    proof:
      "ICF Next’s extensive network enables us to coordinate impactful events with media partners across countries, ensuring broad reach and meaningful engagement.",
    path: [2, 4, 1],
  },
  {
    title: "Call-to-action that converts",
    text: "Drive traffic and action through an integrated advertising campaign with trusted media partners. With a strong call-to-action and a mix of digital formats - banners, podcast and newsletter apps, newsletter and social media ads - we guide audiences seamlessly to your registration or application portal.",
    proof:
      "Prominent specialised media offer these solutions as part of their branded-content offering. Applying our methodology and know-how, ICF Next will find the right partner, regardless of the country.",
    path: [2, 4, 2],
  },
  {
    title: "Build a community",
    text: "Build a vibrant community of journalists and Key Opinion Leaders genuinely interested in your campaign topics who become ambassadors of your message. Through exclusive briefings and tailored content, we equip them to share your story authentically and consistently across their platforms.",
    proof:
      "ICF Next’s Octave Model has proven effective in engaging expert communities, such as those in technology and digital policy or FIMI, fostering long-term advocacy and trust.",
    path: [2, 4, 3],
  },
  /** ========================================================================== **/
];
