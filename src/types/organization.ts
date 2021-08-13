/** unix timestamp */
export type Timestamp = number;

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

export interface OrgInfo extends OrgPublicInfo {
  id: string;
  numberId: number;
  instituteAuth: "official" | "self" | "none";
  /**
   * @value 如果为 “official” 则为官方认证, "self" 为自主认证, "none" 为未认证
   */
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
  questions: { question: string; required: boolean }[] | null;
}

export interface UserOverview {
  id: string;
  uid: number;
  nickname: string;
}

export interface OrgApplication {
  id: string;
  name: string;
  applicantUserId: string;
  applicantUserInfo: UserOverview;
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

export interface MemberInfoOverview {
  id: string;
  name: string;
  numberId: number;
  title: string;
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
  numberId: number;
  name: string;
  title: string;
  avatarUrl: string;
  roleName: "general-manager" | "department-manager" | "member";
}

export interface OrgDepartment {
  id: string;
  name: string;
}
