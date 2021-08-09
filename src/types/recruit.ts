export interface OrgRecruitScheme {
  open: boolean;
  maximumApplication: number;
  appointDepartment: boolean;
  questions: { question: string; required: boolean }[];
}

export interface OrgRecruitSchemeInfo {
  scheme: OrgRecruitScheme;
  receivedApplicationCount: number;
}
