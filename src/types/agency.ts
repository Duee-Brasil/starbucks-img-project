import { IAddress } from "./address";

export interface IAgency {
  slug: string;
  name: string;
  cnpj: string;
  address: IAddress;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
}
