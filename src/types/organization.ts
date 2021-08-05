/** unix timestamp */
export type Timestamp = number;

export interface OrgInfo {
  id: string;
  numberId: number;
  name: string;
  instituteName: string;
  instituteAuth: string;
  /**
   * @value 如果为 “school” 则为学校认证
   */
  typeAliases: string[];
  /** 组织海报图片地址 url */
  posterUrl: string;
  memberCount: number;
  presidentName: string;
}

export type ApplicationForm = Array<{ question: string; answer: string }>;

export interface AdInfo {
  id: string;
  posterUrl: string;
}

interface OrgApplicationScheme {
  open: boolean;
  auth: boolean;
  appointDepartment: boolean;
  questions: { question: string; required: boolean }[];
}

export interface UserOverview {
  id: string;
  uid: number;
  nickname: string;
}
export interface OrgApplication {
  id: string;
  name: string;
  applicantId: string;
  applicantInfo: UserOverview;
  sendDate: Timestamp;
  status: string;
}

export interface OrgDetails extends OrgInfo {
  introduction: string;
  phone: string[];
  email: string[];
  address: string;
  status: string;
  applicationScheme: OrgApplicationScheme;
}

export interface OrgDetailsResult {
  detail: OrgDetails;
  applicationStatus: string;
  favorite: boolean;
  /**
   * @value 用户是否能申请 ("closed” | “available” | “joined" | “applied”)
   */
}

export interface OrgPublicInfo {
  name: string;
  address: string;
  instituteName: string;
  introduction: string;
  phone: string[];
  email: string[];
  typeAliases: string[];
  posterUrl: string;
}

export interface MemberInfo {
  avatarUrl: string;
  name: string;
  numberId: number;
  title: string | null;
  departmentName: string | null;
  phone: string[] | null;
  email: string[] | null;
}

interface OrgType {
  name: string;
  alias: string;
}

export interface OrgTypes {
  [key: string]: OrgType;
}

export interface OrgMember {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  roleName: "general-manager" | "department-manager" | "member";
}
