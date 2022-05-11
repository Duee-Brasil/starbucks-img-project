import { IBrand } from ".";

export interface ICampaign {
  name: string;
  slug: string;
  year: string;
  marca: IBrand;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByAgency?: string;
  createdByAgencyName?: string;
}
