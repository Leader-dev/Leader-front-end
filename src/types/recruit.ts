export interface OrgRecruitSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { question: string; required: boolean }[];
}

export interface useOrgRecruitSetting {
  scheme: OrgRecruitSetting;
  receivedApplicationCount: number;
}
