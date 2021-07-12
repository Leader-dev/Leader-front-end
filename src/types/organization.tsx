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

interface OrgApplicationScheme {
  open: boolean;
  auth: boolean;
  appointDepartment: boolean;
  questions: string[];
}

interface OrgDetails extends OrgInfo {
  introduction: string;
  phone: string[];
  email: string[];
  address: string;
  addressAuth: string;
  /**
   * @value 如果为 “school” 则为学校认证
   */
  status: string;
  applicationScheme: OrgApplicationScheme;
  /** 社长名称 */
  presidentName: string;
}

export interface OrgDetailsResult {
  detail: OrgDetails;
  applicationStatus: string;
  /**
   * @value 用户是否能申请 ("closed” | “available” | “joined" | “applied”)
   */
}
