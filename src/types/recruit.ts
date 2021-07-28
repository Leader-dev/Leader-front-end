interface OrgRecruitSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { questions: string; required: boolean }[];
}

export interface useOrgRecruitSetting {
  scheme: OrgRecruitSetting;
  receivedApplicationCount: number;
}
