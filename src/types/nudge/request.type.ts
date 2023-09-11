import { NudgeModel } from '~/types/nudge/model.type';

export type NudgePostRequest = { nudgeType: NudgeModel; communityId: number };

export type NudgePutRequest = NudgePostRequest;
