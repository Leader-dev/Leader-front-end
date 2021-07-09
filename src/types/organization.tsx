export interface OrgInfo {
  id: string;
  numberId: number;
  name: string;
  instituteName: string;
  typeAliases: string[];
  /** 组织海报图片地址 url */
  posterUrl: string;
  memberCount: number;
}

export interface AdInfo {
  id: string;
  posterUrl: string;
}
