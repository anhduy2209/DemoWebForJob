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

export type ChumonFormData = {
  ChumonId?: number;
  ChumonNo: string;
  ChumonDate: string;
  HojinnCode: string;
  KonyuName: string;
  KonyuMailAddress: string;
  KonyuTantosha: string;
  KonyuKingaku1: number;
  Nebiki: number;
  Soryo: number;
  ZeiRitsu1: number;
  ChumonMeisaiList?: ChumonMeisaiType[];
};

export type ContractType = {
  ContractId: number;
  ContractNumber: string;
  ContractName: string;
  CustomerId: number;
  StartDate: string;
  EndDate: string;
  TotalAmount: number;
  Status: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
  YukoFlag: number;
  ContractPaymentList: any[];
};

export type UserType = {
  UserId: number;
  UserName: string;
  Email: string;
  PasswordHash: string;
  Role: string;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  YukoFlag: number;
};

export type CustomerType = {
  CustomerId: number;
  CustomerCode: string;
  CustomerName: string;
  ContactPerson: string;
  Phone: string;
  Email: string;
  Address: string;
  TaxCode: string;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  YukoFlag: number;
  ContractList: any[];
};
