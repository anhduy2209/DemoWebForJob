export type ChumonMeisaiType = {
  meisaiId: number;
  meisaiDescription: string;
}

export type ChumonType = {
  ChumonId: number;
  ChumonNo: string;
  ChumonDate: Date;
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
}
