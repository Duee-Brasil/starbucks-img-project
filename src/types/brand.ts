import { ICampaign } from "./campaign";

export interface IBrand {
  slug: string;
  name: string;
  avatar?: string;
  campaigns?: Array<ICampaign>;
};