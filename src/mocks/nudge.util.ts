import { NudgeModel } from '~/types/nudge';

const keywords: NudgeModel[] = ['MEET', 'SIMILARITY', 'TALKING', 'FRIENDLY'];

export const generateRandomNudge = () => {
  const randomIndex = Math.floor(Math.random() * keywords.length);
  const keyword = keywords[randomIndex];

  return keyword;
};
