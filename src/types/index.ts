export type ChumonMeisaiType = {
  MeisaiId: number;
  MeisaiDescription: string;
};

export type ChumonType = {
  ChumonId: number;
  ChumonNo: string;
  ChumonDate: string;
  HojinnCode: string;
  KonyuName: string;
  KonyuMailAddress: string;
  KonyuTantosha: string;
  KonyuKingaku1: number;
  KonyuKingaku2: number;
  KonyuKingaku3: number;
  Nebiki: number;
  Soryo: number;
  Zei1: number;
  ZeiRitsu1: number;
  Zei2: number;
  ZeiRitsu2: number;
  Zei3: number;
  ZeiRitsu3: number;
  GokeiKingaku: number;
  Status: number;
  YukoFlag: number;
  ChumonMeisaiList: ChumonMeisaiType[];
};

export type ContractType = {
  ContractId: number;
  ContractNumber: string;
  ContractName: string;
  CustomerId: number;
  StartDate: string; // ISO 8601 Date format (e.g., "2025-04-28T16:37:58.015Z")
  EndDate: string;
  TotalAmount: number;
  Status: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  YukoFlag: number;
  ContractPaymentList: any[]; // Placeholder type, update based on actual structure
};

export type UserType = {
  UserId: number;
  UserName: string;
  Email: string;
  PasswordHash: string;
  Role: string; // Example roles: 'admin', 'user', etc.
  Status: string; // Adjust status types based on your system
  CreatedAt: string; // ISO 8601 Date format
  UpdatedAt: string;
  YukoFlag: number;
};

export type CustomerType = {
  CustomerId: number;
  CustomerCode: string;
  CustomerName: string;
  ContactPerson: string; // Person in charge of the customer
  Phone: string;
  Email: string;
  Address: string;
  TaxCode: string;
  Status: string; // Adjust status types based on your system
  CreatedAt: string; // ISO 8601 Date format
  UpdatedAt: string;
  YukoFlag: number;
  ContractList: any[];
};
