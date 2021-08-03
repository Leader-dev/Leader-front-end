export interface OrgRecruitSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: boolean;
  questions: { question: string; required: boolean }[];
}

export interface useOrgRecruitSetting {
  scheme: OrgRecruitSetting;
  receivedApplicationCount: number;
}
